"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./page.module.css";

export type Place = {
  key: string;
  name: string;
  alt: string[];
  lat: number;
  lon: number;
  precision: "exact" | "approx" | "region";
  kind: string;
  note: string;
  appearances: { chapter: number; count: number }[];
  parts: number[];
  count: number;
};

export type Part = {
  n: number;
  name: string;
  span: string;
  chapters: number[];
  places: string[];
};

export type Route = {
  key: string;
  name: string;
  part: number | null;
  stops: string[];
  note: string;
};

type Props = {
  places: Place[];
  parts: Part[];
  routes: Route[];
  chapters: { n: number; title: string }[];
};

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII"];

/** The pin scale is the only thing on the map that says how much of the book a
 *  place carries. It is deliberately shallow — Jerusalem has 482 mentions and
 *  Nessana one, and a linear scale would make every village invisible. */
function radius(count: number): number {
  return 4 + Math.min(9, Math.sqrt(count) * 1.15);
}

export default function Atlas({ places, parts, routes, chapters }: Props) {
  const [part, setPart] = useState<number | "all">("all");
  // Bumped when the map object exists, so the pin effect reruns against it.
  const [ready, setReady] = useState(0);
  const [query, setQuery] = useState("");
  /** The book's places run from Meroë to Rome, and a frame that holds all of
   *  them turns Palestine — the subject — into one smudge. So the default frame
   *  is the country, and the wider world is a deliberate choice the reader
   *  makes, not the state they are dropped into. */
  const [wide, setWide] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const leafletRef = useRef<typeof L | null>(null);
  const markers = useRef<Record<string, L.CircleMarker>>({});

  const byKey = useMemo(
    () => Object.fromEntries(places.map((p) => [p.key, p])),
    [places],
  );
  const chapterTitle = useMemo(
    () => Object.fromEntries(chapters.map((c) => [c.n, c.title])),
    [chapters],
  );

  const inPart = useMemo(
    () => (part === "all" ? places : places.filter((p) => p.parts.includes(part))),
    [places, part],
  );

  /** Search runs over the alternate names too, which is the whole point of
   *  keeping them: Jufna, Taiyibeh, Ram-Allah, Beisan and Aelia must all find
   *  their pin. */
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return inPart;
    return inPart.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.alt.some((a) => a.toLowerCase().includes(q)),
    );
  }, [inPart, query]);

  const shownRoutes = useMemo(
    () => (part === "all" ? routes : routes.filter((r) => r.part === part)),
    [routes, part],
  );

  // ---- map creation, once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const leaflet = (await import("leaflet")).default;
      if (cancelled || !mapEl.current || mapRef.current) return;
      leafletRef.current = leaflet;
      const map = leaflet.map(mapEl.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      leaflet
        .tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          {
            maxZoom: 18,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(map);
      map.setView([31.7, 35.2], 8);
      layerRef.current = leaflet.layerGroup().addTo(map);
      mapRef.current = map;
      setReady((n) => n + 1);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // ---- pins and routes, redrawn whenever the period or the search changes
  useEffect(() => {
    const leaflet = leafletRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!leaflet || !map || !layer) return;

    layer.clearLayers();
    markers.current = {};

    for (const r of shownRoutes) {
      const line = r.stops
        .map((k) => byKey[k])
        .filter(Boolean)
        .map((p) => [p.lat, p.lon] as [number, number]);
      if (line.length < 2) continue;
      leaflet
        .polyline(line, {
          color: "#a87d1b",
          weight: 2,
          opacity: 0.9,
          dashArray: "6 6",
        })
        .bindPopup(
          `<strong>${escapeHtml(r.name)}</strong>${
            r.note ? `<br/>${escapeHtml(r.note)}` : ""
          }`,
        )
        .addTo(layer);
    }

    for (const p of shown) {
      const marker = leaflet.circleMarker([p.lat, p.lon], {
        radius: radius(p.count),
        color: "#263746",
        weight: 1.25,
        fillColor: p.precision === "region" ? "#a87d1b" : "#34485a",
        fillOpacity: p.precision === "exact" ? 0.72 : 0.42,
      });
      marker.bindPopup(popupHtml(p, chapterTitle), { maxWidth: 320 });
      marker.on("click", () => setSelected(p.key));
      marker.addTo(layer);
      markers.current[p.key] = marker;
    }

    // Each period gets its own extent, which is half of what a period map is for:
    // Part I is a province, Part IV is an empire, and they should not share a
    // frame. Narrow frames fit only what falls inside Palestine and its borders.
    const pts = shown
      // The narrow box is Palestine from the Negev to upper Galilee -- Sinai,
      // Egypt, Damascus and Antioch all fall outside it and wait for the toggle.
      .filter((p) => wide || (p.lat > 30.4 && p.lat < 33.4 && p.lon > 34.0 && p.lon < 36.0))
      .map((p) => [p.lat, p.lon] as [number, number]);
    if (pts.length > 1) {
      map.fitBounds(leaflet.latLngBounds(pts).pad(0.12), { animate: false });
    } else if (pts.length === 1) {
      map.setView(pts[0], 10, { animate: false });
    }
  }, [shown, shownRoutes, byKey, chapterTitle, ready, wide]);

  function focus(key: string) {
    setSelected(key);
    const p = byKey[key];
    const map = mapRef.current;
    if (!p || !map) return;
    map.setView([p.lat, p.lon], Math.max(map.getZoom(), 9), { animate: true });
    markers.current[key]?.openPopup();
  }

  return (
    <div className={styles.atlas}>
      <div className={styles.controls}>
        <div className={styles.periods} role="group" aria-label="Period">
          <button
            type="button"
            className={part === "all" ? styles.periodOn : styles.period}
            onClick={() => setPart("all")}
          >
            <span className={styles.periodName}>The whole book</span>
            <span className={styles.periodSpan}>33–2026</span>
          </button>
          {parts.map((pt) => (
            <button
              key={pt.n}
              type="button"
              className={part === pt.n ? styles.periodOn : styles.period}
              onClick={() => setPart(pt.n)}
            >
              <span className={styles.periodName}>
                {ROMAN[pt.n]} · {pt.name}
              </span>
              <span className={styles.periodSpan}>
                {pt.span} · {pt.places.length} places
              </span>
            </button>
          ))}
        </div>
        <label className={styles.wide}>
          <input
            type="checkbox"
            checked={wide}
            onChange={(e) => setWide(e.target.checked)}
          />
          Frame the wider world — Rome, Meroë, Baghdad — and not only Palestine
        </label>
      </div>

      <div className={styles.frame}>
        <div className={styles.mapWrap}>
          <div ref={mapEl} className={styles.map} />
        </div>

        <aside className={styles.side}>
          <label className={styles.searchLabel} htmlFor="atlas-search">
            Search — old spellings too
          </label>
          <input
            id="atlas-search"
            className={styles.search}
            value={query}
            placeholder="Jufna, Beisan, Aelia, Ram-Allah…"
            onChange={(e) => setQuery(e.target.value)}
          />
          <p className={styles.sideCount}>
            {shown.length} place{shown.length === 1 ? "" : "s"}
            {part === "all" ? "" : ` in Part ${ROMAN[part as number]}`}
            {query ? ` matching “${query}”` : ""}
          </p>
          <ul className={styles.list}>
            {[...shown]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((p) => (
                <li key={p.key}>
                  <button
                    type="button"
                    className={
                      selected === p.key ? styles.listItemOn : styles.listItem
                    }
                    onClick={() => focus(p.key)}
                  >
                    <span className={styles.listName}>{p.name}</span>
                    {p.alt.length > 0 && (
                      <span className={styles.listAlt}>{p.alt.join(" · ")}</span>
                    )}
                  </button>
                </li>
              ))}
          </ul>
        </aside>
      </div>

      {shownRoutes.length > 0 && (
        <ul className={styles.routes}>
          {shownRoutes.map((r) => (
            <li key={r.key} className={styles.route}>
              <span className={styles.routeName}>{r.name}</span>
              <span className={styles.routeStops}>
                {r.stops.map((k) => byKey[k]?.name ?? k).join(" → ")}
              </span>
              {r.note && <span className={styles.routeNote}>{r.note}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Emphasis in a note is written the way the book writes it, *between stars*. */
function emphasis(s: string): string {
  return escapeHtml(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function popupHtml(p: Place, title: Record<number, string>): string {
  // ⚠ Found by rendering the page, not by reading it: Gaza appears in 29 of the
  // 33 chapters, and a popup that lists 29 chapter titles is taller than the map
  // it sits in. Above five, the chapters become a line of numbers.
  const many = p.appearances.length > 5;
  const chapters = many
    ? `<p class="atlas-pop-chs atlas-pop-many"><span class="atlas-pop-ch">Named in ${
        p.appearances.length
      } chapters</span> ${p.appearances.map((a) => a.chapter).join(", ")}</p>`
    : `<ul class="atlas-pop-chs">${p.appearances
        .map(
          (a) =>
            `<li><span class="atlas-pop-ch">Chapter ${a.chapter}</span> ${escapeHtml(
              title[a.chapter] ?? "",
            )}</li>`,
        )
        .join("")}</ul>`;
  const precision =
    p.precision === "approx"
      ? "the identification is secure; the pin is the settlement centre"
      : p.precision === "region"
        ? "a region, pinned at its middle"
        : "";
  return [
    `<div class="atlas-pop">`,
    `<h3>${escapeHtml(p.name)}</h3>`,
    p.alt.length ? `<p class="atlas-pop-alt">${escapeHtml(p.alt.join(" · "))}</p>` : "",
    p.note ? `<p class="atlas-pop-note">${emphasis(p.note)}</p>` : "",
    chapters,
    precision ? `<p class="atlas-pop-fine">${precision}</p>` : "",
    `</div>`,
  ].join("");
}
