// ============================================================
// Wroot Press — catalog (source of truth)
// Replaces the old flat Title[] in app/page.tsx.
// Shape: Collection → Work (grouped by optional `series`) → Edition[].
// A work with `detail: true` gets a /books/[slug] page; otherwise its
// card links to `external` (or its first edition url).
// ============================================================

export type Lang = "en" | "es" | "fr" | "la" | "sw" | "hu" | "ko";
export type Format =
  | "paperback"
  | "hardcover"
  | "kindle"
  | "pdf"
  | "epub"
  | "reader";

export type Edition = {
  lang: Lang;
  format: Format;
  price?: string;
  asin?: string;
  isbn?: string;
  url?: string; // omitted = listed but not yet linkable (e.g. ASIN pending)
  note?: string;
};

/** Subject shelves — a findability layer over the collections (see SHELVES-PLAN.md). */
export type ShelfId = "patrum" | "scripture" | "reformation";

export type Work = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  collectionId: string;
  /** Short name for the cross-site shelf strip (see public/shelves.js). */
  label?: string;
  /** Shelves this work appears on; [] = the "Also from Wroot Press" row. */
  shelves: ShelfId[];
  series?: string; // sub-group heading within the collection
  seriesOrder?: number;
  status: "live" | "forthcoming";
  cover?: string; // /covers/<file>.jpg
  summary: string; // short, for the card
  description?: string[]; // full, for the detail page (one string per paragraph)
  editions: Edition[];
  detail?: boolean; // generate /books/[slug]
  external?: string; // card link when no detail page
};

export type Collection = {
  id: string;
  name: string;
  order: number;
  blurb?: string;
  blurbHref?: string;
  blurbLinkText?: string;
};

export const LANG_NAMES: Record<Lang, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  la: "Latin",
  sw: "Swahili",
  hu: "Magyar",
  ko: "한국어",
};

export const FORMAT_NAMES: Record<Format, string> = {
  paperback: "Paperback",
  hardcover: "Hardcover",
  kindle: "Kindle",
  pdf: "PDF",
  epub: "EPUB",
  reader: "Read online",
};

// Short badge codes shown on cards.
export const LANG_BADGE: Record<Lang, string> = {
  en: "EN",
  es: "ES",
  fr: "FR",
  la: "LA",
  sw: "SW",
  hu: "HU",
  ko: "KO",
};

export const collections: Collection[] = [
  {
    id: "wesley",
    name: "The Wesley Library",
    order: 1,
    blurb:
      "Primary-source and reading editions of John Wesley — his memoirs, his sermons, and his Notes upon the New Testament — adapted and edited for readers today.",
  },
  {
    id: "hom",
    name: "History of Methodism",
    order: 2,
    blurb:
      "The narrative history that started it all — drawn from the History of Methodism podcast, with primary-source citations throughout.",
    blurbHref: "https://historyofmethodism.com",
    blurbLinkText: "Listen to the podcast",
  },
  {
    id: "french",
    name: "French Catholic Letters",
    order: 3,
    blurb:
      "Charles Péguy and his Cahiers de la Quinzaine — the great early-twentieth-century French Catholic prose, in fresh editions and translations.",
  },
  {
    id: "patristic",
    name: "Patristic & Devotional",
    order: 4,
    blurb:
      "Critical and devotional editions of the Fathers and the saints — Latin alongside English, edited for reading.",
  },
  {
    id: "tradition",
    name: "Doctrine & Tradition",
    order: 5,
    blurb:
      "Critical and reading editions of the Church's historic doctrinal texts — the defenders of the Nicene faith and the formularies of the Reformation — edited and translated for readers today.",
  },
  {
    id: "spirituality",
    name: "Spirituality & Devotion",
    order: 6,
    blurb:
      "Devotional and formational writing for the practising Christian life — where the habits of the body and the soul meet.",
  },
  {
    id: "scripture",
    name: "Scripture & Its Readers",
    order: 7,
    blurb:
      "Reading editions and lenses for the Bible itself — a fresh translation, the Greek and Hebrew traditions that stand behind it, and the ways it has been read.",
  },
  {
    id: "also",
    name: "Also from Wroot Press",
    order: 8,
  },
];

export type Shelf = {
  id: ShelfId;
  slug: string; // path segment on wrootpress.com
  name: string;
  tagline: string;
  href: string; // hub: a path here, or the shelf's own domain
};

// Names for scripture/reformation are working titles (decided 2026-10-26).
export const shelves: Shelf[] = [
  {
    id: "patrum",
    slug: "fontes-patrum",
    name: "Fontes Patrum",
    tagline: "The Fathers and the medieval masters, in Latin, Greek and English.",
    href: "https://fontespatrum.org",
  },
  {
    id: "scripture",
    slug: "scripture",
    name: "Scripture & Its Readers",
    tagline: "The Bible, its ancient witnesses, and the ways it has been read.",
    href: "/scripture",
  },
  {
    id: "reformation",
    slug: "reformation",
    name: "Reformation & Methodism",
    tagline: "The Protestant and Wesleyan tradition, from Arminius to the Wesleys.",
    href: "/reformation",
  },
];

export const works: Work[] = [
  // ---------- The Wesley Library ----------
  {
    slug: "wesleys-metaphysics",
    title: "Wesley's Metaphysics",
    subtitle: "A Summa for Subscribers",
    author: "Wilson Pruitt",
    collectionId: "wesley",
    shelves: ["reformation"],
    status: "live",
    cover: "/covers/wesleys-metaphysics-en.jpg",
    summary:
      "John Wesley never wrote a system of divinity, and said he never would. Yet across half a century of occasional sermons a single, consistent metaphysic runs from end to end. This book reconstructs the plan of the system he had all along.",
    description: [
      "John Wesley never wrote a system of divinity, and said he never would. Yet across half a century of occasional sermons a single, consistent metaphysic runs from end to end. This book argues that what looks like the absence of system in Wesley's thought is the presence of a *genre* — the serial discourse written for a lay reading public, not the architectonic treatise — and reconstructs the whole generative structure that genre concealed: a single doctrine of God unfolding, chapter by chapter, into creation, providence, the invisible world, the human creature, and the last things.",
      "Wesley did the work of a systematic theologian in the tools of a magazine editor. He furnished a whole cosmos — the vehicle of the soul, the empiricism of the invisible, the conscious intermediate state, a providence that reaches to the particular — and never once collected it. This is the gathering: not a new way to read Wesley, but the plan of the system he had all along, laid out at last under its classical heads.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$10",
        asin: "B0H9NWF749",
        isbn: "9798188218102",
        url: "https://www.amazon.com/dp/B0H9NWF749",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$5",
        asin: "B0H9NYV61Z",
        url: "https://www.amazon.com/dp/B0H9NYV61Z",
      },
    ],
  },
  // A Life in His Own Words
  {
    slug: "wesley-in-georgia",
    title: "Wesley in Georgia",
    subtitle: "A Memoir of His Mission, 1735–1738",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["reformation"],
    series: "A Life in His Own Words",
    seriesOrder: 1,
    status: "live",
    cover: "/covers/wesley-in-georgia-en.jpg",
    summary:
      "Book 1 of the memoir series. Wesley's published journal of his failed Georgia mission, reshaped into continuous memoir. French edition forthcoming.",
    description: [
      "In October 1735 a young Oxford clergyman sailed for the new colony of Georgia to convert the Indians and to save his own soul. Two years and four months later he slipped out of Savannah by night, a warrant at his back and his ministry in ruins, asking the question that would remake his life: who shall convert me?",
      "John Wesley published the journal of those years in 1740, in the dated-diary form his first readers recognized. This volume reshapes it into the continuous memoir a reader today will actually read — Wesley's own voice throughout, the date stamps dissolved and the long Atlantic crossing, the doomed courtship of Sophy Hopkey, and the slow collapse of his Savannah parish given the shape they had in his memory. Where his published text grew reticent — above all about Sophy — the adaptation draws on the fuller manuscript journal he kept in his own hand.",
      "Wesley's failure in Georgia is where Methodism begins. Includes an editorial introduction, a cast of characters, a glossary of Wesley's theological vocabulary, a frontispiece map of the 1737 colony, and an appendix gathering the Williamson–Causton court record from the other side of the conflict.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$10",
        asin: "B0H3GX2K1P",
        isbn: "9798199284776",
        url: "https://www.amazon.com/dp/B0H3GX2K1P",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$5",
        asin: "B0H3FY75ZG",
        url: "https://www.amazon.com/dp/B0H3FY75ZG",
      },
      {
        lang: "es",
        format: "paperback",
        price: "$10",
        asin: "B0H3H7GM5V",
        isbn: "9798199300742",
        url: "https://www.amazon.com/dp/B0H3H7GM5V",
        note: "Wesley en Georgia: Memorias de su misión, 1735–1738",
      },
      {
        lang: "es",
        format: "kindle",
        price: "$5",
        asin: "B0H3G4KK74",
        url: "https://www.amazon.com/dp/B0H3G4KK74",
        note: "Wesley en Georgia: Memorias de su misión, 1735–1738",
      },
    ],
  },
  {
    slug: "aldersgate",
    title: "Aldersgate",
    subtitle: "A Memoir of the Year His Heart Was Warmed, 1738–1739",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["reformation"],
    series: "A Life in His Own Words",
    seriesOrder: 2,
    status: "live",
    cover: "/covers/aldersgate-en.jpg",
    summary:
      "Book 2 of the memoir series. The year between Georgia and the revival — Böhler, the warmed heart, Herrnhut, the closing church doors. Paperback and Kindle, English and Spanish.",
    description: [
      "In February 1738 John Wesley came home from Georgia a failed missionary, asking who would convert him. Fourteen months later he was the most talked-of preacher in England. This is the story of the year between — the months in which a defeated clergyman met a young Moravian named Peter Böhler, argued his way to the brink of a faith he could not yet feel, and, on the evening of the twenty-fourth of May, in a society room in Aldersgate Street, felt his heart strangely warmed.",
      "Aldersgate is the hinge of Methodist memory and the most mythologized moment in Wesley's life. This volume returns it to its setting, following the whole arc the one famous sentence stands for: the long argument with Böhler over whether faith can be given in a moment; the warmed heart and the doubt that came the very next morning; the pilgrimage to the Moravian town of Herrnhut; and the doors of the London churches closing against him one by one.",
      "Includes an editorial introduction on the making and the myth of Aldersgate, a cast of characters, a glossary, and an appendix gathering the view from outside — how the year looked to the Moravians, the Hutton household, and the friends Wesley's new certainty unsettled.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$10",
        asin: "B0H4D2RS6D",
        url: "https://www.amazon.com/dp/B0H4D2RS6D",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$5",
        asin: "B0H4C2ZDD4",
        url: "https://www.amazon.com/dp/B0H4C2ZDD4",
      },
      {
        lang: "es",
        format: "paperback",
        price: "$10",
        asin: "B0H4KW4VDP",
        url: "https://www.amazon.com/dp/B0H4KW4VDP",
        note: "Aldersgate: Memoria del año en que su corazón fue reconfortado",
      },
      {
        lang: "es",
        format: "kindle",
        price: "$5",
        asin: "B0H4S2WXSG",
        url: "https://www.amazon.com/dp/B0H4S2WXSG",
        note: "Aldersgate: Memoria del año en que su corazón fue reconfortado",
      },
    ],
  },

  // The Explanatory Notes upon the New Testament
  {
    slug: "st-matthew",
    title: "St. Matthew",
    subtitle:
      "The King James Text with the Explanatory Notes of John Wesley",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["scripture", "reformation"],
    series: "The Explanatory Notes upon the New Testament",
    seriesOrder: 1,
    status: "live",
    cover: "/covers/st-matthew-en.jpg",
    summary:
      "Volume I. The full King James text of Matthew with Wesley's note printed beneath each verse, and a critical apparatus tracing his sources. Mark, Luke, and John also available.",
    description: [
      "For two and a half centuries John Wesley's Explanatory Notes upon the New Testament have been read with a Bible held in the other hand. This edition gathers the two into one: the King James text of St. Matthew is printed in full, and beneath each verse stands Wesley's note upon it, so that Scripture and commentary are read together.",
      "What sets this edition apart is its apparatus. Wesley built his Notes by quietly abridging the best learning of his age — Bengel above all, with Doddridge, Lightfoot, Poole, and others. Here each chapter closes with a critical apparatus that traces, note by note, where his comments came from — and, as tellingly, where they are his own.",
      "With a series and volume introduction, the full apparatus, and indexes of sources, of Scripture cited, and of subjects.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$20",
        asin: "B0H3ZRBC7Z",
        isbn: "9798199892667",
        url: "https://www.amazon.com/dp/B0H3ZRBC7Z",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$9.99",
        asin: "B0H5674R43",
        url: "https://www.amazon.com/dp/B0H5674R43",
      },
    ],
  },

  {
    slug: "st-mark",
    title: "St. Mark",
    subtitle:
      "The King James Text with the Explanatory Notes of John Wesley",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["scripture", "reformation"],
    series: "The Explanatory Notes upon the New Testament",
    seriesOrder: 2,
    status: "live",
    cover: "/covers/st-mark-en.jpg",
    summary:
      "Volume II. The shortest Gospel, and the one where Wesley leans on almost nothing but Bengel — the apparatus shows him 'barely translating the Gnomon,' just as he said he would.",
    description: [
      "The full King James text of Mark with Wesley's note printed beneath each verse, and a critical apparatus tracing his sources at the close of every chapter.",
      "If Matthew shows Wesley leaning on Bengel, Mark shows him leaning on almost nothing else: the terse observation, the eye for a single word, the psychological aside are again and again Bengel rendered into a clause of English. The apparatus marks where the warmth of Doddridge and the rabbinic depth of Lightfoot enter, and where the note is Wesley's own.",
      "With the series and volume introductions, the full apparatus, and indexes of sources, of Scripture cited, and of subjects.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$15",
        asin: "B0H4KJ4K89",
        url: "https://www.amazon.com/dp/B0H4KJ4K89",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$9.99",
        asin: "B0H519DRFN",
        url: "https://www.amazon.com/dp/B0H519DRFN",
      },
    ],
  },
  {
    slug: "st-luke",
    title: "St. Luke",
    subtitle:
      "The King James Text with the Explanatory Notes of John Wesley",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["scripture", "reformation"],
    series: "The Explanatory Notes upon the New Testament",
    seriesOrder: 3,
    status: "live",
    cover: "/covers/st-luke-en.jpg",
    summary:
      "Volume III. The Gospel of the great parables — where the pastoral warmth long felt to be Wesley's own proves, in the apparatus, to be Doddridge's.",
    description: [
      "The full King James text of Luke with Wesley's note printed beneath each verse, and a critical apparatus tracing his sources at the close of every chapter.",
      "Luke is the Gospel of the great parables, and its surprise is that the warm, pastoral notes on the Good Samaritan and the Prodigal — long felt to be Wesley's own pulpit voice — prove to be Doddridge's 'Improvement' sections near-verbatim. The apparatus also marks his anti-Rome polemic and his Arminian re-slants, including the inward reading of 'the kingdom of God is within you.'",
      "With the series and volume introductions, the full apparatus, and indexes of sources, of Scripture cited, and of subjects.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$20",
        asin: "B0H4KXT7GJ",
        url: "https://www.amazon.com/dp/B0H4KXT7GJ",
      },
    ],
  },
  {
    slug: "st-john",
    title: "St. John",
    subtitle:
      "The King James Text with the Explanatory Notes of John Wesley",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["scripture", "reformation"],
    series: "The Explanatory Notes upon the New Testament",
    seriesOrder: 4,
    status: "live",
    cover: "/covers/st-john-en.jpg",
    summary:
      "Volume IV. The most Bengel-dependent of the four — where the famous Logos gloss and the great anti-heresy readings are Bengel's, and Wesley's own hand shows in his grace-and-freedom re-slants.",
    description: [
      "The full King James text of John with Wesley's note printed beneath each verse, and a critical apparatus tracing his sources at the close of every chapter.",
      "John is overwhelmingly Bengel: the famous gloss on the Logos and the readings that 'confute Sabellius' and 'confute Arius' are his, not Wesley's. Where Wesley's own hand shows is on the Calvinist battleground texts — the grace that can still be fallen from, the branch genuinely 'in the vine' — and in his sharpening of Christ's Godhead against the Socinians. Doddridge supplies the warmth.",
      "With the series and volume introductions, the full apparatus, and indexes of sources, of Scripture cited, and of subjects.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$20",
        asin: "B0H4KTPXSX",
        url: "https://www.amazon.com/dp/B0H4KTPXSX",
      },
    ],
  },
  {
    slug: "acts-of-the-apostles",
    title: "The Acts of the Apostles",
    subtitle:
      "The King James Text with the Explanatory Notes of John Wesley",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["scripture", "reformation"],
    series: "The Explanatory Notes upon the New Testament",
    seriesOrder: 5,
    status: "live",
    cover: "/covers/acts-en.png",
    summary:
      "Volume V. The narrative bridge from the Gospels to the Epistles — the birth of the Church and the journeys of Paul, with Wesley's note beneath each verse and the apparatus tracing his sources.",
    description: [
      "The full King James text of the Acts of the Apostles with Wesley's note printed beneath each verse, and a critical apparatus tracing his sources at the close of every chapter.",
      "Acts is the hinge of the New Testament — the account of how the gospel of the four evangelists became the Church of the epistles. Wesley reads it as a practical man, alert to the movements of Paul, the shape of the early preaching, and the working of the Spirit in a community still discovering what it was.",
      "With the series and volume introductions, the full apparatus, and indexes of sources, of Scripture cited, and of subjects.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$20",
        asin: "B0H6KM3K2W",
        url: "https://www.amazon.com/dp/B0H6KM3K2W",
      },
    ],
  },
  {
    slug: "romans-first-corinthians",
    title: "Romans & First Corinthians",
    subtitle:
      "The King James Text with the Explanatory Notes of John Wesley",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["scripture", "reformation"],
    series: "The Explanatory Notes upon the New Testament",
    seriesOrder: 6,
    status: "live",
    cover: "/covers/romans-first-corinthians-en.png",
    summary:
      "Volume VI. The first of the Epistles — the doctrinal core where Wesley's own hand shows most plainly, with his note beneath each verse and the apparatus tracing his sources.",
    description: [
      "The full King James text of Romans and First Corinthians with Wesley's note printed beneath each verse, and a critical apparatus tracing his sources at the close of every chapter.",
      "With the Epistles the Notes change temper. Romans is the doctrinal battleground of the whole New Testament, and it is here that Wesley's own hand shows most plainly — his readings of grace and election, and the freedom he was determined to defend against the Calvinist construction of the text. First Corinthians turns from doctrine to a divided congregation and the order of its common life. The apparatus marks where he still leans on Bengel and Doddridge, and where the note is his own argument.",
      "With the series and volume introductions, the full apparatus, and indexes of sources, of Scripture cited, and of subjects.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$15",
        asin: "B0H7DLB987",
        url: "https://www.amazon.com/dp/B0H7DLB987",
      },
    ],
  },

  // Wesley for Today (sermons)
  {
    slug: "wesley-for-today",
    title: "Wesley for Today",
    subtitle: "Sermons on the Way of Salvation",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["reformation"],
    series: "Wesley for Today",
    seriesOrder: 1,
    status: "live",
    cover: "/covers/wesley-for-today-en.jpg",
    summary:
      "Fourteen of Wesley's sermons on the way of salvation, adapted into direct contemporary English for readers today. Spanish edition available; French forthcoming.",
    description: [
      "Fourteen of John Wesley's sermons on the way of salvation — the doctrines at the heart of the Methodist message — adapted into direct, contemporary English for readers who have the vocabulary of faith but no prior acquaintance with Wesley's eighteenth-century prose.",
      "These are not paraphrases that sand down the edge. Wesley's diagnostic force is kept — his indictment of nominal Christianity, his images and cadences, his closing appeals — while the long syllogistic stretches are compressed to their point. The result reads as Wesley would have preached to a congregation that needed him to come quickly to the matter.",
      "A Spanish edition, Wesley para hoy: Sermones sobre el camino de la salvación, is also available. A companion volume on the Sermon on the Mount is forthcoming.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$15",
        asin: "B0H3ZGWBNW",
        isbn: "9798199318600",
        url: "https://www.amazon.com/dp/B0H3ZGWBNW",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$5",
        asin: "B0GX3353H9",
        url: "https://www.amazon.com/dp/B0GX3353H9",
      },
      {
        lang: "es",
        format: "paperback",
        price: "$15",
        asin: "B0H3HFNJSK",
        isbn: "9798199330671",
        url: "https://www.amazon.com/dp/B0H3HFNJSK",
        note: "Wesley para hoy: Sermones sobre el camino de la salvación",
      },
      {
        lang: "es",
        format: "kindle",
        price: "$5",
        asin: "B0H3SQKLZ1",
        url: "https://www.amazon.com/dp/B0H3SQKLZ1",
        note: "Wesley para hoy: Sermones sobre el camino de la salvación",
      },
    ],
  },
  {
    slug: "sermon-on-the-mount",
    title: "The Sermon on the Mount",
    subtitle: "Thirteen Discourses",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["reformation"],
    series: "Wesley for Today",
    seriesOrder: 2,
    status: "forthcoming",
    cover: "/covers/sermon-on-the-mount-en.jpg",
    summary:
      "Wesley's thirteen discourses on Matthew 5–7, adapted in the same contemporary voice. In preparation in English, Spanish, and French.",
    detail: false,
    editions: [],
  },

  // Wesley Dissertations
  {
    slug: "wesley-dissertations",
    title: "Wesley Dissertations",
    subtitle: "A Four-Volume Scholarly Edition",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["reformation"],
    series: "Wesley Dissertations",
    seriesOrder: 1,
    status: "live",
    summary:
      "A four-volume scholarly edition of John Wesley's dissertations, with apparatus and editorial notes.",
    detail: false,
    external: "https://www.amazon.com/dp/B0GSP6VTPP",
    editions: [
      {
        lang: "en",
        format: "paperback",
        url: "https://www.amazon.com/dp/B0GSP6VTPP",
      },
    ],
  },

  // A Christian Library
  {
    slug: "christian-library",
    title: "A Christian Library",
    subtitle: "In Fifty Volumes",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["reformation"],
    label: "A Christian Library",
    series: "A Christian Library",
    status: "live",
    cover: "/covers/christian-library-en.jpg",
    summary:
      "Wesley's own 1749–55 devotional anthology, restored to its original fifty-volume shape — the Apostolic Fathers, Arndt, Foxe, and on. Published one volume at a time; also a free digital reading edition.",
    description: [
      "Between 1749 and 1755, John Wesley compiled and published A Christian Library: fifty small volumes of extracts from the devotional and practical writings he judged most useful for the formation of Methodist preachers and societies. It was not a scholar's anthology — Wesley pruned, abridged, and occasionally rewrote his sources for a reader with little time and less money, meant to be carried on a circuit and read in pieces.",
      "This edition restores that original shape. Later reprints compressed Wesley's fifty volumes into thirty or fewer; this one follows Wesley's own volume divisions instead, verified one at a time against the 1755 printing. The text is lightly modernized, each work carries an editor's headnote, and — where Wesley traced a connection himself — cross-references to his sermons, Notes, journal, and hymns are marked.",
      "Volumes are published one at a time, in order, as each is finished. A free digital reading edition tracks the same progress at achristianlibrary.org.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        url: "https://www.amazon.com/dp/B0H27276VZ",
        note: "Series page — volumes published one at a time as each is finished",
      },
      {
        lang: "en",
        format: "reader",
        url: "https://achristianlibrary.org",
      },
    ],
  },

  // ---------- History of Methodism ----------
  {
    slug: "history-of-methodism-print",
    title: "History of Methodism",
    subtitle: "A Narrative History, drawn from the podcast",
    author: "Wilson Pruitt",
    collectionId: "hom",
    shelves: ["reformation"],
    status: "live",
    summary:
      "A four-volume narrative history with primary-source citations. Volumes 1–2 live on Amazon in English and Spanish; French, German, Portuguese, and Finnish in preparation.",
    detail: false,
    external: "https://www.amazon.com/s?i=stripbooks&rh=p_27%3AWilson+Pruitt",
    editions: [
      {
        lang: "en",
        format: "paperback",
        url: "https://www.amazon.com/s?i=stripbooks&rh=p_27%3AWilson+Pruitt",
      },
    ],
  },
  {
    slug: "history-of-methodism-translated",
    title: "Translated Editions",
    subtitle: "Free downloads — Swahili, Hungarian, Korean",
    author: "Wilson Pruitt",
    collectionId: "hom",
    shelves: ["reformation"],
    status: "live",
    summary:
      "Free PDF and EPUB editions in three languages Amazon KDP does not yet support for paperback — the same typeset interior as the print editions.",
    detail: false,
    external: "/history-of-methodism",
    editions: [
      { lang: "sw", format: "pdf", url: "/history-of-methodism" },
      { lang: "hu", format: "pdf", url: "/history-of-methodism" },
      { lang: "ko", format: "pdf", url: "/history-of-methodism" },
    ],
  },

  // ---------- French Catholic Letters ----------
  {
    slug: "peguy-veronique",
    title: "Véronique",
    subtitle: "Dialogue of History and the Carnal Soul",
    author: "Charles Péguy",
    collectionId: "french",
    shelves: [],
    status: "live",
    summary:
      "Péguy's dialogue between History and the carnal soul — on memory, the past, and the flesh that carries it. The first English translation, by Wilson Pruitt. Paperback and Kindle.",
    description: [
      "Véronique is one of Charles Péguy's great dialogues of history — a meditation, carried between History and the carnal soul, on what it means for the past to be remembered, and on the difference between the history that is written down and the living memory carried in flesh and spirit.",
      "This is the first English translation, by Wilson Pruitt, with the translator's preface and Marcel Péguy's 1972 notice. Péguy's prose advances by return and insistence — the repetitions that are not padding but the argument itself — and the translation is made to keep that rhythm in English.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$15",
        asin: "B0FNWG9C53",
        url: "https://www.amazon.com/dp/B0FNWG9C53",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$5",
        asin: "B0FNRY4SKB",
        url: "https://www.amazon.com/dp/B0FNRY4SKB",
      },
    ],
  },
  {
    slug: "peguy-victor-marie",
    title: "Victor-Marie, comte Hugo",
    author: "Charles Péguy",
    collectionId: "french",
    shelves: [],
    status: "live",
    summary:
      "Péguy's long 1910 essay on Hugo, Corneille, and the inheritance of greatness in French letters. The first English translation, by Wilson Pruitt. Paperback and Kindle.",
    description: [
      "Victor-Marie, comte Hugo (1910) is one of Péguy's central prose works — a sprawling, personal essay that begins with Victor Hugo and opens onto Corneille and Racine, and onto Péguy's own quarrel with his generation over what greatness in French letters is and how it is handed down.",
      "This is the first English translation, by Wilson Pruitt, with Péguy's preface. Like all his mature prose it moves by return and insistence rather than by outline; the translation keeps that movement.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$12",
        asin: "B0DK1WJQYB",
        url: "https://www.amazon.com/dp/B0DK1WJQYB",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$5",
        asin: "B0FNSX65CP",
        url: "https://www.amazon.com/dp/B0FNSX65CP",
      },
    ],
  },
  {
    slug: "peguy-cahiers",
    title: "Charles Péguy — Les Cahiers",
    subtitle: "The Cahiers de la Quinzaine shelf",
    author: "Charles Péguy",
    collectionId: "french",
    shelves: [],
    status: "forthcoming",
    summary:
      "A shelf of print editions and translations from Péguy and his Cahiers de la Quinzaine — some two dozen titles in preparation.",
    detail: false,
  editions: [],
  },

  // ---------- Patristic & Devotional ----------
  {
    slug: "ambrose-psalm-118",
    title: "Ambrose of Milan",
    subtitle: "Exposition of Psalm 118",
    author: "Ambrose of Milan",
    collectionId: "patristic",
    shelves: ["patrum"],
    label: "Ambrose",
    status: "live",
    cover: "/covers/ambrose-psalm-118-en.jpg",
    summary:
      "A facing-page Latin–English edition of Ambrose's longest commentary, following Zelzer's CSEL 62 — in print and as a free digital reading edition.",
    description: [
      "Ambrose of Milan's Expositio in Psalmum CXVIII is his longest single work — a sermon-by-sermon meditation on the great alphabetic psalm, structured by the twenty-two letters of the Hebrew alphabet. This edition presents the Latin and a fresh English translation on facing pages, following the critical text of CSEL 62.",
      "The print edition is a 513-page, 6×9 paperback. A free digital reading edition, with the same text and apparatus, is hosted online.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$30",
        asin: "B0H1CV5Z4B",
        url: "https://www.amazon.com/dp/B0H1CV5Z4B",
      },
      {
        lang: "en",
        format: "reader",
        url: "https://ambrose.wrootpress.com",
      },
    ],
  },
  {
    slug: "agatha-of-catania",
    title: "Saint Agatha of Catania",
    subtitle:
      "The Acts, the Greek Recensions, the Oration of Methodius, the Translation, and the Miracles",
    author: "Wroot Press",
    collectionId: "patristic",
    shelves: ["patrum"],
    series: "The Acta Library",
    status: "live",
    cover: "/covers/agatha-of-catania-en.jpg",
    summary:
      "Her name is spoken in the Canon of the Mass — six distinct testimonies to the martyr of Catania, drawn from the Bollandist Acta Sanctorum and gathered under her feast day. The first title in The Acta Library, in English and Spanish.",
    description: [
      "Her name is spoken in the Canon of the Mass, where it has stood for some fifteen centuries. She died at Catania in the persecution under Decius, about the year 251 — a girl who refused a consul and was broken for it.",
      "This volume gathers what the Church preserved of her: the early Acts of her passion, an anonymous Greek recension, the polished retelling of Simeon Metaphrastes, the long oration of Methodius of Constantinople, the history of her body's return from Constantinople, two collections of her miracles, and the hymns sung on her feast. Each is a distinct work by a distinct hand, some separated by centuries.",
      "Translated from the Bollandists' Acta Sanctorum under the fifth of February. The scholars' commentary on the sources is left to the reference edition at actasanctorum.org; what remains here is the testimony itself.",
      "The first title in The Acta Library, Wroot Press's print companion to the Acta Sanctorum translation — the daily-devotional apparatus stripped away, the primary sources bound as a single reading.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$10",
        asin: "B0H9LVSLQJ",
        url: "https://www.amazon.com/dp/B0H9LVSLQJ",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$5",
        asin: "B0H9LWP8YD",
        url: "https://www.amazon.com/dp/B0H9LWP8YD",
      },
      {
        lang: "es",
        format: "paperback",
        price: "$10",
        asin: "B0H9NTJTSD",
        url: "https://www.amazon.com/dp/B0H9NTJTSD",
        note: "Santa Águeda de Catania: Las Actas, los Himnos, la Oración y los Milagros de las Acta Sanctorum",
      },
      {
        lang: "es",
        format: "kindle",
        price: "$5",
        asin: "B0H9NQXL2C",
        url: "https://www.amazon.com/dp/B0H9NQXL2C",
        note: "Santa Águeda de Catania: Las Actas, los Himnos, la Oración y los Milagros de las Acta Sanctorum",
      },
    ],
  },
  {
    slug: "acta-devotional",
    title: "Acta Sanctorum",
    subtitle: "A Daily Devotional — Three Hundred Fifteen Lives of the Saints",
    author: "Wilson Pruitt",
    collectionId: "patristic",
    shelves: ["patrum"],
    status: "live",
    cover: "/covers/acta-devotional-en.jpg",
    summary:
      "A year of the saints, a day at a time — 315 lives from January 1 to November 10, drawn from the Bollandist Acta Sanctorum and rendered into plain English. A companion in print to the digital reading edition.",
    description: [
      "A year of the saints, a day at a time. Drawn from the great Bollandist Acta Sanctorum, this devotional gathers three hundred and fifteen lives — from January 1 to November 10 — and gives each saint a single page: who they were, what they suffered, and what the Church remembered.",
      "The lives are rendered from the Bollandist Latin into plain, readable English, lightly modernised and shaped for daily reading rather than reference. It is a companion in print to the full digital reading edition at actasanctorum.org.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$15",
        asin: "B0H6KPXHVY",
        url: "https://www.amazon.com/dp/B0H6KPXHVY",
      },
    ],
  },

  // ---------- Doctrine & Tradition ----------
  // The Books of Homilies
  {
    slug: "homilies-first-book",
    title: "The Books of Homilies",
    subtitle: "Volume I: The First Book (1547)",
    author: "Thomas Cranmer",
    collectionId: "tradition",
    shelves: ["reformation"],
    series: "The Books of Homilies",
    seriesOrder: 1,
    status: "live",
    cover: "/covers/homilies-first-book-en.jpg",
    summary:
      "Volume I. The first clean modern critical edition of the First Book (1547) — the twelve homilies of Cranmer's circle, modernized with a full apparatus and a general introduction.",
    description: [
      "For nearly three centuries the Books of Homilies were the appointed preaching of the Church of England — read aloud, Sunday by Sunday, in the many parishes that had no preacher of their own. The First Book, set forth in 1547 by Thomas Cranmer and his circle, was a missionary book: a quarter of it given to the single disputed doctrine of justification by faith, addressed to a people not yet persuaded. It is the Reformation's argument, preached.",
      "This is the first clean modern critical edition of the First Book. The twelve homilies are given in modernized spelling and punctuation, with their Tudor syntax kept intact — obsolete words retained and glossed rather than silently replaced. Beneath the text a full scholarly apparatus traces every source the homilists drew on — scriptural, patristic, and Continental — each one verified against a primary text rather than a secondary report. The long silence of earlier editions about the homilies' debts to Luther and the Reformed divines of the Continent is, here, broken.",
      "The volume opens with a general introduction to the homilies and their place in the English Reformation, gives a headnote to each sermon, and closes with a complete index.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$15",
        asin: "B0H7N78Y6Z",
        isbn: "9798184731988",
        url: "https://www.amazon.com/dp/B0H7N78Y6Z",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$8",
        asin: "B0H35XNQSF",
        url: "https://www.amazon.com/dp/B0H35XNQSF",
      },
    ],
  },
  {
    slug: "homilies-second-book",
    title: "The Books of Homilies",
    subtitle: "Volume II: The Second Book (1563 & 1571)",
    author: "John Jewel",
    collectionId: "tradition",
    shelves: ["reformation"],
    series: "The Books of Homilies",
    seriesOrder: 2,
    status: "live",
    cover: "/covers/homilies-second-book-en.jpg",
    summary:
      "Volume II. The first clean modern critical edition of the Second Book — Jewel's twenty-one homilies, ending with Against Wilful Rebellion, modernized with a full apparatus.",
    description: [
      "For nearly three centuries the Books of Homilies were the appointed preaching of the Church of England — read aloud, Sunday by Sunday, in the many parishes that had no preacher of their own. The Second Book, set forth under Elizabeth I in 1563 and largely the work of John Jewel, is the work of a Church that had, for the moment, won: its twenty-one homilies teach a settled people how to worship, pray, give, marry, and obey. If the First Book is the Reformation's argument, the Second is its settlement.",
      "This is the first clean modern critical edition of the Second Book. The homilies are given in modernized spelling and punctuation, with their Tudor syntax kept intact — obsolete words retained and glossed rather than silently replaced. Beneath the text a full scholarly apparatus traces every source — scriptural, patristic, and Continental, including the homilies' substantial debts to Bullinger and Gualther of Zurich — each one verified against a primary text. The volume ends, as the Elizabethan Church ended it, with the homily added in 1571 against disobedience and wilful rebellion, printed in full and set in its occasion.",
      "The volume opens with an introduction to the Second Book and the original 1563 Admonition to ministers, gives a headnote to each sermon, and closes with a complete index.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$25",
        asin: "B0H7N99D5W",
        isbn: "9798184754567",
        url: "https://www.amazon.com/dp/B0H7N99D5W",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$8",
        asin: "B0H7N7ZY5S",
        url: "https://www.amazon.com/dp/B0H7N7ZY5S",
      },
    ],
  },

  // John Henry Newman
  {
    slug: "newman-dissertations",
    title: "Critical and Theological Dissertations",
    subtitle: "On St. Athanasius and the Nicene Creed",
    author: "John Henry Newman",
    collectionId: "tradition",
    shelves: ["patrum"],
    status: "live",
    cover: "/covers/newman-dissertations-en.jpg",
    summary:
      "The first English translation of John Henry Newman's Latin dissertations of 1847 — close studies in the language and theology of St. Athanasius and the Nicene faith.",
    description: [
      "In 1847, recently received into the Roman Catholic Church and studying in Rome, John Henry Newman set down in Latin a series of short critical and theological dissertations on St. Athanasius — the great fourth-century defender of the Nicene faith, whose works Newman had spent years translating and annotating.",
      "Newman's Dissertatiunculae have never before been translated into English. This edition presents them for the first time, in a translation that follows his Latin closely while rendering his argument readable for students of the Nicene controversy today.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$10",
        asin: "B0H6RP165N",
        isbn: "9798184507972",
        url: "https://www.amazon.com/dp/B0H6RP165N",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$5",
        asin: "B0H6RH24YC",
        url: "https://www.amazon.com/dp/B0H6RH24YC",
      },
    ],
  },

  // ---------- Spirituality & Devotion ----------
  {
    slug: "bjj-and-jesus",
    title: "BJJ and Jesus",
    subtitle: "Sixty Days on the Mat",
    author: "Wilson Pruitt",
    collectionId: "spirituality",
    shelves: [],
    status: "live",
    cover: "/covers/bjj-and-jesus-en.png",
    summary:
      "Sixty devotionals that read the positions of Brazilian jiu-jitsu against the life of faith — a pastor and practitioner on control, surrender, and the bodily discipline of following Christ.",
    description: [
      "How does Jesus relate to Brazilian jiu-jitsu? On the surface, nothing: Jesus was no fighter, and no one comes to the mats because of their faith. But the Christian is called to take everything captive to Christ — to plunder the Egyptians, as Origen said — and jiu-jitsu, it turns out, has a great deal to teach about the body, the will, and the surrender at the heart of the gospel.",
      "Written by a pastor who trains, these sixty short devotionals pair a structural position of jiu-jitsu with an aspect of the life of faith. Christianity is a bodily religion — our bodies are saved, not just our souls — and both the mat and the following of Christ reward the same thing: not conceptual knowledge but practice, the daily drilling and live rolling where control is learned and, in the end, relinquished.",
      "Sixty days, one position at a time. The first title on Wroot Press's Spirituality & Devotion shelf.",
    ],
    detail: true,
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$10",
        asin: "B0H4P955BF",
        url: "https://www.amazon.com/dp/B0H4P955BF",
      },
      {
        lang: "en",
        format: "kindle",
        price: "$7",
        asin: "B0H4NSS3WD",
        url: "https://www.amazon.com/dp/B0H4NSS3WD",
      },
    ],
  },

  // ---------- Digital Reading Editions ----------
  {
    slug: "kjv-wesley",
    title: "The Bible with Wesley's Notes",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["scripture", "reformation"],
    label: "Wesley's Notes",
    status: "live",
    summary:
      "The King James Bible alongside John Wesley's Explanatory Notes Upon the Old and New Testament, side by side — free to read, cover to cover.",
    detail: false,
    external: "https://notes.historyofmethodism.com",
    editions: [
      { lang: "en", format: "reader", url: "https://notes.historyofmethodism.com" },
    ],
  },
  {
    slug: "acta-sanctorum",
    title: "Acta Sanctorum",
    author: "Wroot Press",
    collectionId: "patristic",
    shelves: ["patrum"],
    label: "Acta Sanctorum",
    status: "live",
    cover: "/covers/acta-sanctorum-plate.jpg",
    summary:
      "The flagship — a digital reading edition of the Bollandist Acta Sanctorum: Latin text, English translation, and apparatus, organised by feast day.",
    detail: false,
    external: "https://actasanctorum.org",
    editions: [{ lang: "la", format: "reader", url: "https://actasanctorum.org" }],
  },
  {
    slug: "bonaventure",
    title: "Bonaventure, Opera Omnia",
    author: "Bonaventure",
    collectionId: "patristic",
    shelves: ["patrum"],
    label: "Bonaventure",
    status: "live",
    cover: "/covers/bonaventure-plate.jpg",
    summary:
      "An English translation of the Opera Omnia of St. Bonaventure from the Quaracchi critical edition, Latin alongside English, with scholia and apparatus criticus — volume by volume, beginning with the Commentary on the Sentences.",
    detail: false,
    external: "https://bonaventure.wrootpress.com",
    editions: [
      { lang: "la", format: "reader", url: "https://bonaventure.wrootpress.com" },
    ],
  },
  {
    slug: "milton-doctrina",
    title: "Milton, De Doctrina Christiana",
    author: "John Milton",
    collectionId: "tradition",
    shelves: ["reformation"],
    label: "Milton",
    status: "live",
    summary:
      "Parallel Latin–English reading edition of Milton's theological treatise, from Sumner's 1825 editio princeps, with every scriptural citation indexed. In progress, chapter by chapter.",
    detail: false,
    external: "https://milton.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://milton.wrootpress.com" }],
  },
  {
    slug: "andrewes-preces-privatae",
    title: "Lancelot Andrewes, Preces Privatae",
    author: "Lancelot Andrewes",
    collectionId: "tradition",
    shelves: ["reformation"],
    label: "Andrewes",
    status: "live",
    cover: "/covers/andrewes-preces-en.jpg",
    summary:
      "The private prayers of Lancelot Andrewes in Greek, Latin, and Hebrew, from the 1853 Parker text, with the Wroot Press English on facing lines — the whole apparatus, a scripture index, and a synopsis setting the Creed and confession against the Harley recension that rewrites them. The print Loeb edition is available in paperback.",
    description: [
      "Lancelot Andrewes kept a book of prayers in his own hand — in Greek, in Latin and in Hebrew — and did not publish it. It is among the most private documents the English Church has produced, and it has never been generally available in the languages he wrote it in. No edition now in print, and none in the public domain, presents the Greek and the Latin at all.",
      "This edition sets out one witness whole — the text printed at Oxford in 1853, reprinting the Sheldonian edition of 1675 — and puts a new English translation on the facing page, one English line to one line of the original, at the same indentation, so a reader can run a finger down the page and stay in step. Where the printed page is wrong it is left wrong and the note says so; where Hebrew stands in the text it is kept, and translated. An apparatus at the foot of each opening records what other witnesses read.",
      "The prayers are not, for the most part, original composition, and Andrewes does not pretend they are. What he kept was closer to a commonplace book of prayer: Scripture, the Greek and Latin liturgies, the creeds, the Fathers, and — without apology or any change of voice — Cicero and Seneca. The work is in what he took, what he left, and what he set beside what, and it is everywhere.",
      "Lancelot Andrewes (1555–1626) was Bishop of Chichester, of Ely and of Winchester, and one of the translators of the Authorised Version.",
    ],
    detail: true,
    external: "https://andrewes.wrootpress.com",
    editions: [
      { lang: "en", format: "reader", url: "https://andrewes.wrootpress.com" },
      {
        lang: "en",
        format: "paperback",
        price: "$25",
        asin: "B0HGMWGD6S",
        isbn: "9798170009954",
        url: "https://www.amazon.com/dp/B0HGMWGD6S",
      },
    ],
  },
  {
    slug: "migne",
    title: "Migne",
    subtitle: "The Patrologia in English",
    author: "Wroot Press",
    collectionId: "patristic",
    shelves: ["patrum"],
    label: "Migne",
    status: "live",
    cover: "/covers/migne-plate.jpg",
    summary:
      "Migne's Patrologia Latina and Graeca, rendered into English and made citable by volume and column — every work a page from day one, Latin and Greek alongside, translation lighting up the map one first-ever English rendering at a time.",
    detail: false,
    external: "https://migne.app",
    editions: [{ lang: "en", format: "reader", url: "https://migne.app" }],
  },
  {
    slug: "sententiae",
    title: "Sententiae",
    subtitle: "Peter Lombard's Sentences as a daf",
    author: "Peter Lombard",
    collectionId: "patristic",
    shelves: ["patrum"],
    label: "Sententiae",
    status: "live",
    cover: "/covers/sententiae-plate.jpg",
    summary:
      "Peter Lombard's Sentences laid out like a Talmud page — the distinctio in the center, the commentary tradition (c. 1225–1615) around it, every witness dated, sourced, and threaded to the ones it cites, contests, transmits, or parallels.",
    detail: false,
    external: "https://sententiae.wrootpress.com",
    editions: [
      { lang: "la", format: "reader", url: "https://sententiae.wrootpress.com" },
    ],
  },
  {
    slug: "notabene",
    title: "The Kierkegaard–Notabene Edition",
    author: "Søren Kierkegaard",
    collectionId: "also",
    shelves: [],
    status: "live",
    summary:
      "Bilingual critical edition of the eight phantom volumes of Nicolaus Notabene — Danish and English on facing pages, with a biographical companion.",
    detail: false,
    external: "https://notabene.wrootpress.com",
    editions: [
      { lang: "en", format: "reader", url: "https://notabene.wrootpress.com" },
    ],
  },
  {
    slug: "topographia-sacra",
    title: "Topographia Sacra",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Topographia Sacra",
    status: "live",
    summary:
      "Geographical editions of the place-heavy books of scripture — the World English Bible with maps and a gazetteer of every named place.",
    detail: false,
    external: "https://topographia.wrootpress.com",
    editions: [
      { lang: "en", format: "reader", url: "https://topographia.wrootpress.com" },
    ],
  },
  {
    slug: "loci",
    title: "Loci",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Loci",
    status: "live",
    summary:
      "Thematic reading editions of biblical books, each organised around an interpretive frame — Leviticus as an architecture of approach, Lamentations as an alphabet of grief.",
    detail: false,
    external: "https://loci.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://loci.wrootpress.com" }],
  },
  {
    slug: "catena",
    title: "Catena",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Catena",
    status: "live",
    summary:
      "Intertextual reading editions tracing how scripture quotes scripture — every quotation, allusion, and echo a book reaches back to, marked, sourced, and weighed. Seeded with Hebrews.",
    detail: false,
    external: "https://catena.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://catena.wrootpress.com" }],
  },
  {
    slug: "annales-sacra",
    title: "Annales Sacra",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Annales Sacra",
    status: "live",
    summary:
      "Chronological reading editions that lay scripture's years flat — two kingdoms on one timeline, the reigns and synchronisms Kings tells in a braid, the life of Paul, a gospel harmony.",
    detail: false,
    external: "https://annales.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://annales.wrootpress.com" }],
  },
  {
    slug: "voces",
    title: "Voces",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Voces",
    status: "live",
    summary:
      "Reading editions that color every line by who is speaking — the debate buried in Job, the divine voice inside the Psalms, the unlabeled dialogue of the Song of Songs, the choirs of Revelation. Seeded with five books.",
    detail: false,
    external: "https://voces.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://voces.wrootpress.com" }],
  },
  {
    slug: "doctrine",
    title: "Doctrine",
    author: "Wroot Press",
    collectionId: "tradition",
    shelves: ["reformation"],
    label: "Doctrine",
    status: "live",
    summary:
      "Annotated reading editions of the historic creeds and confessions, with line-level commentary. Seeded with the Apostles' Creed.",
    detail: false,
    external: "https://doctrine.wrootpress.com",
    editions: [
      { lang: "en", format: "reader", url: "https://doctrine.wrootpress.com" },
    ],
  },
  {
    slug: "difficult-passages",
    title: "Difficult Passages",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Difficult Passages",
    status: "live",
    summary:
      "A pastoral reference mapping the scholarly landscape on hard places in scripture — each entry gives the difficulty, then several historical responses.",
    detail: false,
    external: "https://difficult.wrootpress.com",
    editions: [
      { lang: "en", format: "reader", url: "https://difficult.wrootpress.com" },
    ],
  },
  // The companion to a book that is not out yet, and the card says so. The
  // COMPANION is live — chronology, atlas, succession, texts — which is why the
  // status is "live"; the summary carries the book's own stage rather than
  // letting a "Forthcoming" badge imply the reading edition is unbuilt.
  // ! The book names this address in print, in its introduction and again at
  //   the head of its appendix. The host is now a promise on paper.
  {
    slug: "church-in-palestine",
    title: "The Church in Palestine",
    subtitle: "Nineteen Centuries on the Gaza Road",
    author: "Wilson Pruitt",
    collectionId: "tradition",
    shelves: [],
    status: "live",
    cover: "/covers/church-in-palestine-en.jpg",
    summary:
      "The history of the Christians of Palestine, told once, from end to end: what the sources say, what they cannot be made to say, and where the record simply stops. A companion site holds the chronology, atlas and succession lists.",
    description: [
      "In about the year 33 a court official of the Ethiopian queen was reading Isaiah in a carriage on the road that runs down from Jerusalem to Gaza, and a man named Philip climbed up beside him. There have been Christians on that road ever since. They were there when Rome renamed the province, when the desert filled with monks, when the Persians came and the Arabs after them, when the crusaders took Jerusalem and lost it, when the Ottoman assessors counted a quarter of Gaza Christian, and when the shells fell on the church of St Porphyrius in 2023.",
      "This is their history, told once, from end to end. It is a narrative and not an argument: what the sources say, what they cannot be made to say, and where the record simply stops. But the absence of such an account has had a cost, and the book names it — without a history, the Christians of this country can be dismissed as Christians of political convenience. Nineteen centuries on one road say otherwise.",
      "Wilson Pruitt is a pastor in Austin, Texas.",
    ],
    detail: true,
    external: "https://palestine.wrootpress.com",
    editions: [
      {
        lang: "en",
        format: "paperback",
        price: "$25",
        asin: "B0HFKCHNMC",
        isbn: "9798193168676",
        url: "https://www.amazon.com/dp/B0HFKCHNMC",
      },
      { lang: "en", format: "reader", url: "https://palestine.wrootpress.com", note: "Companion site: chronology, atlas, succession" },
    ],
  },
  {
    slug: "church-in-palestine-companion",
    title: "The Church in Palestine",
    subtitle: "A companion",
    author: "Wroot Press",
    collectionId: "tradition",
    shelves: [],
    status: "live",
    summary:
      "Nineteen centuries of the Christian community in Palestine, laid out to be looked up — a chronology of the whole span, an atlas of every place the book names, the succession of the see of Jerusalem, and the primary texts in full. Companion to the book, which is forthcoming.",
    detail: false,
    external: "https://palestine.wrootpress.com",
    editions: [
      { lang: "en", format: "reader", url: "https://palestine.wrootpress.com" },
    ],
  },
  {
    slug: "wyclif",
    title: "Wyclif's Latin Works",
    author: "John Wyclif",
    collectionId: "patristic",
    shelves: ["patrum"],
    label: "Wyclif",
    status: "live",
    cover: "/covers/wyclif-plate.jpg",
    summary:
      "The Latin works of John Wyclif, as the Wyclif Society printed them (1883–1922), with a new English translation, work by work.",
    detail: false,
    external: "https://wyclif.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://wyclif.wrootpress.com" }],
  },
  {
    slug: "fitzralph-summa",
    title: "FitzRalph, Summa in quaestionibus Armenorum",
    author: "Richard FitzRalph",
    collectionId: "patristic",
    shelves: ["patrum"],
    label: "FitzRalph",
    status: "live",
    cover: "/covers/fitzralph-summa-plate.jpg",
    summary:
      "Richard FitzRalph's Summa on the questions of the Armenians (Paris, 1512): the Latin, read by machine from the print, and a new English translation.",
    detail: false,
    external: "https://fitzralph.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://fitzralph.wrootpress.com" }],
  },
  {
    slug: "douay-glossa",
    title: "The Douay-Rheims with the Glossa Ordinaria",
    author: "Wroot Press",
    collectionId: "patristic",
    shelves: ["patrum", "scripture"],
    label: "Glossa",
    status: "live",
    cover: "/covers/douay-glossa-plate.jpg",
    summary:
      "The Douay-Rheims Bible (Challoner revision) alongside the Glossa ordinaria, the standard medieval marginal commentary on Scripture, in a fresh English translation.",
    detail: false,
    external: "https://glossa.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://glossa.wrootpress.com" }],
  },
  {
    slug: "neoplatonism",
    title: "Neoplatonism.org",
    author: "Wroot Press",
    collectionId: "patristic",
    shelves: ["patrum"],
    label: "Neoplatonism",
    status: "live",
    cover: "/covers/neoplatonism-plate.jpg",
    summary:
      "A digital library of Neoplatonism: Plotinus, Porphyry, Iamblichus, Proclus, Damascius, Dionysius and their Latin, Arabic and Renaissance heirs, from public-domain editions, freshly translated, with the commentators in the margins.",
    detail: false,
    external: "https://neoplatonism.org",
    editions: [{ lang: "en", format: "reader", url: "https://neoplatonism.org" }],
  },
  {
    slug: "wpb",
    title: "The Wroot Press Bible",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Wroot Press Bible",
    status: "live",
    summary:
      "A fresh English Bible translation under written rules, published a chapter at a time.",
    detail: false,
    external: "https://bible.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://bible.wrootpress.com" }],
  },
  {
    slug: "bereshit",
    title: "Bereshit / In Principio",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Bereshit",
    status: "live",
    summary:
      "Genesis 1:1–5, read as ten cruxes across three benches — the Latin, the rabbinic, and the Greek-Jewish traditions — with every witness dated, sourced, and threaded to the ones it cites, echoes, contests, or answers.",
    detail: false,
    external: "https://bereshit.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://bereshit.wrootpress.com" }],
  },
  {
    slug: "talmai",
    title: "Talmai",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Talmai",
    status: "live",
    summary:
      "Which traditions preserved only in the Greek Bible survived in rabbinic memory? The Greek Additions to Esther, searched against the rabbinic and medieval Jewish bench, every parallel dated, sourced and ruled.",
    detail: false,
    external: "https://talmai.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://talmai.wrootpress.com" }],
  },
  {
    slug: "ntnames",
    title: "Named in Acts and the Letters",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Named in Acts",
    status: "live",
    summary:
      "An interactive prosopography of the New Testament, Acts through Jude: every named person, every verse, colored by attestation and linked across books.",
    detail: false,
    external: "https://ntnames.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://ntnames.wrootpress.com" }],
  },
  {
    slug: "verbum",
    title: "Verbum",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Verbum",
    status: "live",
    summary:
      "Scripture read by sound. A reader's lens that sets the Hebrew beside the English and keys the words that play against each other — surfacing the puns, name-plays, and sound-echoes the translation flattens.",
    detail: false,
    external: "https://verbum.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://verbum.wrootpress.com" }],
  },
  {
    slug: "lectern",
    title: "Lectern",
    author: "Wroot Press",
    collectionId: "scripture",
    shelves: ["scripture"],
    label: "Lectern",
    status: "live",
    summary:
      "A preacher's workbench over the church year: the day's readings anchored, with Wesley sermon companions, hymn recommendations, and calls to worship arranged around them.",
    detail: false,
    external: "https://lectern.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://lectern.wrootpress.com" }],
  },
  {
    slug: "arminius",
    title: "Arminius — The Public Disputations",
    author: "Jacob Arminius",
    collectionId: "tradition",
    shelves: ["reformation"],
    label: "Arminius",
    status: "live",
    summary:
      "A free edition of Jacob Arminius's Leiden public disputations: the Latin (or, where the Latin is lost, the Dutch) beside a first English translation. Working draft.",
    detail: false,
    external: "https://arminius.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://arminius.wrootpress.com" }],
  },
  {
    slug: "these-three-marks",
    title: "These Three Marks",
    author: "Wroot Press",
    collectionId: "tradition",
    shelves: ["reformation"],
    label: "These Three Marks",
    status: "live",
    summary:
      "A study document on ordination, commissioning, licensing, and episcopacy in The United Methodist Church.",
    detail: false,
    external: "https://ordination.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://ordination.wrootpress.com" }],
  },
  {
    slug: "hymnquiz",
    title: "Which Hymn Are You?",
    author: "Wroot Press",
    collectionId: "tradition",
    shelves: ["reformation"],
    label: "Hymn Quiz",
    status: "live",
    summary:
      "Answer 22 questions about how you pray, worship and hope, and find the hymn in The United Methodist Hymnal that sings most like you.",
    detail: false,
    external: "https://hymnquiz.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://hymnquiz.wrootpress.com" }],
  },
  {
    slug: "wesley-journal-chart",
    title: "The Journal of John Wesley",
    author: "John Wesley",
    collectionId: "wesley",
    shelves: ["reformation"],
    label: "Wesley's Journal",
    status: "live",
    summary:
      "Travel John Wesley's journal on an inked chart — the voyage to Georgia, Savannah and Frederica, the flight home, Peter Böhler, Aldersgate, Herrnhut, and the New Year love-feast.",
    detail: false,
    external: "https://journal.historyofmethodism.com",
    editions: [{ lang: "en", format: "reader", url: "https://journal.historyofmethodism.com" }],
  },
  {
    slug: "hom-podcast",
    title: "The History of Methodism Podcast",
    author: "Wilson Pruitt",
    collectionId: "hom",
    shelves: ["reformation"],
    label: "History of Methodism",
    status: "live",
    summary:
      "The History of Methodism Podcast covers the history of the Methodist and Wesleyan movements, from its precursors in the European Reformation to the present day.",
    detail: false,
    external: "https://historyofmethodism.com",
    editions: [{ lang: "en", format: "reader", url: "https://historyofmethodism.com" }],
  },
  {
    slug: "nobel",
    title: "Laureates for the Pulpit",
    author: "Wroot Press",
    collectionId: "also",
    shelves: [],
    status: "live",
    summary:
      "Recent Nobel Prizes explained in plain terms for pastors: what was found, how to say it accurately, and where it meets preaching in the Wesleyan tradition.",
    detail: false,
    external: "https://nobel.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://nobel.wrootpress.com" }],
  },
  {
    slug: "jeong-theology",
    title: "Jeong Kyeong-ok, An Introduction to Christian Theology (1939)",
    author: "Jeong Kyeong-ok",
    collectionId: "also",
    shelves: [],
    status: "live",
    summary:
      "The first English translation of Jeong Kyeong-ok's 基督敎神學槪論 (1939), the first Korean systematic theology. A preview from the Wroot Press edition in progress.",
    detail: false,
    external: "https://jeong.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://jeong.wrootpress.com" }],
  },
];

// ---------- landing-page features ----------
// The three best-selling print titles, shown first on the home page.
export const BESTSELLER_SLUGS = [
  "ambrose-psalm-118",
  "homilies-first-book",
  "homilies-second-book",
];
// Three works shown on each shelf's homepage band.
export const SHELF_FEATURED: Record<ShelfId, string[]> = {
  patrum: ["migne", "acta-sanctorum", "sententiae"],
  scripture: ["wpb", "catena", "bereshit"],
  reformation: ["kjv-wesley", "christian-library", "arminius"],
};

// ---------- helpers ----------

export function collectionsInOrder(): Collection[] {
  return [...collections].sort((a, b) => a.order - b.order);
}

export function worksForCollection(collectionId: string): Work[] {
  return works.filter((w) => w.collectionId === collectionId);
}

/** Works grouped by `series` within a collection, series preserving first-seen order. */
export function seriesGroups(
  collectionId: string,
): { series: string | null; works: Work[] }[] {
  const inCol = worksForCollection(collectionId);
  const order: string[] = [];
  const bySeries = new Map<string, Work[]>();
  for (const w of inCol) {
    const key = w.series ?? "__none__";
    if (!bySeries.has(key)) {
      bySeries.set(key, []);
      order.push(key);
    }
    bySeries.get(key)!.push(w);
  }
  return order.map((key) => ({
    series: key === "__none__" ? null : key,
    works: bySeries
      .get(key)!
      .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0)),
  }));
}

/** Works on a given shelf, in catalog order. */
export function worksForShelf(shelf: ShelfId): Work[] {
  return works.filter((w) => w.shelves.includes(shelf));
}

/** Shelf for a URL segment on wrootpress.com, e.g. "scripture". */
export function getShelf(segment: string): Shelf | undefined {
  return shelves.find((sh) => sh.slug === segment);
}

/** Works on no shelf — the "Also from Wroot Press" row. */
export function unshelvedWorks(): Work[] {
  return works.filter((w) => w.shelves.length === 0);
}

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

export function detailWorks(): Work[] {
  return works.filter((w) => w.detail);
}

export function workHref(w: Work): string {
  if (w.detail) return `/books/${w.slug}`;
  return w.external ?? w.editions[0]?.url ?? "#";
}

/** Distinct languages across a work's editions, in canonical display order. */
const LANG_ORDER: Lang[] = ["en", "es", "fr", "la", "sw", "hu", "ko"];
export function workLangs(w: Work): Lang[] {
  const set = new Set(w.editions.map((e) => e.lang));
  return LANG_ORDER.filter((l) => set.has(l));
}

export function editionsByLang(w: Work): { lang: Lang; editions: Edition[] }[] {
  return workLangs(w).map((lang) => ({
    lang,
    editions: w.editions.filter((e) => e.lang === lang),
  }));
}

// ---------- cross-site shelf strip feed ----------
// Served at /shelves.json and read by public/shelves.js, which every edition
// site loads. A site is any shelved work with a `label` and a reader edition.

export type StripSite = { label: string; url: string };
export type StripFeed = {
  shelves: { id: ShelfId; name: string; href: string; sites: StripSite[] }[];
  /** hostname → the shelf whose strip that site shows (the work's first shelf). */
  primary: Record<string, ShelfId>;
};

export function stripFeed(): StripFeed {
  const primary: Record<string, ShelfId> = {};
  const siteOf = (w: Work): StripSite | null => {
    const url = w.editions.find((e) => e.format === "reader" && e.url)?.url;
    return w.label && url ? { label: w.label, url } : null;
  };
  const feed = shelves.map((shelf) => {
    const sites: StripSite[] = [];
    for (const w of worksForShelf(shelf.id)) {
      const site = siteOf(w);
      if (!site) continue;
      sites.push(site);
      const host = new URL(site.url).hostname;
      if (!(host in primary)) primary[host] = w.shelves[0];
    }
    return { id: shelf.id, name: shelf.name, href: shelf.href, sites };
  });
  return { shelves: feed, primary };
}
