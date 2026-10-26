/* Wroot Press shelf strip.
   A thin bar for the top of every edition site: Wroot Press › <shelf> · siblings.
   Include with:  <script defer src="https://wrootpress.com/shelves.js"></script>
   It reads /shelves.json (same origin as this script), finds the shelf whose
   site list contains the current hostname, and does nothing if there is none.
   Rendered in a shadow root so no site's CSS can touch it or be touched by it.
   Source of truth: ~/wrootpress.com/content/catalog.ts (SHELVES-PLAN.md, phase 4). */
(function () {
  try {
    if (window.top !== window.self) return; // never inside an iframe
    var script = document.currentScript;
    if (!script || !script.src) return;
    if (document.getElementById("wroot-shelf-strip")) return;
    var feedUrl = script.getAttribute("data-feed") || new URL("/shelves.json", script.src).href;

    fetch(feedUrl)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (feed) {
        if (!feed) return;
        var host = location.hostname.replace(/^www\./, "");
        var shelfId = feed.primary[host] || feed.primary[location.hostname];
        if (!shelfId) return;
        var shelf = feed.shelves.filter(function (s) { return s.id === shelfId; })[0];
        if (!shelf) return;
        var origin = new URL(feedUrl).origin;
        mount(shelf, host, origin);
      })
      .catch(function () {});
  } catch (e) {}

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text) n.textContent = text;
    return n;
  }

  function mount(shelf, host, origin) {
    var bar = el("div", { id: "wroot-shelf-strip" });
    var root = bar.attachShadow({ mode: "open" });
    var style = el("style");
    style.textContent =
      ":host{display:block}" +
      "@media print{:host{display:none}}" +
      "nav{display:flex;align-items:center;gap:14px;box-sizing:border-box;min-height:34px;padding:0 16px;" +
      "background:#2c3e4a;color:#f7f3ec;font:500 13px/1 system-ui,-apple-system,'Segoe UI',sans-serif;letter-spacing:.01em}" +
      "a{color:inherit;text-decoration:none;white-space:nowrap}" +
      "a:hover,a:focus-visible{color:#c9a86a}" +
      ".lead{display:flex;align-items:center;gap:8px;flex:none;font-weight:600}" +
      ".lead .sep{opacity:.5;font-weight:400}" +
      ".sites{display:flex;align-items:center;gap:16px;overflow-x:auto;scrollbar-width:none;min-width:0;padding:10px 0 10px 14px;border-left:1px solid rgba(247,243,236,.25);" +
      "-webkit-mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent);mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent)}" +
      ".sites::-webkit-scrollbar{display:none}" +
      ".here{white-space:nowrap;color:#c9a86a;border-bottom:1px solid #c9a86a;padding-bottom:1px}" +
      ".dot{opacity:.4;flex:none}";

    var nav = el("nav", { "aria-label": "Wroot Press shelf" });
    var lead = el("span", { class: "lead" });
    lead.appendChild(el("a", { href: "https://wrootpress.com" }, "Wroot Press"));
    lead.appendChild(el("span", { class: "sep", "aria-hidden": "true" }, "›"));
    var shelfHref = /^https?:/.test(shelf.href) ? shelf.href : origin + shelf.href;
    lead.appendChild(el("a", { href: shelfHref }, shelf.name));
    nav.appendChild(lead);

    var sites = el("span", { class: "sites" });
    shelf.sites.forEach(function (s, i) {
      var h = new URL(s.url).hostname.replace(/^www\./, "");
      if (i) sites.appendChild(el("span", { class: "dot", "aria-hidden": "true" }, "·"));
      sites.appendChild(
        h === host
          ? el("span", { class: "here", "aria-current": "page" }, s.label)
          : el("a", { href: s.url }, s.label)
      );
    });
    nav.appendChild(sites);

    root.appendChild(style);
    root.appendChild(nav);

    function insert() { document.body.insertBefore(bar, document.body.firstChild); }
    if (document.body) insert();
    else document.addEventListener("DOMContentLoaded", insert);
  }
})();
