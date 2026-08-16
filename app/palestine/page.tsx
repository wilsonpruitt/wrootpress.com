import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import chronology from "@/content/chronology.json";
import gazetteer from "@/content/gazetteer.json";
import texts from "@/content/texts.json";
import styles from "./page.module.css";

/* The index of the companion. It is served at the ROOT of
   palestine.wrootpress.com by proxy.ts, which is why nothing here assumes it
   sits under a path. Keep every internal link absolute-from-root. */

export const metadata: Metadata = {
  title: "The Church in Palestine · a companion · Wroot Press",
  description:
    "The web companion to The Church in Palestine — a chronology of the whole " +
    "nineteen centuries, an atlas of every place the book names, the succession " +
    "of the see of Jerusalem, and the primary texts in full.",
};

const textCount = Array.isArray((texts as { works?: unknown[] }).works)
  ? (texts as { works: unknown[] }).works.length
  : undefined;

export default function CompanionIndex() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <Link href="https://wrootpress.com" aria-label="Wroot Press">
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
          <h1 className={styles.h1}>The Church in Palestine</h1>
          <p className={styles.lede}>
            There has been a Christian community in Palestine, without a break,
            since the first century. This is the companion to the book of that
            name — the parts of the history that are better looked up than read
            straight through, and that a printed book cannot hold.
          </p>
          <p className={styles.meta}>
            <em>The Church in Palestine: Nineteen Centuries on the Gaza Road</em>,
            forthcoming from Wroot Press
          </p>
        </section>

        <section className={styles.shell}>
          <ul className={styles.cards}>
            <li className={styles.card}>
              <h2 className={styles.cardTitle}>
                <Link href="/chronology">The chronology</Link>
              </h2>
              <p className={styles.cardCount}>{chronology.count} dated entries</p>
              <p className={styles.cardBody}>
                The date spine of the whole nineteen centuries, from the Gaza
                road in the thirties to the present day. Read it straight through
                and the argument makes itself: the names change, the empires
                change, and the community does not stop.
              </p>
            </li>

            <li className={styles.card}>
              <h2 className={styles.cardTitle}>
                <Link href="/atlas">The atlas</Link>
              </h2>
              <p className={styles.cardCount}>{gazetteer.count} places</p>
              <p className={styles.cardBody}>
                Every place the book names, pinned and searchable under every
                name it has carried — Jufna and Jifna, Beisan and Scythopolis,
                Aelia and Jerusalem. A period map for each of the seven parts,
                and the Gaza road drawn.
              </p>
            </li>

            <li className={styles.card}>
              <h2 className={styles.cardTitle}>
                <Link href="/succession">The succession</Link>
              </h2>
              <p className={styles.cardCount}>the see of Jerusalem</p>
              <p className={styles.cardBody}>
                The same story told through the men who held the see — an
                unbroken list, and the gaps and disputes in it named rather than
                smoothed.
              </p>
            </li>

            <li className={styles.card}>
              <h2 className={styles.cardTitle}>
                <Link href="/texts">The texts</Link>
              </h2>
              <p className={styles.cardCount}>
                {textCount ? `${textCount} works` : "primary sources"}, complete
              </p>
              <p className={styles.cardBody}>
                The primary sources the book quotes, in full and free to read:
                Justin, Eusebius on the martyrs of Palestine, Jerome's Hilarion,
                Egeria's travels. A quotation is an argument about a text; here
                is the text.
              </p>
            </li>
          </ul>
        </section>

        <section className={styles.shell}>
          <p className={styles.colophon}>
            These four surfaces share one set of facts. A date in the chronology,
            a place in the atlas and a bishop in the succession are the same
            record seen three ways, generated from the book's own working files
            rather than kept in parallel by hand — which is why they cannot
            quietly disagree with each other or with the book.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <p className={styles.colophonMeta}>
            © {new Date().getFullYear()} Wroot Labs ·{" "}
            <Link href="https://wrootpress.com">wrootpress.com</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
