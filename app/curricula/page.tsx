import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cohort Curricula — Peer-Led Study Guides · Wroot Press",
  description:
    "Peer-led, multi-session study curricula for clergy cohorts, built from Wroot Press primary-source editions. A facilitator-light web reader and a printable guide for each unit.",
};

type Curriculum = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  sessions: number;
  tradition: string;
  blurb: string;
};

const curricula: Curriculum[] = [
  {
    slug: "scripture-way-of-salvation",
    title: "The Scripture Way of Salvation",
    subtitle: "A four-session Wesleyan cohort study",
    author: "John Wesley",
    sessions: 4,
    tradition: "Wesleyan / Methodist",
    blurb:
      "Wesley's 1765 sermon distilled the whole Christian way into one verse — “by grace are ye saved through faith.” This study walks a cohort of pastors through that map in four sittings, one part of the sermon per meeting: framing, discussion, Wesleyan covenant questions, and a weekly practice. Built for peers — no expert in the room, and none required.",
  },
  {
    slug: "order-of-salvation",
    title: "The Order of Salvation",
    subtitle: "Four sermons on the Wesleyan way — a cohort survey",
    author: "John Wesley",
    sessions: 4,
    tradition: "Wesleyan / Methodist",
    blurb:
      "A survey across four of Wesley's Standard Sermons, tracing the order of salvation as he preached it over thirty years: the awakening of a sleeping soul, justification by faith, the new birth, and the witness of the Spirit. One sermon per meeting — the spine of Wesleyan soteriology, drawn straight from the sermons, held up as a mirror to what we actually preach.",
  },
];

export default function CurriculaPage() {
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
            <span>Cohort Curricula</span>
          </p>
          <h1 className={styles.h1}>Cohort Curricula</h1>
          <p className={styles.subtitle}>Peer-led study, built from the source</p>
          <p className={styles.lede}>
            Multi-session study units for small cohorts — clergy peer groups,
            covenant bands, reading circles — drawn from Wroot Press's
            primary-source editions rather than written from scratch. Each unit
            is facilitator-light: a convener keeps time and asks the questions,
            and the cohort does the rest. Every session carries a short reading,
            a framing, discussion and covenant questions, and a practice for the
            week. Read each unit here, or download a printable facilitator guide.
          </p>
        </section>

        <section className={styles.shell}>
          <ul className={styles.list}>
            {curricula.map((c) => (
              <li key={c.slug} className={styles.card}>
                <h2 className={styles.eyebrow}>
                  <span className={styles.eyebrowKind}>
                    {c.sessions} sessions · {c.tradition}
                  </span>
                  <span className={styles.eyebrowAuthor}>{c.author}</span>
                </h2>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardSub}>{c.subtitle}</p>
                <p className={styles.cardBlurb}>{c.blurb}</p>
                <div className={styles.actions}>
                  <a className={styles.btn} href={`/curricula/${c.slug}`}>
                    Open the reader →
                  </a>
                  <a
                    className={styles.btnAlt}
                    href={`/downloads/curricula/${c.slug}.pdf`}
                    download
                  >
                    Facilitator guide (PDF)
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.shell}>
          <p className={styles.colophonNote}>
            More units are in preparation, drawn from the Wesley sermons, the
            History of Methodism, and other Wroot Press editions. The readings in
            each unit link back to those source texts, so corrections to the
            underlying editions carry through to the curricula.
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
            , the Lincolnshire fen-edge village where the Wesley family lived in
            the early eighteenth century.
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
