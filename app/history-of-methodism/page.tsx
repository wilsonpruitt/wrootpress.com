import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "History of Methodism — Translated Digital Editions · Wroot Press",
  description:
    "Free downloadable PDF and EPUB editions of Wilson Pruitt's History of Methodism in Swahili, Hungarian, and Korean — the languages Amazon KDP does not yet support for paperback.",
};

type Edition = {
  lang: "sw" | "hu" | "ko";
  langName: string;          // English label
  localName: string;         // localized "History of Methodism"
  note: string;              // one-line context
  volumes: {
    n: 1 | 2;
    localSubtitle: string;   // "Juzuu ya 1: 1483–1703"
    pages: number;
  }[];
};

const editions: Edition[] = [
  {
    lang: "sw",
    langName: "Swahili",
    localName: "Historia ya Umethodisti",
    note:
      "East-African Swahili. Translation by Claude with the same brief as the Spanish and notabene editions; native proofread welcomed.",
    volumes: [
      { n: 1, localSubtitle: "Juzuu ya 1: 1483–1703", pages: 170 },
      { n: 2, localSubtitle: "Juzuu ya 2: 1703–1736", pages: 184 },
    ],
  },
  {
    lang: "hu",
    langName: "Hungarian",
    localName: "A metodizmus története",
    note:
      "Magyar fordítás — Claude translation, native proofread welcomed.",
    volumes: [
      { n: 1, localSubtitle: "1. kötet: 1483–1703", pages: 162 },
      { n: 2, localSubtitle: "2. kötet: 1703–1736", pages: 176 },
    ],
  },
  {
    lang: "ko",
    langName: "Korean",
    localName: "감리교의 역사",
    note: "한국어판 — Claude translation, native proofread welcomed.",
    volumes: [
      { n: 1, localSubtitle: "제1권: 1483–1703", pages: 162 },
      { n: 2, localSubtitle: "제2권: 1703–1736", pages: 168 },
    ],
  },
];

const filePath = (kind: "pdf" | "epub" | "cover", lang: string, vol: number) =>
  `/downloads/history-of-methodism/${kind === "cover" ? "cover-" : ""}vol${vol}-${lang}.${kind === "cover" ? "jpg" : kind}`;

const downloadName = (kind: "pdf" | "epub", localName: string, vol: number) =>
  `${localName} — Vol ${vol}.${kind}`;

export default function HoMTranslationsPage() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.shell}>
          <Link href="/" aria-label="Wroot Press">
            <Image
              src="/wordmark.svg"
              alt="Wroot Press"
              width={240}
              height={60}
              priority
              className={styles.wordmark}
            />
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.shell}>
          <p className={styles.crumbs}>
            <Link href="/" className={styles.crumb}>Wroot Press</Link>
            <span aria-hidden> · </span>
            <span>History of Methodism — Translated Editions</span>
          </p>
          <h1 className={styles.h1}>History of Methodism</h1>
          <p className={styles.subtitle}>Translated digital editions</p>
          <p className={styles.lede}>
            Wilson Pruitt's <em>History of Methodism</em> is published in
            paperback by Wroot Press through Amazon KDP. Three of the
            translated editions — Swahili, Hungarian, and Korean — are in
            languages KDP does not currently support for paperback, so they
            are offered here as free PDF and EPUB downloads instead. The PDF
            is the same 5×8 typeset interior used for the paperback editions
            with the cover prepended; the EPUB is reflowable and ships with a
            hyperlinked table of contents.
          </p>
        </section>

        {editions.map((ed) => (
          <section key={ed.lang} className={styles.shell} id={ed.lang}>
            <h2 className={styles.eyebrow}>
              <span className={styles.eyebrowLang}>{ed.langName}</span>
              <span className={styles.eyebrowLocal}>{ed.localName}</span>
            </h2>
            <p className={styles.note}>{ed.note}</p>
            <ul className={styles.volList}>
              {ed.volumes.map((v) => (
                <li key={v.n} className={styles.volCard}>
                  <div className={styles.cover}>
                    <Image
                      src={filePath("cover", ed.lang, v.n)}
                      alt={`${ed.localName}, ${v.localSubtitle} — cover`}
                      width={1500}
                      height={2400}
                      sizes="(min-width: 720px) 180px, 140px"
                      className={styles.coverImg}
                    />
                  </div>
                  <div className={styles.volBody}>
                    <h3 className={styles.volTitle}>{ed.localName}</h3>
                    <p className={styles.volMeta}>{v.localSubtitle}</p>
                    <p className={styles.volMetaQuiet}>
                      {v.pages} pp · 5 × 8 · {ed.langName} edition
                    </p>
                    <div className={styles.downloads}>
                      <a
                        className={styles.btn}
                        href={filePath("pdf", ed.lang, v.n)}
                        download={downloadName("pdf", ed.localName, v.n)}
                      >
                        Download PDF
                      </a>
                      <a
                        className={styles.btnAlt}
                        href={filePath("epub", ed.lang, v.n)}
                        download={downloadName("epub", ed.localName, v.n)}
                      >
                        Download EPUB
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className={styles.shell}>
          <p className={styles.colophonNote}>
            The English and Spanish editions of <em>History of Methodism</em>{" "}
            are sold in paperback through Amazon. French, German, Portuguese,
            and Finnish editions are in preparation for the same paperback
            channel. These three downloadable editions are released free of
            charge so the work can reach readers in languages the paperback
            distribution does not yet reach.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <p className={styles.colophon}>
            Wroot Press is the publishing imprint of Wroot Labs. Named for{" "}
            <a href="https://en.wikipedia.org/wiki/Wroot" rel="noopener">
              Wroot
            </a>
            , the Lincolnshire fen-edge village where the Wesley family lived
            in the early eighteenth century.
          </p>
          <p className={styles.colophonMeta}>
            © {new Date().getFullYear()} Wroot Labs ·{" "}
            <a href="https://wrootlabs.com" rel="noopener">wrootlabs.com</a>
          </p>
        </div>
      </footer>
    </>
  );
}
