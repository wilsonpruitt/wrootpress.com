import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getWork,
  detailWorks,
  editionsByLang,
  worksForCollection,
  collections,
  LANG_NAMES,
  FORMAT_NAMES,
  workHref,
  type Work,
  type Edition,
} from "@/content/catalog";
import styles from "./page.module.css";

export function generateStaticParams() {
  return detailWorks().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Not found · Wroot Press" };
  const desc = work.description?.[0] ?? work.summary;
  return {
    title: `${work.title} · Wroot Press`,
    description: desc,
    openGraph: {
      title: work.title,
      description: desc,
      images: work.cover ? [{ url: work.cover }] : undefined,
    },
  };
}

function priceLabel(e: Edition): string {
  const fmt = FORMAT_NAMES[e.format];
  if (e.price) return `${fmt} · ${e.price}`;
  if (e.format === "reader") return "Read online — free";
  return fmt;
}

function bookJsonLd(work: Work) {
  const offers = work.editions
    .filter((e) => e.url && e.price)
    .map((e) => ({
      "@type": "Offer",
      price: e.price?.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      url: e.url,
      availability: "https://schema.org/InStock",
    }));
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: work.title,
    ...(work.subtitle ? { alternateName: work.subtitle } : {}),
    author: { "@type": "Person", name: work.author },
    publisher: { "@type": "Organization", name: "Wroot Press" },
    inLanguage: Array.from(new Set(work.editions.map((e) => e.lang))),
    description: work.description?.join(" ") ?? work.summary,
    ...(offers.length ? { offers } : {}),
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work || !work.detail) notFound();

  const collection = collections.find((c) => c.id === work.collectionId);
  const grouped = editionsByLang(work);
  const related = work.series
    ? worksForCollection(work.collectionId).filter(
        (w) => w.series === work.series && w.slug !== work.slug,
      )
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        // Static catalog data only (no user input); escape `<` so a stray
        // "</script>" in any field can never break out of the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookJsonLd(work)).replace(/</g, "\\u003c"),
        }}
      />

      <header className={styles.header}>
        <div className={styles.shell}>
          <Image
            src="/wordmark.svg"
            alt="Wroot Press"
            width={200}
            height={50}
            className={styles.wordmark}
          />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.shell}>
          <p className={styles.breadcrumb}>
            <Link href="/">Wroot Press</Link>
            {collection && <> · {collection.name}</>}
            {work.series && <> · {work.series}</>}
          </p>

          <div className={styles.top}>
            {work.cover && (
              <div className={styles.coverWrap}>
                <Image
                  src={work.cover}
                  alt={`Cover of ${work.title}`}
                  width={300}
                  height={450}
                  className={styles.cover}
                  priority
                />
              </div>
            )}

            <div className={styles.head}>
              {work.status === "forthcoming" && (
                <span className={styles.forthcoming}>Forthcoming</span>
              )}
              <h1 className={styles.title}>{work.title}</h1>
              {work.subtitle && (
                <p className={styles.subtitle}>{work.subtitle}</p>
              )}
              <p className={styles.author}>{work.author}</p>

              <div className={styles.editions}>
                {grouped.map(({ lang, editions }) => (
                  <div key={lang} className={styles.langGroup}>
                    <h2 className={styles.langName}>{LANG_NAMES[lang]}</h2>
                    <ul className={styles.editionList}>
                      {editions.map((e, i) => (
                        <li key={i} className={styles.edition}>
                          {e.url ? (
                            <a
                              className={styles.buyLink}
                              href={e.url}
                              rel="noopener"
                            >
                              {priceLabel(e)} →
                            </a>
                          ) : (
                            <span className={styles.buySoon}>
                              {priceLabel(e)}
                            </span>
                          )}
                          {e.note && (
                            <span className={styles.editionNote}>{e.note}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {grouped.length === 0 && (
                  <p className={styles.buySoon}>
                    In preparation — editions coming soon.
                  </p>
                )}
              </div>
            </div>
          </div>

          {work.description && (
            <div className={styles.description}>
              {work.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {related.length > 0 && (
            <div className={styles.related}>
              <h2 className={styles.relatedHead}>
                More in {work.series}
              </h2>
              <ul className={styles.relatedList}>
                {related.map((w) => (
                  <li key={w.slug}>
                    <Link href={workHref(w)}>{w.title}</Link>
                    {w.subtitle && (
                      <span className={styles.relatedSub}> — {w.subtitle}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className={styles.back}>
            <Link href="/">← All titles</Link>
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
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
