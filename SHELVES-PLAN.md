# Shelves Plan — making Wroot Press web editions findable

Decided 2026-10-26 (Opus session with Wilson). This file is the score; execute it in a cheaper session.

## The problem

wrootpress.com groups works into 7 collections, one of which ("Digital Reading Editions") is a
*format* bucket. Meanwhile ~35 web editions live on six-plus domains. A reader who lands on one
edition from search has no way to see its siblings.

## The decision

Three subject shelves. **A shelf is a findability layer, not a hosting move**: every edition keeps
its one home (see memory `reference_one-translation-one-home`); no existing site migrates.

| Shelf | Name | Hub |
|---|---|---|
| 1 | **Fontes Patrum** — *the Fathers and the medieval masters, in Latin, Greek and English* | **`fontespatrum.org`** (own domain, registered 2026-10-26; `.com` deferred — buy later as a redirect) |
| 2 | *Scripture & Its Readers* (working title) | `wrootpress.com/scripture` (path TBD with final name) |
| 3 | *Reformation & Methodism* (working title) | `wrootpress.com/reformation` (path TBD with final name) |

"Fathers" is used in Wilson's expansive sense (Migne's *Patrologia* runs to 1216; Bonaventure,
Wyclif et al. belong). Fontes Patrum is the most active shelf and becomes the **home for new
patristic/medieval projects** (Kraken editions, PatroLLM, Disputator) as `*.fontespatrum.org`.
Existing sites (actasanctorum.org, migne.app, `*.wrootpress.com`) stay where they are.

## Inventory (all URLs checked 2026-10-26; 200 = live)

### 1 · Fontes Patrum
| Site | Status |
|---|---|
| actasanctorum.org | 200 |
| ambrose.wrootpress.com | 200 |
| migne.app (Patrologia) | 200 |
| bonaventure.wrootpress.com | 200 |
| sententiae.wrootpress.com | 200 |
| fitzralph.wrootpress.com | 200 |
| wyclif.wrootpress.com | 200 |
| glossa.wrootpress.com | 200 · **also shelf 2** |
| neoplatonism.org | 200 |
| Bibliotheca Arabica | no site yet |
| Disputator (`~/lllm`) | no site yet → `*.fontespatrum.org` |

### 2 · Scripture (working title)
| Site | Status |
|---|---|
| bible.wrootpress.com (WPB) | 200 |
| catena.wrootpress.com | 200 |
| bereshit.wrootpress.com | 200 |
| talmai.wrootpress.com | 200 |
| ntnames.wrootpress.com (+ Liber generationis) | 200 |
| voces.wrootpress.com | 200 |
| verbum.wrootpress.com | 200 |
| annales.wrootpress.com | 200 |
| topographia.wrootpress.com | 200 |
| difficult.wrootpress.com | 200 |
| lectern.wrootpress.com | 200 |
| glossa.wrootpress.com | **also shelf 1** |
| KJV + Wesley's Notes (historyofmethodism.com) | **also shelf 3** |
| brass.wrootpress.com | 200 · ⚠ Wilson to decide: public shelf or not |

### 3 · Protestant & Wesleyan (working title)
| Site | Status |
|---|---|
| historyofmethodism.com (+ corpus/journal/notes/wizard subdomains) | 200 |
| achristianlibrary.org | 200 |
| arminius.wrootpress.com | 200 |
| leiden.wrootpress.com | not live |
| andrewes.wrootpress.com | 200 |
| milton.wrootpress.com | 200 |
| doctrine.wrootpress.com | 200 |
| ordination.wrootpress.com | 200 |
| hymnquiz.wrootpress.com | 200 |
| Maurice, Books of Homilies | print/catalog entries |

### Also from Wroot Press (no shelf)
charlespeguy.org · palestine.wrootpress.com · nobel.wrootpress.com · jeong.wrootpress.com ·
notabene.wrootpress.com. (Jeong is Korean Methodist — could go on shelf 3; Wilson's call.)

## Phases

**0 · Wilson:** ✅ `fontespatrum.org` registered 2026-10-26 (`.com` deferred). Settle
shelf 2/3 names and the Brass / Jeong placements (working titles are fine to build against).

**1 · Catalog data (`content/catalog.ts`)** ✅ done 2026-10-26 (Sonnet; uncommitted — see notes below) — add `shelves: ("patrum" | "scripture" | "reformation")[]`
to `Work`, plus web-only entries for every live site above. Retire the `digital` collection; a
work with print + web gets ONE card (the Ambrose / Christian Library pattern). Boundary works
carry two shelves. Péguy/Palestine/Nobel/Jeong/Notabene get `shelves: []` → "Also from" row.

**2 · Shelf pages on wrootpress.com** ✅ built 2026-10-26 (see Phase 2 notes) — `/scripture` and `/reformation` generated from the field;
homepage becomes three shelf bands + "Also from". The Fontes Patrum band links out to the domain.

**3 · fontespatrum.org** ✅ built 2026-10-26 (see Phase 3 notes; NOT live until pushed + domain attached) — a small static hub (Wroot palette; EB Garamond + Inter) reading the
same shelf data, served from wrootpress.com as JSON so there is one source of truth. **Needs an OG
image before first deploy** (Wilson's rule; template `~/security-wrootlabs/og/`).

**4 · Return strip on every edition site** — 🟡 shared file built + tested 2026-10-26 (see Phase 4 notes); per-site rollout NOT started — one tiny script + JSON hosted at
`wrootpress.com/shelves.js` / `shelves.json`; each site adds one `<script>` tag. Renders a thin top
strip: *Wroot Press › [Shelf] · sibling · sibling · …*. Adding a site to the JSON updates every
strip. Roll out one shelf at a time, Fontes Patrum first.

## Rules for the executing session

- Every push to a git-connected Vercel repo is a **production deploy** → per-site OK from Wilson.
  Batch the ask: list the sites, the one-line change, and get one answer per batch.
- Don't move, rename or redirect any existing edition.
- Don't invent descriptions for catalog cards — pull them from each site's own `<meta description>`.
- Model: Sonnet for phases 1–4; this is pattern-following work.

## Phase 1 notes (2026-10-26)

- `Work.shelves` is required (type error if missing); `shelves`, `worksForShelf()`, `unshelvedWorks()` exported.
- `digital` collection retired; its works re-homed into `patristic` / `tradition` / `wesley` / new `scripture` and `also` collections so the current homepage still renders. Phase 2 replaces collection bands with shelf bands.
- 17 web entries added (summaries copied from each site's own meta description). **Deliberately not added:** Brass (Wilson's call), Wesley Corpus (Patreon-paywalled, not a free reading edition), leiden/dictionary/lincoln (not live), Maurice/Books of Homilies web (no site).
- Judgment calls to confirm: Newman *Dissertations* → Fontes Patrum (Athanasius/Nicene); Jeong → "Also from" (shelf-less); Hymn quiz + These Three Marks → Reformation shelf; Lectern → Scripture.
- `pnpm build` passes; homepage shows Scripture & Its Readers + Also from Wroot Press, no Digital Reading Editions.

## Phase 2 notes (2026-10-26)

- Routes: `/fontes-patrum`, `/scripture`, `/reformation` via `app/[shelf]/page.tsx` (`dynamicParams = false`). Each page: "Reading editions" then "In print", `WorkCard`s, links to the other shelves.
- Homepage: lede → Most read → three `ShelfBand`s (Fontes Patrum dark, 3 featured each from `SHELF_FEATURED`, "Browse the whole shelf (N)") → "Also from Wroot Press". The old Latin-library band and by-collection catalogue are gone (`collections` still exist in data; book detail pages still use them for breadcrumbs).
- New shared `SiteHeader` / `SiteFooter` (footer now links the History of Methodism Substack); dead CSS removed from `page.module.css`.
- **Shelf hrefs are internal for now.** Phase 3 swaps patrum's `href` to `https://fontespatrum.org` once the hub exists (and `/fontes-patrum` should then redirect there).
- Not done (still in repo `CLAUDE.md`): standing Substack line on Wesley/Methodism title pages; flip on Vercel Analytics in the dashboard (snippet already present).

## Phase 3 notes (2026-10-26)

- One codebase, host-routed (same pattern as palestine.wrootpress.com): `proxy.ts` rewrites `fontespatrum.org/` → `/fontespatrum-hub` (`app/fontespatrum-hub/page.tsx`), redirects every other path on that host to wrootpress.com (307 while new). Hub reads the same `shelves`/`worksForShelf("patrum")` data.
- OG image: `public/fontespatrum-og.png` (1200×630, Wroot palette; source `og-src/fontespatrum.html`, fonts gitignored — see the comment in that file). Hub head carries og:title/description/url/image(+width/height/alt), twitter:card=summary_large_image, canonical.
- **Go-live order matters — push BEFORE attaching the domain**, else fontespatrum.org would serve the whole wrootpress.com site:
  1. Push `main` (deploys the proxy + hub).
  2. Vercel project `wrootpress.com` → add domain `fontespatrum.org` (and `www.fontespatrum.org`).
  3. Cloudflare DNS for the zone: `A fontespatrum.org → 76.76.21.21` and `CNAME www → cname.vercel-dns.com`, both **DNS-only (grey cloud)**.
  4. Verify: `/` shows the hub; `/fontespatrum-og.png` → 200; tags in head.
  5. Then flip the patrum shelf `href` in `content/catalog.ts` to `https://fontespatrum.org` and make `/fontes-patrum` redirect to it.

## Status 2026-10-26 (end of day)

Phases 1–3 **shipped to production** (`83d3cd5`). fontespatrum.org live (Vercel domains + Cloudflare DNS done; `/fontes-patrum` 308s there; homepage links the real domain). **Open: Phase 4** (return strip on every edition site), shelf 2/3 final names, Brass/Jeong placement, buy `fontespatrum.com` when funds allow, make the 307s on that host permanent once it settles, optional www→apex redirect. Uncommitted note only: this status block.

## Phase 4 notes (2026-10-26)

**Built (in this repo, unpushed until the next push):**
- `public/shelves.js` — vanilla script, shadow-DOM strip (`Wroot Press › <shelf> | sibling · sibling…`, current site marked, static at the top of `<body>`, hidden in print and in iframes, silent no-op on any host not in the feed, scrolls sideways on narrow screens).
- `GET /shelves.json` (`app/shelves.json/route.ts`, CORS `*`, static) built from the catalog via `stripFeed()`; each work needs a `label` + a reader edition + a shelf. Add a work there → every strip updates on the next wrootpress.com deploy. 31 hosts today (9 patrum / 14 scripture / 10 reformation).
- Tested by serving the local files as `https://wrootpress.com/shelves.js|json` into the LIVE sites (no repo or deploy involved): migne.app, actasanctorum.org, bonaventure, neoplatonism.org, bible, arminius (390px) — all mounted, correct shelf, no CSP blocks.

**Per-site rollout (not started):** each site adds ONE line, `<script defer src="https://wrootpress.com/shelves.js"></script>`, in the `<head>` of its **build template** (not generated output). Prereq: wrootpress.com must be pushed first so the file exists. Each repo's push = a production deploy → Wilson's OK, batched; standing rule ≤1–2 deploys/project/day, and some sites have a deploy HELD (Bonaventure until *Ioannem* is done; Acta backlog) — piggyback on those deploys rather than adding new ones. Sites that already deploy via `vercel build` + `deploy --prebuilt` (Ambrose, Bonaventure) need their build template edited, then a prebuilt deploy.
