/**
 * Typed accessors over content/texts.json.
 *
 * ⚠ texts.json is a BUILD ARTIFACT, copied from
 * ~/wroot-press/church-in-palestine/web/texts.json, and is never edited here.
 * To change a text: edit that repo's web/texts/<slug>.md (headnote + provenance)
 * or re-run tools/texts_extract.py (body), then tools/texts_build.py, then copy.
 */

import data from "@/content/texts.json";

export type Segment =
  | { t: "text"; v: string }
  | { t: "em"; v: string }
  | { t: "ref"; n: string };

export type Block = {
  type: "heading" | "para" | "editorial";
  anchor?: string;
  marker?: string;
  label?: string;
  title?: string;
  segments?: Segment[];
};

export type Note = { n: string; text: string };

export type Text = {
  slug: string;
  work: string;
  author: string;
  translator: string;
  edition: string;
  year_written: string;
  year_translated?: number;
  scan_source: string;
  pd_reason: string;
  transcription: string;
  better_edition: string | null;
  rights: "pd-text" | "wroot-en";
  short_ch: number | null;
  headnote: Segment[][];
  headnote_plain: string[];
  blocks: Block[];
  notes: Note[];
};

const texts = (data as { works: Text[] }).works;

/** Chronological by composition, which is the order the chronology reads in. */
function firstYear(t: Text): number {
  const m = t.year_written.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

export function allTexts(): Text[] {
  return [...texts].sort((a, b) => firstYear(a) - firstYear(b));
}

export function getText(slug: string): Text | undefined {
  return texts.find((t) => t.slug === slug);
}

/**
 * Texts the shop translated itself, which live at their own imprint address and
 * are LINKED, never copied here.
 *
 * ⚠ Wilson's ruling, 2026-08-11: a translation has exactly one home. A second
 * copy at a second address is one fact in two places, and the day a crux is
 * corrected at one the other goes stale silently. Hosting these here would
 * duplicate work that was, in his words, "hard enough without duplicating."
 */
export type Elsewhere = {
  work: string;
  author: string;
  year_written: string;
  href: string;
  note: string;
};

export const elsewhere: Elsewhere[] = [
  {
    work: "The Letter of Antiochus the Monk to Eustathius",
    author: "Antiochus of Mar Saba",
    year_written: "after 614",
    href: "https://migne.app/pg/89/the-letter-of-antiochus-the-monk-to-eustathius",
    note:
      "Our own English, and as far as we know the first. Antiochus was a monk of " +
      "Mar Saba writing after the Persians took Jerusalem in 614. He is not " +
      "Antiochus Strategos, whose account of the same sack survives in Georgian; " +
      "some scholarship has identified the two, and they are not the same man.",
  },
  {
    work: "Letters to Various Correspondents",
    author: "Dorotheus of Gaza",
    year_written: "sixth century",
    href: "https://migne.app/pg/88/epistolae-ad-diversos",
    note:
      "Our own English of the letters of the abbot whose monastery stood near " +
      "Gaza. The instructions for which he is better known are a separate and " +
      "much longer work, not yet done.",
  },
];

/**
 * The rights line. The two cases are not cosmetic: claiming a licence over a
 * public-domain translation would be copyfraud, so a pd-text page claims
 * nothing over the text and says which parts are ours.
 */
export function rightsLine(t: Text): string {
  if (t.rights === "wroot-en") {
    return (
      "The English translation and the editorial matter on this page are © Wroot Labs, " +
      "licensed CC BY-NC 4.0. The original-language text is in the public domain and " +
      "nothing is claimed over it. For other uses, write to wilson@wrootlabs.com."
    );
  }
  return (
    "This translation is in the public domain and we claim nothing over it — copy it freely. " +
    "The headnote and the markup of this page (its section anchors and segmentation) are " +
    "© Wroot Labs, licensed CC BY-NC 4.0."
  );
}
