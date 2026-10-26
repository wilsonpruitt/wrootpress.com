import { NextResponse, type NextRequest } from "next/server";

/* ============================================================
   Host routing for palestine.wrootpress.com

   The companion to *The Church in Palestine* is FOUR surfaces of one work
   — the chronology, the atlas, the succession and the texts — and Wilson's
   ruling (2026-08-16) is that they live at their own address rather than
   as four paths on the imprint's catalogue site.

   One codebase, two hosts. The paths do not change: /chronology is
   /chronology on either host, so nothing internal has to know which host it
   is being served from. What this file does is make each host serve only
   what belongs to it, and send the reader to the other one otherwise:

     palestine.wrootpress.com/          -> the companion index (a rewrite,
                                           so the reader keeps the bare host)
     palestine.wrootpress.com/atlas     -> served
     palestine.wrootpress.com/books     -> redirected to wrootpress.com/books
     wrootpress.com/chronology          -> redirected to palestine…/chronology

   ⚠ The redirects off the old paths are PERMANENT (308). Those URLs have been
   published and linked; the chronology has been live since 2026-08-10. Do not
   downgrade them to a rewrite later without deciding what happens to the links
   that already exist.
   ============================================================ */

const COMPANION_HOST = "palestine.wrootpress.com";

/* fontespatrum.org (registered 2026-10-26) is the front door of the patristic &
   medieval shelf. Its "/" is the hub at /fontespatrum-hub; everything else on
   that host belongs to wrootpress.com. Redirects are 307 while the domain is
   new — make them permanent once it has settled. */
const FONTES_HOSTS = ["fontespatrum.org", "www.fontespatrum.org"];
const MAIN_HOST = "https://wrootpress.com";

/** The paths that belong to the companion, wherever they are asked for. */
const COMPANION = ["/chronology", "/atlas", "/succession", "/texts"];

function isCompanionPath(pathname: string): boolean {
  return COMPANION.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get("host")?.toLowerCase() ?? "";

  if (FONTES_HOSTS.includes(host)) {
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/fontespatrum-hub", request.url));
    }
    // The hub's own path and its shelf-page twin are never shown on this host.
    if (pathname === "/fontespatrum-hub" || pathname === "/fontes-patrum") {
      return NextResponse.redirect(new URL("/", request.url), 307);
    }
    return NextResponse.redirect(`${MAIN_HOST}${pathname}${search}`, 307);
  }

  if (host === COMPANION_HOST) {
    // The index of the companion is a real route at /palestine; the reader
    // should never see that path.
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/palestine", request.url));
    }
    if (pathname === "/palestine") {
      return NextResponse.redirect(new URL("/", request.url), 308);
    }
    if (!isCompanionPath(pathname)) {
      return NextResponse.redirect(`${MAIN_HOST}${pathname}${search}`, 308);
    }
    return NextResponse.next();
  }

  // Every other host is the imprint's own site, including previews and
  // localhost — where both halves stay reachable so the whole thing can be
  // worked on without a hosts file.
  const isProduction = host === "wrootpress.com" || host === "www.wrootpress.com";
  if (isProduction && isCompanionPath(pathname)) {
    return NextResponse.redirect(
      `https://${COMPANION_HOST}${pathname}${search}`,
      308,
    );
  }
  if (isProduction && pathname === "/palestine") {
    return NextResponse.redirect(`https://${COMPANION_HOST}/`, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Everything except Next's own assets, the analytics beacon and files
    // with an extension, which are served as they are on both hosts.
    "/((?!_next/|_vercel/|favicon|.*\\..*).*)",
  ],
};
