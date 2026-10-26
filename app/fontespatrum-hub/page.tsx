import type { Metadata } from "next";
import Image from "next/image";
import { shelves, worksForShelf } from "@/content/catalog";
import SiteFooter from "@/components/SiteFooter";
import WorkCard from "@/components/WorkCard";
import chrome from "@/components/SiteChrome.module.css";
import styles from "../page.module.css";

/* The home page of fontespatrum.org. proxy.ts rewrites that host's "/" here;
   the route is also reachable on wrootpress.com/fontespatrum-hub, which is why
   the canonical URL is pinned to the real domain. */

const URL = "https://fontespatrum.org";
const TITLE = "Fontes Patrum";
const DESCRIPTION =
  "The Fathers and the medieval masters, in Latin, Greek and English — free reading editions from Wroot Press.";
const OG_IMAGE = `${URL}/fontespatrum-og.png`;

export const metadata: Metadata = {
  title: `${TITLE} — the Fathers and the medieval masters`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Fontes Patrum",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Fontes Patrum — the Fathers and the medieval masters, in Latin, Greek and English",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function FontesPatrumHub() {
  const shelf = shelves.find((s) => s.id === "patrum")!;
  const onShelf = worksForShelf("patrum");
  const reading = onShelf.filter((w) =>
    w.editions.some((e) => e.format === "reader"),
  );
  const print = onShelf.filter(
    (w) => !w.editions.some((e) => e.format === "reader"),
  );

  return (
    <>
      <header className={chrome.header}>
        <div className={chrome.shell}>
          <a href="https://wrootpress.com" aria-label="Wroot Press">
            <Image
              src="/wordmark.svg"
              alt="Wroot Press"
              width={240}
              height={60}
              priority
              className={chrome.wordmark}
            />
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.shell}>
          <h1 className={styles.h1}>{shelf.name}</h1>
          <p className={styles.lede}>{shelf.tagline}</p>
          <p className={styles.collectionBlurb}>
            “The Fathers” is meant here in the broad sense Migne gave it: his{" "}
            <em>Patrologia Latina</em> runs from Tertullian to Innocent III, so
            the saints&rsquo; lives, the medieval commentators and the schoolmen
            who read them all belong. Each edition is its own site, with the
            original language beside English; this page is the way in to all of
            them.
          </p>
        </section>

        <section className={styles.shell}>
          <div className={styles.collectionHead}>
            <h2 className={styles.eyebrow}>Reading editions</h2>
          </div>
          <ul className={styles.titleList}>
            {reading.map((w) => (
              <WorkCard key={w.slug} work={w} />
            ))}
          </ul>
        </section>

        {print.length > 0 && (
          <section className={styles.shell}>
            <div className={styles.collectionHead}>
              <h2 className={styles.eyebrow}>In print</h2>
            </div>
            <ul className={styles.titleList}>
              {print.map((w) => (
                <WorkCard key={w.slug} work={w} />
              ))}
            </ul>
          </section>
        )}

        <section className={styles.shell}>
          <div className={styles.collectionHead}>
            <h2 className={styles.eyebrow}>More from Wroot Press</h2>
          </div>
          <ul className={styles.otherShelves}>
            {shelves
              .filter((s) => s.id !== "patrum")
              .map((s) => (
                <li key={s.id}>
                  <a href={`https://wrootpress.com${s.href}`}>{s.name}</a>
                  <span> — {s.tagline}</span>
                </li>
              ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
