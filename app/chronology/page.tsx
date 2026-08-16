import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import chronology from "@/content/chronology.json";
import styles from "./page.module.css";

type Entry = {
  date: string;
  year: number;
  approx: boolean;
  event: string;
  tier: string;
  bigCh: string;
  shortCh: number[];
  band: string;
  chapterStart?: { n: number; title: string };
};

type Band = {
  numeral: string;
  name: string;
  entries: Entry[];
  chapters: number[];
};

const bands = chronology.bands as Band[];

export const metadata: Metadata = {
  title: "A Chronology of the Church in Palestine · Wroot Press",
  description:
    "Every dated event in the continuous history of the Christian community in " +
    "Palestine, from the first century to the present — a companion to the book.",
};

/** Roman numerals read as clutter in a jump-nav; the years are what a reader steers by. */
function span(band: Band): string {
  const first = band.entries[0].year;
  const last = band.entries[band.entries.length - 1].year;
  const label = (y: number) => (y < 0 ? `${-y} BCE` : `${y}`);
  return `${label(first)}–${label(last)}`;
}

function slug(band: Band): string {
  return band.name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
}

export default function ChronologyPage() {
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
          <h1 className={styles.h1}>A Chronology of the Church in Palestine</h1>
          <p className={styles.lede}>
            There has been a Christian community in Palestine, without a break, since
            the first century. This is its date spine — {chronology.count} entries
            from the Gaza road in the thirties to the present day. Read it straight
            through and the argument makes itself: the names change, the empires
            change, and the community does not stop.
          </p>
          <p className={styles.meta}>
            Companion to <em>The Church in Palestine</em>, forthcoming from Wroot
            Press. See also{" "}<Link href="/succession">the succession</Link>, the
            same story told through the men who held the see, and{" "}
            <Link href="/atlas">the atlas</Link>, the same story on the ground.
          </p>
        </section>

        <nav className={styles.eraNav} aria-label="Jump to era">
          <div className={styles.shell}>
            <ul className={styles.eraNavList}>
              {bands.map((band) => (
                <li key={band.numeral}>
                  <a href={`#${slug(band)}`} className={styles.eraNavLink}>
                    <span className={styles.eraNavName}>{band.name}</span>
                    <span className={styles.eraNavSpan}>{span(band)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className={styles.shell}>
          {/* The rule down the left of every row and every heading is the point of
              the page: it must never break, which is why the band headings sit
              inside the same grid rather than above it. */}
          <div className={styles.spine}>
            {bands.map((band) => (
              <section key={band.numeral} className={styles.band}>
                <h2 className={styles.bandHead} id={slug(band)}>
                  <span className={styles.bandName}>{band.name}</span>
                  <span className={styles.bandSpan}>{span(band)}</span>
                </h2>
                <ol className={styles.entries}>
                  {band.entries.map((entry, i) => (
                    <li key={`${entry.year}-${i}`} className={styles.entry}>
                      {entry.chapterStart && (
                        <span className={styles.chapterMark}>
                          Chapter {entry.chapterStart.n} ·{" "}
                          <em>{entry.chapterStart.title}</em>
                        </span>
                      )}
                      <span className={styles.date}>{entry.date}</span>
                      <span className={styles.event}>{entry.event}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>

        <section className={styles.shell}>
          <p className={styles.colophon}>
            Dates are given as the sources give them; a leading <em>c.</em> means the
            year is approximate. Entries are spaced evenly rather than in proportion
            to elapsed time — five quiet centuries and five loud ones take the same
            room here, which is nearer the truth of the thing than a scale drawing
            would be. The chapter marks show where the book takes each stretch up.
          </p>
          <p className={styles.colophon}>
            A further {chronology.withheld + chronology.needsHand} dated entries are
            held back and not shown here — most pending verification, a couple
            because what we have written down about them is a note to ourselves
            rather than an account of what happened. The unverified ones are not
            doubtful so much as unchecked, and an unchecked date is one we cannot
            defend rather than one we distrust.
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
