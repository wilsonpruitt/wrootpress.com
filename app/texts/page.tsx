import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allTexts, elsewhere } from "@/content/texts";
import styles from "./texts.module.css";

export const metadata: Metadata = {
  title: "Sources · Wroot Press",
  description:
    "Primary texts for the history of the church in Palestine, hosted whole: " +
    "public-domain translations with their provenance stated.",
};

export default function TextsIndexPage() {
  const texts = allTexts();

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
        <div className={styles.shell}>
          <h1 className={styles.h1}>Sources</h1>
          <p className={styles.lede}>
            The <Link href="/chronology">chronology</Link> gives the dates. These
            are the documents behind them, hosted whole rather than in extract,
            because an extract is a choice about what matters and these pages are
            not making one.
          </p>
          <p className={styles.lede}>
            Every text here is in the public domain and says so, together with the
            edition it comes from and the reason it is free to copy. Where a better
            modern edition exists, the headnote names it: these are the texts that
            can be given away, which is not the same as the best texts, and the
            pages do not pretend otherwise.
          </p>

          <ul className={styles.works}>
            {texts.map((t) => (
              <li key={t.slug} className={styles.work}>
                <h2 className={styles.workTitle}>
                  <Link href={`/texts/${t.slug}`}>{t.work}</Link>
                </h2>
                <p className={styles.workMeta}>
                  {t.author} · written {t.year_written} · translated by{" "}
                  {t.translator}, {t.edition}
                </p>
                <p className={styles.workBlurb}>{t.headnote_plain[0]}</p>
              </li>
            ))}
          </ul>

          <h2 className={styles.sectionHead}>Translated here, published elsewhere</h2>
          <p className={styles.lede}>
            These we translated ourselves. They live at the address of the imprint
            that made them rather than being copied to a second one, so that there
            is only ever one text to correct.
          </p>

          <ul className={styles.works}>
            {elsewhere.map((e) => (
              <li key={e.href} className={styles.work}>
                <h3 className={styles.workTitle}>
                  <a href={e.href}>{e.work}</a>
                </h3>
                <p className={styles.workMeta}>
                  {e.author} · written {e.year_written} · at migne.app
                </p>
                <p className={styles.workBlurb}>{e.note}</p>
              </li>
            ))}
          </ul>

          <p className={styles.colophon}>
            More will be added as they are checked. A text is not put up until we
            have collated it against a scan of the edition it claims to be, so the
            list grows slowly and in no particular hurry.
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <p>
            © {new Date().getFullYear()} Wroot Labs ·{" "}
            <Link href="/">wrootpress.com</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
