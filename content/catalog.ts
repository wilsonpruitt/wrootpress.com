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

export type Work = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  collectionId: string;
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
    id: "digital",
    name: "Digital Reading Editions",
    order: 6,
    blurb:
      "Free, hosted reading editions of primary sources — Latin and original-language text with English translation and apparatus.",
  },
];

export const works: Work[] = [
  // ---------- The Wesley Library ----------
  // A Life in His Own Words
  {
    slug: "wesley-in-georgia",
    title: "Wesley in Georgia",
    subtitle: "A Memoir of His Mission, 1735–1738",
    author: "John Wesley",
    collectionId: "wesley",
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
    ],
  },
  {
    slug: "st-luke",
    title: "St. Luke",
    subtitle:
      "The King James Text with the Explanatory Notes of John Wesley",
    author: "John Wesley",
    collectionId: "wesley",
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

  // Wesley for Today (sermons)
  {
    slug: "wesley-for-today",
    title: "Wesley for Today",
    subtitle: "Sermons on the Way of Salvation",
    author: "John Wesley",
    collectionId: "wesley",
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
    subtitle: "A Five-Volume Scholarly Edition",
    author: "John Wesley",
    collectionId: "wesley",
    series: "Wesley Dissertations",
    seriesOrder: 1,
    status: "live",
    summary:
      "A five-volume scholarly edition of John Wesley's dissertations, with apparatus and editorial notes.",
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

  // ---------- History of Methodism ----------
  {
    slug: "history-of-methodism-print",
    title: "History of Methodism",
    subtitle: "A Narrative History, drawn from the podcast",
    author: "Wilson Pruitt",
    collectionId: "hom",
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
    slug: "peguy-cahiers",
    title: "Charles Péguy — Les Cahiers",
    subtitle: "The Cahiers de la Quinzaine shelf",
    author: "Charles Péguy",
    collectionId: "french",
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
    slug: "acta-devotional",
    title: "Acta Devotional",
    subtitle: "A Daily Devotional of the Saints",
    author: "Wroot Press",
    collectionId: "patristic",
    status: "forthcoming",
    summary:
      "A daily devotional spun off from the Acta Sanctorum project — one entry per day, one saint per page, drawn from the Bollandist Latin and lightly modernised.",
    detail: false,
    editions: [],
  },

  // ---------- Doctrine & Tradition ----------
  // The Books of Homilies
  {
    slug: "homilies-first-book",
    title: "The Books of Homilies",
    subtitle: "Volume I: The First Book (1547)",
    author: "Thomas Cranmer",
    collectionId: "tradition",
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
      { lang: "en", format: "paperback", price: "$15", isbn: "9798184731988" },
      { lang: "en", format: "kindle", price: "$8" },
    ],
  },
  {
    slug: "homilies-second-book",
    title: "The Books of Homilies",
    subtitle: "Volume II: The Second Book (1563 & 1571)",
    author: "John Jewel",
    collectionId: "tradition",
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
      { lang: "en", format: "paperback", price: "$25", isbn: "9798184754567" },
      { lang: "en", format: "kindle", price: "$8" },
    ],
  },

  // John Henry Newman
  {
    slug: "newman-dissertations",
    title: "Critical and Theological Dissertations",
    subtitle: "On St. Athanasius and the Nicene Creed",
    author: "John Henry Newman",
    collectionId: "tradition",
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

  // ---------- Digital Reading Editions ----------
  {
    slug: "acta-sanctorum",
    title: "Acta Sanctorum",
    author: "Wroot Press",
    collectionId: "digital",
    status: "live",
    summary:
      "The flagship — a digital reading edition of the Bollandist Acta Sanctorum: Latin text, English translation, and apparatus, organised by feast day.",
    detail: false,
    external: "https://actasanctorum.org",
    editions: [{ lang: "la", format: "reader", url: "https://actasanctorum.org" }],
  },
  {
    slug: "bonaventure-sentences",
    title: "Bonaventure, Sentences",
    author: "Bonaventure",
    collectionId: "digital",
    status: "live",
    summary:
      "Quaracchi-text reading edition of Bonaventure's Commentary on the Sentences, Latin alongside English, with scholion and apparatus criticus.",
    detail: false,
    external: "https://bonaventure.wrootpress.com",
    editions: [
      { lang: "la", format: "reader", url: "https://bonaventure.wrootpress.com" },
    ],
  },
  {
    slug: "notabene",
    title: "The Kierkegaard–Notabene Edition",
    author: "Søren Kierkegaard",
    collectionId: "digital",
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
    collectionId: "digital",
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
    collectionId: "digital",
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
    collectionId: "digital",
    status: "live",
    summary:
      "Intertextual reading editions tracing how scripture quotes scripture — every quotation, allusion, and echo a book reaches back to, marked, sourced, and weighed. Seeded with Hebrews.",
    detail: false,
    external: "https://catena.wrootpress.com",
    editions: [{ lang: "en", format: "reader", url: "https://catena.wrootpress.com" }],
  },
  {
    slug: "doctrine",
    title: "Doctrine",
    author: "Wroot Press",
    collectionId: "digital",
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
    collectionId: "digital",
    status: "live",
    summary:
      "A pastoral reference mapping the scholarly landscape on hard places in scripture — each entry gives the difficulty, then several historical responses.",
    detail: false,
    external: "https://difficult.wrootpress.com",
    editions: [
      { lang: "en", format: "reader", url: "https://difficult.wrootpress.com" },
    ],
  },
];

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
