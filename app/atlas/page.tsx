import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import gazetteer from "@/content/gazetteer.json";
import Atlas, { type Part, type Place, type Route } from "./Atlas";
import styles from "./page.module.css";

const places = gazetteer.places as Place[];
const parts = gazetteer.parts as Part[];
const routes = gazetteer.routes as Route[];
const chapters = gazetteer.chapters as { n: number; title: string }[];

export const metadata: Metadata = {
  title: "An Atlas of the Church in Palestine · Wroot Press",
  description:
    "Every place the book names, pinned and searchable under the names the " +
    "sources use for it — a period map for each of the seven parts, and the " +
    "Gaza road drawn twice.",
};

export default function AtlasPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <Link href="/" aria-label="Wroot Press">
            <Image
              src="/wordmark.svg"
              alt="Wroot Press"
              width={180}
              height={45}
              priority
              className={styles.wordmark}
            />
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.shell}>
          <h1 className={styles.h1}>An Atlas of the Church in Palestine</h1>
          <p className={styles.lede}>
            {gazetteer.count} places, from Jerusalem and Gaza down to villages the
            book names once. Choose a period and the map redraws to the country
            that period had: Part I is a province, Part IV is an empire, and the
            same hill villages are in both.
          </p>
          <p className={styles.meta}>
            Companion to <em>The Church in Palestine</em>, forthcoming from Wroot
            Press. See also <Link href="/chronology">the chronology</Link> and{" "}
            <Link href="/texts">the texts</Link>.
          </p>
        </section>

        <div className={styles.shell}>
          <Atlas
            places={places}
            parts={parts}
            routes={routes}
            chapters={chapters}
          />
        </div>

        <section className={styles.shell}>
          <h2 className={styles.h2}>The names</h2>
          <p className={styles.colophon}>
            A place is listed under the name this book uses and searchable under
            every other name it has carried. That is not a courtesy to the
            reader; it is most of the work. Jifna is Jufna and Gophna, Taybeh is
            Taiyibeh and before that Ephraim, Ramallah is Ram-Allah in the
            Survey of Western Palestine, Beisan is Scythopolis and Beth Shean,
            Nablus is Neapolis and Shechem, and Jerusalem spent four centuries
            being called Aelia in every official document while the people who
            lived there went on calling it Jerusalem. A reader who cannot search
            the spelling in front of them has no companion at all.
          </p>

          <h2 className={styles.h2}>What a pin is and is not</h2>
          <p className={styles.colophon}>
            A pin is a coordinate, and a coordinate is a fact about where
            something is — not a drawing of it, and not a claim about what stood
            there. Where the site is identified and excavated the pin is on it.
            Where the identification is secure but the site is under a modern
            town, the pin is the town and the popup says so. Regions — the Negev,
            the Judaean desert — are pinned at their middle for want of anywhere
            better, and are marked in the second colour. Sites are annotated only
            where they are contested or where the ground itself is the argument;
            the rest carry their dates in the chronology and their story in the
            book.
          </p>

          <h2 className={styles.h2}>The size of each pin</h2>
          <p className={styles.colophon}>
            Pins are scaled by how often the book names the place, on a flattened
            scale. Jerusalem is named {places[0]?.count} times and a dozen
            villages once each; drawn to scale, the villages would not be
            visible, and the villages are the reason this exists.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <p className={styles.colophonMeta}>
            © {new Date().getFullYear()} Wroot Labs ·{" "}
            <Link href="/">wrootpress.com</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
