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
const T1 = 2030;
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

/**
 * ⚠⚠ A row is placed by its START or, failing that, by its END. It had been placed by its
 * start alone, and two men the band holds were therefore on no page at all: Hermon, whom
 * Eusebius dates only by the year he was succeeded, and Sophronius III, who carries no year
 * in either direction. Hermon is now drawn at 314. Sophronius III cannot be drawn — and is
 * NAMED beneath the chart instead of vanishing, because a page that quietly omits what it
 * cannot draw is making a claim about the record that the record does not make.
 */
const anchor = (r: Row) => r.start || r.end;

function laneRows(lane: string) {
  return rows
    .filter(
      (r) => r.lane === lane && r.mark !== "gap" && anchor(r) >= T0 && anchor(r) <= T1
    )
    .sort((a, b) => anchor(a) - anchor(b));
}

/** Rows the chart cannot place at all: no start and no end. Printed, never dropped. */
const unplaced = rows.filter((r) => r.mark !== "gap" && !anchor(r));

function geometry(r: Row) {
  const top = y(anchor(r));
  const end = r.end && r.end > r.start && r.start ? y(r.end) : top + STUB;
  return { top, height: Math.max(end - top, 3) };
}

const CENTURIES = Array.from({ length: 13 }, (_, i) => 100 * (i + 1));

/**
 * ⭐⭐ THE CUSTODY LANE CARRIES NO LABELS, AND THAT IS A DECISION RATHER THAN A LIMIT
 * (Wilson's ruling, 2026-08-14). It holds 168 entries between 1219 and 2026 — as many names
 * as the whole rest of the band — and at this scale that stretch is ~1,500px against the
 * ~2,350px the labels would need. Set beside a taller axis or a chart of its own, this won:
 * the lane's claim is DENSITY, a stipple running unbroken through the five and a half
 * centuries where the Latin lane is one grey gap, and a name beside each dot would not make
 * that argument any better. ⛔ NOTHING IS DROPPED: every one of the 168 is printed in full
 * below the chart, in order, with its year and the Custody's own entry verbatim. A page that
 * showed 168 marks and named forty of them would be the silent cap this shop forbids.
 */
export default function SuccessionPage() {
  const jerusalem = laneRows("jerusalem");
  const jerusalemLq = laneRows("jerusalem-lq");
  const latin = laneRows("latin");
  const custody = laneRows("custody");
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

        <div className={`${styles.shell} ${styles.chartShell}`}>
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

              <div className={`${styles.lane} ${styles.laneCustody}`}>
                <h2 className={styles.laneHead}>Franciscan Custody</h2>
                {custody.map((r, i) => {
                  const g = geometry(r);
                  /**
                   * ⚠⚠ SIX YEARS IN THIS LANE HOLD TWO MEN, and drawn at the same x they
                   * were one dot — which hid the most telling fact the list carries. 1593
                   * is Felice Ranieri, dead after fifteen days of government, and the man
                   * elected after him in the same year. The second is stepped sideways.
                   */
                  const dup = custody.filter(
                    (o, j) => j < i && anchor(o) === anchor(r)
                  ).length;
                  return (
                    <div
                      key={`custody-${i}`}
                      className={`${styles.tenure} ${styles[r.mark]}`}
                      style={{
                        top: `${g.top}px`,
                        height: `${g.height}px`,
                        left: `${dup * 13}px`,
                      }}
                      title={`${r.name} — ${r.auth1}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {unplaced.length > 0 && (
          <section className={styles.shell}>
            <p className={styles.unplaced}>
              Held by the band and not drawable above, for want of a year at either end:{" "}
              {unplaced.map((r) => r.name).join(", ")}. The sources name{" "}
              {unplaced.length === 1 ? "him" : "them"} and date{" "}
              {unplaced.length === 1 ? "him" : "them"} not at all.
            </p>
          </section>
        )}

        <section className={styles.shell}>
          <h2 className={styles.listHead}>
            The Custody of the Holy Land: the whole list
          </h2>
          <p className={styles.listLede}>
            The fourth lane above is the Franciscan Custody, and it is the answer to a
            question the Latin lane raises and cannot answer. Between the fall of Acre and
            1847 the Latin patriarchate was a title held in Rome; the friars were the Latin
            church on the ground, and their superior — the Custos of the Holy Land — had
            quasi-episcopal jurisdiction, confirmed and gave minor orders, conferred the
            Order of the Holy Sepulchre on the Pope&rsquo;s behalf, and kept a merchant
            marine flying the flag of Terra Santa. The <em>Handbook of Palestine</em>{" "}
            says all of that and prints no list. This one is the Custody&rsquo;s own, and it is
            numbered as they number it: {custody.length} names, from Francis himself to the
            custos in office as this page is built. The years are the years they give —{" "}
            <em>election</em> years, not tenures, which is why the lane is dots.
          </p>
          {/*
            ⚠⚠ AN UNNUMBERED LIST, AND THE REASON IS A DEFECT THE RENDER CAUGHT: an <ol>
            numbered these 1..168 while every entry ALSO carries the Custody's own number,
            and the two drift apart at the 83rd, which does not exist on the Custody's page.
            One man printed as both the 87th and the 88th. The list has ONE numbering and it
            is theirs — the jump included, because the jump is a fact about the source.
          */}
          <ul className={styles.custodyList}>
            {custody.map((r, i) => (
              <li key={`c-${i}`}>
                <b>{r.name}</b>
                <span className={styles.custodySrc}>
                  {r.auth1.replace(/^C:\s*/, "").replace(/^N:\s*/, "")}
                </span>
              </li>
            ))}
          </ul>
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
            The Latin lane is the one to watch twice. It stops looking like a succession
            after 1291 because the see stopped being resident, not because it stopped
            existing: ten more men held it in title, one of them an English bishop of
            Durham, and for five and a half centuries the Latin holy places were kept by the
            Franciscan Custodian of Terra Santa. The lane resumes in 1847, when the
            patriarchate was made resident again. Where a lane here shows nothing at all,
            that is this page's work unfinished and not a gap in the thing itself.
          </p>
          <p className={styles.colophon}>
            The fourth lane is those Custodians, and it is dots for a different reason than
            the Jerusalem lane is. There the two catalogues disagree; here there is only one
            list and it gives the year a man was <em>elected</em>. Ninety-six of the hundred
            and sixty-seven successions in it fall within four years, and to draw each man as
            a bar running to his successor&rsquo;s election would be to invent a hundred and
            thirty-one tenures out of a hundred and thirty-one single years. Nor is there a second
            authority to be had: the obvious one is Golubovich&rsquo;s catalogue of 1898, and

            this list descends from it, so their agreeing would prove nothing but their
            descent. Six of the years carry two men — 1593 is a custos dead after fifteen
            days of government and the man elected in his place — and those are stepped
            sideways rather than drawn on top of one another.
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
