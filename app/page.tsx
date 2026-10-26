import Image from "next/image";
import Link from "next/link";
import {
  getWork,
  shelves,
  unshelvedWorks,
  worksForShelf,
  workHref,
  BESTSELLER_SLUGS,
  SHELF_FEATURED,
  FORMAT_NAMES,
  type Work,
} from "@/content/catalog";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ShelfBand from "@/components/ShelfBand";
import WorkCard from "@/components/WorkCard";
import styles from "./page.module.css";

function works(slugs: string[]): Work[] {
  return slugs.map((s) => getWork(s)).filter((w): w is Work => !!w);
}

export default function HomePage() {
  const bestsellers = works(BESTSELLER_SLUGS);
  const also = unshelvedWorks();

  return (
    <>
      <SiteHeader />

      <main className={styles.main}>
        <section className={styles.shell}>
          <h1 className={styles.h1}>An independent imprint.</h1>
          <p className={styles.lede}>
            Wroot Press publishes primary-source editions and original works in
            patristic, Reformation, Wesleyan, and French Catholic studies —
            print titles distributed through Amazon and free digital reading
            editions, gathered here into three shelves.
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

        {/* ---------- The three shelves ---------- */}
        <div className={styles.shelves}>
          {shelves.map((shelf, i) => (
            <ShelfBand
              key={shelf.id}
              shelf={shelf}
              featured={works(SHELF_FEATURED[shelf.id])}
              count={worksForShelf(shelf.id).length}
              dark={i === 0}
            />
          ))}
        </div>

        {/* ---------- Also from Wroot Press ---------- */}
        {also.length > 0 && (
          <section className={styles.shell} aria-labelledby="also-h">
            <div className={styles.collectionHead}>
              <h2 id="also-h" className={styles.eyebrow}>
                Also from Wroot Press
              </h2>
            </div>
            <ul className={styles.titleList}>
              {also.map((w) => (
                <WorkCard key={w.slug} work={w} />
              ))}
            </ul>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
