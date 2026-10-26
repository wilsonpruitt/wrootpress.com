import type { NextConfig } from "next";

const config: NextConfig = {
  async redirects() {
    // The patrum shelf lives at its own domain now (phase 3 of SHELVES-PLAN.md).
    return [
      {
        source: "/fontes-patrum",
        destination: "https://fontespatrum.org",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Cohort curriculum readers are single-file static pages published into
      // public/curricula/<slug>.html by the cohort-curricula package. Serve them
      // at the clean URL /curricula/<slug>. The /curricula landing is a real
      // app route, so it never reaches this rule.
      { source: "/curricula/:slug", destination: "/curricula/:slug.html" },
    ];
  },
};

export default config;
