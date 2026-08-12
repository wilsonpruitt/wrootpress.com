import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import succession from "@/content/succession.json";
import styles from "./page.module.css";

type Row = {
  lane: string;
  name: string;
  start: number;
  end: number;
  mark: "bar" | "bar1" | "est" | "point" | "tradition" | "gap";
  auth1: string;
  auth2: string;
  note: string;
};

const rows = succession.rows as Row[];

export const metadata: Metadata = {
  title: "The Succession · Wroot Press",
  description:
    "The bishops and patriarchs of Jerusalem, from James to the fall of Acre — " +
    "drawn as the sources give them, which is not evenly.",
};

/**
 * ⚠ The time axis here is PROPORTIONAL, which is the opposite of the chronology page's
 * rule that entries are spaced evenly. That is deliberate and the two are not
 * inconsistent: the chronology is a list of events, where even spacing is nearer the
 * truth than a scale drawing; this is a claim about DURATION and continuity, and a bar
 * whose length means nothing would be a decoration rather than evidence.
 */
const T0 = 20;
/**
 * ⭐ Extended from 1310 to 1950 on 2026-08-12, and only once the data justified it. The axis
 * deliberately stopped at the fall of Acre while 1334-1787 was a void, because a page that is
 * mostly empty reads as broken rather than honest. Le Quien's parallel lane now fills 1334-1608
 * and the Ottoman rows carry 1645-1808, so the ribbon runs.
 */
const T1 = 1950;
/**
 * ⚠ 1.05 px/year was too tight and the page said so: twenty-two Latin patriarchs inside
 * 192 years need ~330px of labels, so the bottom third of both lanes had names sitting
 * nowhere near their marks. The fix is a taller axis, not tighter labels — a long page is
 * the right shape for a ribbon whose claim is that the line does not stop.
 */
const SCALE = 1.35; // px per year
const PAD = 26; // ⚠ the lane headings are sticky and would otherwise clip the first row
const AXIS_H = (T1 - T0) * SCALE + PAD;

const y = (year: number) => (year - T0) * SCALE + PAD;

/** A row with no end runs a short stub: we know he held it, not for how long. */
const STUB = 10;

/** Minimum vertical gap between two labels before one has to be pushed down. */
const LABEL_GAP = 15;

/**
 * A composite row carries a dozen names in its `name` field on purpose — the TSV keeps
 * them together because splitting them into dated cells would manufacture a succession
 * out of a list. But the full string is a paragraph, and printed as a label it runs clean
 * across the Latin lane. Shown as its ends and a count; the record is unchanged.
 */
function display(name: string): string {
  const parts = name.split(",").map((p) => p.trim());
  // ⚠ NOT "contains a comma": the first render turned "James, the brother of the Lord"
  // into "James to the brother of the Lord (2 names)". An appositive is not a list.
  // The real composites carry twelve and thirteen names.
  if (parts.length < 4) return name;
  return `${parts[0]} to ${parts[parts.length - 1]} (${parts.length} names)`;
}

/**
 * ⚠ Labels are placed by a second pass, not by the mark's own position. A dozen
 * patriarchs inside forty years put their names on top of one another, which on the
 * first render made four pairs unreadable. Each label is pushed down until it clears the
 * one above; the MARK never moves, so nothing about the evidence shifts — only the text.
 */
function labelTops(list: Row[]): number[] {
  let last = -Infinity;
  return list.map((r) => {
    const want = geometry(r).top;
    const at = Math.max(want, last + LABEL_GAP);
    last = at;
    return at;
  });
}

function laneRows(lane: string) {
  return rows
    .filter((r) => r.lane === lane && r.mark !== "gap" && r.start >= T0 && r.start <= T1)
    .sort((a, b) => a.start - b.start);
}

function geometry(r: Row) {
  const top = y(r.start);
  const end = r.end && r.end > r.start ? y(r.end) : top + STUB;
  return { top, height: Math.max(end - top, 3) };
}

const CENTURIES = Array.from({ length: 13 }, (_, i) => 100 * (i + 1));

export default function SuccessionPage() {
  const jerusalem = laneRows("jerusalem");
  const jerusalemLq = laneRows("jerusalem-lq");
  const latin = laneRows("latin");
  const agreed = rows.filter((r) => r.mark === "bar");

  /**
   * ⚠⚠ The chart is as tall as the AXIS or as tall as the LABELS, whichever is more.
   * Twenty-two Latin patriarchs inside 192 years need ~330px of stacked labels in a
   * ~200px span, so the pushed-down names ran past the container and the last six rows
   * of both lanes were CLIPPED OFF THE PAGE — invisible to the build and to the
   * validator, obvious the moment the page was looked at.
   */
  const tops = {
    jerusalem: labelTops(jerusalem),
    "jerusalem-lq": labelTops(jerusalemLq),
    latin: labelTops(latin),
  };
  const lowestLabel = Math.max(
    ...tops.jerusalem.slice(-1),
    ...tops["jerusalem-lq"].slice(-1),
    ...tops.latin.slice(-1),
    0
  );
  const H = Math.max(AXIS_H, lowestLabel + 30);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <Link href="/" aria-label="Wroot Press">
            <Image
              src="/wordmark.svg"
              alt="Wroot Press"
              width={180}
              height={45}
              priority
              className={styles.wordmark}
            />
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.shell}>
          <h1 className={styles.h1}>The Succession</h1>
          <p className={styles.lede}>
            One see, held without a break from the first century. The left-hand lane is
            the church of Jerusalem itself; the right-hand lane is the Latin
            patriarchate that occupied it for the years of Frankish rule. Every tenure
            is drawn exactly as firmly as the sources give it — and they do not give it
            evenly.
          </p>
          <p className={styles.meta}>
            Companion to <em>The Church in Palestine</em>, forthcoming from Wroot
            Press. See also the{" "}
            <Link href="/chronology">chronology</Link>.
          </p>
        </section>

        <section className={styles.shell}>
          <ul className={styles.key}>
            <li>
              <span className={`${styles.swatch} ${styles.bar}`} />
              <span>
                <b>Two authorities agree</b> on both ends. A solid bar is a claim, and
                only {agreed.length} of {rows.length} entries earn one.
              </span>
            </li>
            <li>
              <span className={`${styles.swatch} ${styles.bar1}`} />
              <span>
                <b>One authority</b> gives a firm span; no second list reaches that far.
              </span>
            </li>
            <li>
              <span className={`${styles.swatch} ${styles.est}`} />
              <span>
                <b>One authority who calls it an estimate.</b> Gil says so of his own
                dates in as many words.
              </span>
            </li>
            <li>
              <span className={`${styles.swatch} ${styles.point}`} />
              <span>
                <b>An attested year only</b>, or the authorities disagree. He held the
                see; the years are not recoverable.
              </span>
            </li>
            <li>
              <span className={`${styles.swatch} ${styles.tradition}`} />
              <span>
                <b>The succession itself is contested</b> — a traditional list, perhaps
                not a line of single bishops at all.
              </span>
            </li>
          </ul>
        </section>

        <div className={styles.shell}>
          <div className={styles.chartWrap}>
            <div className={styles.chart} style={{ height: `${H}px` }}>
              <div className={styles.axis}>
                {CENTURIES.map((c) => (
                  <div key={c} className={styles.tick} style={{ top: `${y(c)}px` }}>
                    <span className={styles.tickLabel}>{c}</span>
                  </div>
                ))}
              </div>

              {(
                [
                  ["jerusalem", jerusalem, styles.laneJerusalem],
                  ["jerusalem-lq", jerusalemLq, styles.laneLq],
                  ["latin", latin, styles.laneLatin],
                ] as const
              ).map(([lane, list, cls]) => (
                <div key={lane} className={`${styles.lane} ${cls}`}>
                  <h2 className={styles.laneHead}>
                    {lane === "jerusalem"
                      ? "Jerusalem"
                      : lane === "jerusalem-lq"
                        ? "Jerusalem, as Le Quien counts it"
                        : "Latin"}
                  </h2>
                  {(() => {
                    const laneTops = tops[lane];
                    return list.map((r, i) => {
                      const g = geometry(r);
                      return (
                        <div key={`${r.name}-${i}`}>
                          <div
                            className={`${styles.tenure} ${styles[r.mark]}`}
                            style={{ top: `${g.top}px`, height: `${g.height}px` }}
                            title={`${r.name} — ${r.auth1}${r.auth2 && r.auth2 !== "--" ? ` / ${r.auth2}` : ""}`}
                          />
                          <span
                            className={styles.label}
                            style={{ top: `${laneTops[i]}px` }}
                          >
                            {display(r.name)}
                          </span>
                        </div>
                      );
                    });
                  })()}
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className={styles.shell}>
          <p className={styles.colophon}>
            The two lanes are not a pair. The Latin patriarchate is an interruption
            drawn beside a line that was already there and continued after it: its
            tenures are short, crowded and dated to the year, because the church that
            held the building kept its own records and Europe kept them too. The
            Jerusalem lane runs the whole height of the page and almost none of it is a
            solid bar.
          </p>
          <p className={styles.colophon}>
            The middle lane is the same succession counted by somebody else. For the years
            between about 1330 and 1610 there are two catalogues, and they do not contain
            the same men. Michel Le Quien, working in Latin in 1740, lists eleven patriarchs
            where the Greek catalogue Maximos Simaios copied lists six. He says plainly why:
            of three of them &mdash; Abraham, Jacobus, Marcus &mdash;{" "}
            <em>no mention occurs among the Greeks at all</em>. He has them from a Western
            chronicler. So the two lanes are not a disagreement so much as two traditions,
            one of which knows men the other never heard of, and they close again on the same
            Germanus. They are set in different ink for that reason and no other.
          </p>
          <p className={styles.colophon}>
            That asymmetry is the page. It is not a defect in the sources and it is not
            an argument we are making: Eusebius wrote that the chronology of the bishops
            of Jerusalem he had &ldquo;nowhere found preserved in writing,&rdquo; and
            his <em>Chronicle</em>{" "}says outright that the times of the individual
            men could not be determined. Twelve centuries later Gil, working the Islamic
            period from Arabic chronicles, reports lists that &ldquo;contradict one
            another at times&rdquo; and stresses that many of his dates are estimates.
          </p>
          <p className={styles.colophon}>
            Where the line does sharpen, there is a reason, and two scholars a millennium
            and a half apart give the same one. A patriarch becomes datable when he
            starts appearing in other people&rsquo;s dated business — at a council, in a
            quarrel, in somebody else&rsquo;s chronicle. The blur is not poor
            record-keeping in Jerusalem. It measures how far the bishop of Jerusalem was,
            in a given century, a figure in the wider church&rsquo;s affairs.
          </p>
          <p className={styles.colophon}>
            Gaps in a lane mean the sources name no one — the two generations after
            Sophronius, when Gil reports the seat simply vacant, are the longest. Where
            this page has not yet done the work, it shows nothing rather than a guess.
            The band presently runs to the fall of Acre in 1291; the Ottoman and modern
            centuries are not drawn here yet.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <p className={styles.colophonMeta}>
            © {new Date().getFullYear()} Wroot Labs ·{" "}
            <Link href="/">wrootpress.com</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
