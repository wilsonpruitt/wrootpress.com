import Image from "next/image";
import { collectionsInOrder, seriesGroups } from "@/content/catalog";
import WorkCard from "@/components/WorkCard";
import styles from "./page.module.css";

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
            Wesleyan, French Catholic, and patristic studies — print titles
            distributed through Amazon and digital reading editions hosted here.
          </p>
        </section>

        {collectionsInOrder().map((collection) => {
          const groups = seriesGroups(collection.id);
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
