import Image from "next/image";
import styles from "./page.module.css";

type Title = {
  name: string;
  description: string;
  href: string;
  meta?: string;
};

const printTitles: Title[] = [
  {
    name: "Wesley Dissertations",
    description:
      "Five-volume scholarly edition of John Wesley's dissertations, with apparatus and editorial notes.",
    href: "https://www.amazon.com/dp/B0GSP6VTPP",
    meta: "Five volumes · 2026",
  },
  {
    name: "History of Methodism",
    description:
      "Four-volume publication drawn from the History of Methodism podcast — narrative history with primary-source citations.",
    href: "#",
    meta: "Four volumes · in preparation",
  },
  {
    name: "Acta Devotional",
    description:
      "A daily devotional spun off from the Acta Sanctorum project — one entry per day, one saint per page, drawn from the Bollandist Latin and lightly modernised for reading.",
    href: "#",
    meta: "365 entries · in preparation",
  },
];

const digitalEditions: Title[] = [
  {
    name: "Acta Sanctorum",
    description:
      "The flagship project — a digital reading edition of the Bollandist Acta Sanctorum, the seventeenth-century Latin compendium of saints' lives. Latin text, English translation, and editorial apparatus, organised by feast day.",
    href: "https://actasanctorum.org",
    meta: "Hosted at actasanctorum.org · January–April complete",
  },
  {
    name: "Ambrose of Milan",
    description:
      "Critical reading edition of Ambrose's Expositio in Psalmum CXVIII, following Petschenig (CSEL 62), with Latin text, apparatus, and English translation.",
    href: "https://ambrose.wrootpress.com",
    meta: "Live",
  },
  {
    name: "Bonaventure, Sentences",
    description:
      "Quaracchi-text reading edition of Bonaventure's Commentary on the Sentences, Latin alongside English translation, with scholion and apparatus criticus.",
    href: "https://bonaventure.wrootpress.com",
    meta: "In progress · Book I, dd. 1–30",
  },
  {
    name: "Topographia Sacra",
    description:
      "Geographical editions of the place-heavy books of scripture, pairing the World English Bible with maps and a gazetteer of every named place. Identifications follow the Anchor Bible Dictionary. The first edition is the Book of Joshua.",
    href: "https://topographia.wrootpress.com",
    meta: "In progress · Joshua",
  },
];

export default function HomePage() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.shell}>
          <Image
            src="/wordmark.svg"
            alt="Wroot Press"
            width={240}
            height={60}
            priority
            className={styles.wordmark}
          />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.shell}>
          <h1 className={styles.h1}>An independent imprint.</h1>
          <p className={styles.lede}>
            Wroot Press publishes primary-source editions and original works in
            Wesleyan and patristic studies — print titles distributed through
            Amazon KDP and digital reading editions hosted here.
          </p>
        </section>

        <section className={styles.shell}>
          <h2 className={styles.eyebrow}>Print titles</h2>
          <ul className={styles.titleList}>
            {printTitles.map((t) => (
              <li key={t.name} className={styles.titleCard}>
                <h3 className={styles.titleName}>{t.name}</h3>
                {t.meta && <p className={styles.titleMeta}>{t.meta}</p>}
                <p className={styles.titleDescription}>{t.description}</p>
                {t.href !== "#" && (
                  <a className={styles.titleLink} href={t.href} rel="noopener">
                    View on Amazon →
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.shell}>
          <h2 className={styles.eyebrow}>Digital editions</h2>
          <ul className={styles.titleList}>
            {digitalEditions.map((t) => (
              <li key={t.name} className={styles.titleCard}>
                <h3 className={styles.titleName}>{t.name}</h3>
                {t.meta && <p className={styles.titleMeta}>{t.meta}</p>}
                <p className={styles.titleDescription}>{t.description}</p>
                {t.href !== "#" && (
                  <a className={styles.titleLink} href={t.href} rel="noopener">
                    Read the edition →
                  </a>
                )}
              </li>
            ))}
          </ul>
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
            <a href="https://wrootlabs.com" rel="noopener">
              wrootlabs.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
