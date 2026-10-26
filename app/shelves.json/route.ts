import { stripFeed } from "@/content/catalog";

// Feed for the cross-site shelf strip (public/shelves.js). Built from the
// catalog at deploy time, so adding a work there updates every strip.
export const dynamic = "force-static";

export function GET() {
  return Response.json(stripFeed(), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
