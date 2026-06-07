import Image from "next/image";
import Link from "next/link";
import {
  type Work,
  workHref,
  workLangs,
  LANG_BADGE,
  FORMAT_NAMES,
} from "@/content/catalog";
import styles from "./WorkCard.module.css";

function formatList(w: Work): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const e of w.editions) {
    const name = FORMAT_NAMES[e.format];
    if (!seen.has(name)) {
      seen.add(name);
      out.push(name);
    }
  }
  return out.join(" · ");
}

function linkLabel(w: Work): string {
  if (w.detail) return "View details →";
  const fmts = new Set(w.editions.map((e) => e.format));
  if (fmts.has("reader") && fmts.size === 1) return "Read the edition →";
  if (w.external?.startsWith("/")) return "Browse →";
  return "View on Amazon →";
}

export default function WorkCard({ work }: { work: Work }) {
  const href = workHref(work);
  const internal = href.startsWith("/");
  const langs = workLangs(work);
  const formats = formatList(work);
  const Anchor = internal ? Link : "a";

  return (
    <li className={styles.card}>
      {work.cover && (
        <div className={styles.coverWrap}>
          <Image
            src={work.cover}
            alt={`Cover of ${work.title}`}
            width={233}
            height={350}
            className={styles.cover}
          />
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.tags}>
          {work.status === "forthcoming" && (
            <span className={styles.forthcoming}>Forthcoming</span>
          )}
          {langs.map((l) => (
            <span key={l} className={styles.langBadge}>
              {LANG_BADGE[l]}
            </span>
          ))}
        </div>

        <h4 className={styles.name}>{work.title}</h4>
        {work.subtitle && <p className={styles.subtitle}>{work.subtitle}</p>}
        {formats && <p className={styles.formats}>{formats}</p>}
        <p className={styles.summary}>{work.summary}</p>

        {href !== "#" && (
          <Anchor
            className={styles.link}
            href={href}
            {...(internal ? {} : { rel: "noopener" })}
          >
            {linkLabel(work)}
          </Anchor>
        )}
      </div>
    </li>
  );
}
