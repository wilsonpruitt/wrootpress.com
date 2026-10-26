import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getShelf, shelves, worksForShelf } from "@/content/catalog";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WorkCard from "@/components/WorkCard";
import styles from "../page.module.css";

export const dynamicParams = false;

// Only shelves hosted on wrootpress.com get a page; a shelf with its own
// domain (href is absolute) is redirected there in next.config.ts.
export function generateStaticParams() {
  return shelves
    .filter((s) => s.href.startsWith("/"))
    .map((s) => ({ shelf: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shelf: string }>;
}): Promise<Metadata> {
  const shelf = getShelf((await params).shelf);
  if (!shelf) return {};
  return {
    title: `${shelf.name} · Wroot Press`,
    description: shelf.tagline,
    alternates: { canonical: shelf.href },
  };
}

export default async function ShelfPage({
  params,
}: {
  params: Promise<{ shelf: string }>;
}) {
  const shelf = getShelf((await params).shelf);
  if (!shelf) notFound();

  const onShelf = worksForShelf(shelf.id);
  // Free reading editions first — that is what most visitors came for.
  const reading = onShelf.filter((w) =>
    w.editions.some((e) => e.format === "reader"),
  );
  const print = onShelf.filter(
    (w) => !w.editions.some((e) => e.format === "reader"),
  );
  const groups = [
    { name: "Reading editions", works: reading },
    { name: "In print", works: print },
  ].filter((g) => g.works.length > 0);

  return (
    <>
      <SiteHeader linkHome />

      <main className={styles.main}>
        <section className={styles.shell}>
          <p className={styles.collectionBlurb}>
            <Link href="/">Wroot Press</Link> · Shelves
          </p>
          <h1 className={styles.h1}>{shelf.name}</h1>
          <p className={styles.lede}>{shelf.tagline}</p>
        </section>

        {groups.map((group) => (
          <section key={group.name} className={styles.shell}>
            <div className={styles.collectionHead}>
              <h2 className={styles.eyebrow}>{group.name}</h2>
            </div>
            <ul className={styles.titleList}>
              {group.works.map((w) => (
                <WorkCard key={w.slug} work={w} />
              ))}
            </ul>
          </section>
        ))}

        <section className={styles.shell} aria-labelledby="other-shelves-h">
          <div className={styles.collectionHead}>
            <h2 id="other-shelves-h" className={styles.eyebrow}>
              Other shelves
            </h2>
          </div>
          <ul className={styles.otherShelves}>
            {shelves
              .filter((s) => s.id !== shelf.id)
              .map((s) => (
                <li key={s.id}>
                  <Link href={s.href}>{s.name}</Link>
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
