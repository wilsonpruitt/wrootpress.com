# wrootpress.com

Landing site for Wroot Press, the publishing imprint of Wroot Labs. Catalog of print titles (KDP) and digital reading editions (Ambrose, Bonaventure).

## Stack

- Next.js 16, App Router, TypeScript
- `next/font/google` for EB Garamond + Inter
- Design tokens forked from `~/wroot-labs/brand/design-system/colors_and_type.css` (in `app/globals.css`)
- Deployed on Vercel under `wilson-pruitts-projects` team

## Develop

```bash
pnpm install
pnpm dev
```

## Deploy

```bash
npx vercel deploy --prod
```

## Editions

Currently linked at their existing `actasanctorum.org` subdomains:
- Ambrose: <https://ambrose.actasanctorum.org>
- Bonaventure: <https://bonaventure.actasanctorum.org>

Pending migration to `ambrose.wrootpress.com` and `bonaventure.wrootpress.com`. `actasanctorum.org` itself stays as its own (classics-domain) site.
