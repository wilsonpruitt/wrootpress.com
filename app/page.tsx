import Image from "next/image";
import Link from "next/link";
import {
  collectionsInOrder,
  seriesGroups,
  getWork,
  workHref,
  BESTSELLER_SLUGS,
  FEATURED_EDITION_SLUGS,
  FORMAT_NAMES,
  type Work,
} from "@/content/catalog";
import WorkCard from "@/components/WorkCard";
import styles from "./page.module.css";

// Short lines for the three featured digital editions. Each names what the
// edition IS in relation to the other two: the Fathers, the Master, the
// commentator — read left to right, it is one tradition.
const EDITION_ROLE: Record<string, { kicker: string; line: string }> = {
  migne: {
    kicker: "The Fathers",
    line: "Migne's Patrologia Latina and Graeca in English, citable by volume and column — every work a page, Latin and Greek alongside, and first-ever English renderings added one at a time.",
  },
  sententiae: {
    kicker: "The Master",
    line: "Peter Lombard's Sentences laid out like a Talmud page — the distinctio in the center, four centuries of commentators around it, each witness dated, sourced, and threaded to the ones it contests.",
  },
  "bonaventure-sentences": {
    kicker: "The Commentator",
    line: "Bonaventure's Commentary on the Sentences from the Quaracchi text — Latin alongside English, with the scholion and the apparatus criticus.",
  },
};

function hostOf(url?: string): string {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function works(slugs: string[]): Work[] {
  return slugs.map((s) => getWork(s)).filter((w): w is Work => !!w);
}

export default function HomePage() {
  const bestsellers = works(BESTSELLER_SLUGS);
  const editions = works(FEATURED_EDITION_SLUGS);
  const featured = new Set([...BESTSELLER_SLUGS, ...FEATURED_EDITION_SLUGS]);

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
            patristic, Reformation, Wesleyan, and French Catholic studies —
            print titles distributed through Amazon and free digital reading
            editions hosted here.
          </p>
        </section>

        {/* ---------- Bestsellers ---------- */}
        <section className={styles.shell} aria-labelledby="readers-h">
          <div className={styles.collectionHead}>
            <h2 id="readers-h" className={styles.eyebrow}>
              Most read
            </h2>
            <p className={styles.collectionBlurb}>
              The books readers reach for first: Ambrose on the great psalm,
              and the Books of Homilies in their first clean modern critical
              edition.
            </p>
          </div>

          <ul className={styles.shelf}>
            {bestsellers.map((w) => {
              const buy = w.editions.filter(
                (e) => e.url && e.format !== "reader",
              );
              const reader = w.editions.find((e) => e.format === "reader");
              return (
                <li key={w.slug} className={styles.shelfItem}>
                  <Link href={workHref(w)} className={styles.shelfCoverLink}>
                    {w.cover && (
                      <Image
                        src={w.cover}
                        alt={`Cover of ${w.title}${w.subtitle ? `: ${w.subtitle}` : ""}`}
                        width={300}
                        height={450}
                        className={styles.shelfCover}
                      />
                    )}
                  </Link>
                  {w.author !== w.title && (
                    <p className={styles.shelfAuthor}>{w.author}</p>
                  )}
                  <h3 className={styles.shelfTitle}>
                    <Link href={workHref(w)}>{w.title}</Link>
                  </h3>
                  {w.subtitle && (
                    <p className={styles.shelfSubtitle}>{w.subtitle}</p>
                  )}
                  <div className={styles.buyRow}>
                    {buy.map((e) => (
                      <a
                        key={e.format + e.lang}
                        href={e.url}
                        rel="noopener"
                        className={styles.buy}
                      >
                        {FORMAT_NAMES[e.format]}
                        {e.price && <span> {e.price}</span>}
                      </a>
                    ))}
                    {reader && (
                      <a
                        href={reader.url}
                        rel="noopener"
                        className={styles.buyQuiet}
                      >
                        Read free online
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ---------- The Latin line: Migne → Lombard → Bonaventure ---------- */}
        <section className={styles.band} aria-labelledby="latin-h">
          <div className={styles.shell}>
            <h2 id="latin-h" className={styles.bandEyebrow}>
              The Latin library
            </h2>
            <p className={styles.bandLede}>
              Three free reading editions, one tradition — the Fathers, the
              Master who gathered them, and the commentator who taught from
              him. Original language beside English, openly licensed.
            </p>

            <ol className={styles.editions}>
              {editions.map((w) => {
                const role = EDITION_ROLE[w.slug];
                const href = workHref(w);
                return (
                  <li key={w.slug} className={styles.edition}>
                    <p className={styles.editionKicker}>{role?.kicker}</p>
                    <h3 className={styles.editionTitle}>
                      <a href={href} rel="noopener">
                        {w.title}
                      </a>
                    </h3>
                    <p className={styles.editionLine}>
                      {role?.line ?? w.summary}
                    </p>
                    <a href={href} rel="noopener" className={styles.editionLink}>
                      {hostOf(href)} →
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ---------- Full catalogue ---------- */}
        <section className={styles.shell}>
          <h2 className={styles.catalogueH}>The catalogue</h2>
        </section>

        {collectionsInOrder().map((collection) => {
          const groups = seriesGroups(collection.id)
            .map((g) => ({
              ...g,
              works: g.works.filter((w) => !featured.has(w.slug)),
            }))
            .filter((g) => g.works.length > 0);
          if (groups.length === 0) return null;
          return (
            <section key={collection.id} className={styles.shell}>
              <div className={styles.collectionHead}>
                <h2 className={styles.eyebrow}>{collection.name}</h2>
                {collection.blurb && (
                  <p className={styles.collectionBlurb}>
                    {collection.blurb}
                    {collection.blurbHref && (
                      <>
                        {" "}
                        <a href={collection.blurbHref} rel="noopener">
                          {collection.blurbLinkText ?? "Learn more"} →
                        </a>
                      </>
                    )}
                  </p>
                )}
              </div>

              {groups.map((group) => (
                <div key={group.series ?? "_"} className={styles.seriesBlock}>
                  {group.series && (
                    <h3 className={styles.seriesName}>{group.series}</h3>
                  )}
                  <ul className={styles.titleList}>
                    {group.works.map((w) => (
                      <WorkCard key={w.slug} work={w} />
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          );
        })}
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
