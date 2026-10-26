import Link from "next/link";
import { workHref, type Shelf, type Work } from "@/content/catalog";
import styles from "./ShelfBand.module.css";

/** One subject shelf on the home page: name, tagline, three featured works, link to the shelf. */
export default function ShelfBand({
  shelf,
  featured,
  count,
  dark = false,
}: {
  shelf: Shelf;
  featured: Work[];
  count: number;
  dark?: boolean;
}) {
  return (
    <section
      className={dark ? styles.bandDark : styles.band}
      aria-labelledby={`shelf-${shelf.id}`}
    >
      <div className={styles.shell}>
        <h2 id={`shelf-${shelf.id}`} className={styles.eyebrow}>
          <Link href={shelf.href}>{shelf.name}</Link>
        </h2>
        <p className={styles.tagline}>{shelf.tagline}</p>

        <ul className={styles.featured}>
          {featured.map((w) => {
            const href = workHref(w);
            const internal = href.startsWith("/");
            const Anchor = internal ? Link : "a";
            return (
              <li key={w.slug} className={styles.item}>
                <h3 className={styles.title}>
                  <Anchor href={href} {...(internal ? {} : { rel: "noopener" })}>
                    {w.title}
                  </Anchor>
                </h3>
                <p className={styles.summary}>{w.summary}</p>
              </li>
            );
          })}
        </ul>

        <Link href={shelf.href} className={styles.more}>
          Browse the whole shelf ({count}) →
        </Link>
      </div>
    </section>
  );
}
