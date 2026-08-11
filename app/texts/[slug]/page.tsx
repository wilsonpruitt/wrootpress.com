import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allTexts,
  getText,
  rightsLine,
  type Block,
  type Segment,
} from "@/content/texts";
import styles from "../texts.module.css";

export function generateStaticParams() {
  return allTexts().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const text = getText(slug);
  if (!text) return { title: "Not found · Wroot Press" };
  return {
    title: `${text.work} · Wroot Press`,
    description: text.headnote_plain[0],
  };
}

/** Footnote markers become links to the note and back again. */
function renderSegments(segments: Segment[] | undefined) {
  if (!segments) return null;
  return segments.map((s, i) => {
    if (s.t === "text") return <span key={i}>{s.v}</span>;
    if (s.t === "em") return <em key={i}>{s.v}</em>;
    return (
      <a
        key={i}
        id={`ref${s.n}`}
        href={`#note${s.n}`}
        className={styles.ref}
        aria-label={`Note ${s.n}`}
      >
        {s.n}
      </a>
    );
  });
}

function renderBlock(block: Block, i: number, editorYear?: number) {
  if (block.type === "heading") {
    // A heading can carry a footnote marker mid-title (ANF puts one in each of
    // the appended imperial letters). Render through segments where they exist
    // so the marker becomes a real superscript link instead of literal "[^1916]".
    return (
      <h2 key={i} id={block.anchor} className={styles.heading}>
        {block.label && (
          <span className={styles.headingLabel}>{block.label}</span>
        )}
        {block.segments ? renderSegments(block.segments) : block.title}
      </h2>
    );
  }

  // Everything before the first internal division in a nineteenth-century
  // volume is that century's editor talking, not the ancient author. Saying so
  // costs a line and prevents the commonest misreading of a reprinted text.
  if (block.type === "editorial") {
    return (
      <div key={i} className={styles.editorial}>
        <span className={styles.editorialTag}>
          {editorYear ? `Note by the ${editorYear} editor` : "Note by the editor of this edition"}
        </span>
        {renderSegments(block.segments)}
      </div>
    );
  }

  return (
    <p key={i} id={block.anchor} className={styles.para}>
      {block.marker && (
        <span className={styles.marker}>
          <a href={`#${block.anchor}`}>{block.marker}</a>{" "}
        </span>
      )}
      {renderSegments(block.segments)}
    </p>
  );
}

export default async function TextPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const text = getText(slug);
  if (!text) notFound();

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
        <div className={styles.shell}>
          <p className={styles.kicker}>
            <Link href="/texts">Sources</Link>
          </p>
          <h1 className={styles.h1}>{text.work}</h1>
          <p className={styles.byline}>
            {text.author}, written {text.year_written}
          </p>

          <div className={styles.headnote}>
            {text.headnote.map((segs, i) => (
              <p key={i}>{renderSegments(segs)}</p>
            ))}
          </div>

          <section className={styles.provenance} aria-label="Provenance">
            <p className={styles.provenanceHead}>Where this text comes from</p>
            <dl className={styles.provenanceList}>
              <dt>Translator</dt>
              <dd>{text.translator}</dd>
              <dt>Edition</dt>
              <dd>{text.edition}</dd>
              <dt>Source</dt>
              <dd>{text.scan_source}</dd>
              <dt>Public domain</dt>
              <dd>{text.pd_reason}</dd>
              {text.better_edition && (
                <>
                  <dt>Better edition</dt>
                  <dd>{text.better_edition}</dd>
                </>
              )}
            </dl>
            <p className={styles.rights}>{rightsLine(text)}</p>
          </section>

          <div className={styles.text}>
            {text.blocks.map((b, i) => renderBlock(b, i, text.year_translated))}
          </div>

          {text.notes.length > 0 && (
            <section className={styles.notes} aria-label="Notes">
              <p className={styles.notesHead}>
                Notes to the text — {text.edition}
              </p>
              <ul className={styles.notesList}>
                {text.notes.map((n) => (
                  <li key={n.n} id={`note${n.n}`} className={styles.note}>
                    <span className={styles.noteNum}>
                      <a href={`#ref${n.n}`}>{n.n}</a>
                    </span>
                    <span>{n.text}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className={styles.colophon}>
            Section numbers are the work&rsquo;s own and are the way to cite it:
            they hold in any edition, where a page number holds only in one. Each
            is a link, so <code>#s12</code> on the end of this address will bring
            a reader to the same place. See also the{" "}
            <Link href="/chronology">chronology</Link>.
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <p>
            © {new Date().getFullYear()} Wroot Labs ·{" "}
            <Link href="/">wrootpress.com</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
