const C = "jm-trip-v4";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(C).then((c) => c.addAll(["./", "index.html", "config.js", "icon-180.png", "manifest.json"])).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  const u = e.request.url;
  if (e.request.method !== "GET" || !(u.startsWith(self.location.origin) || u.includes("fonts.g") || u.includes("gstatic.com/firebasejs") || u.includes("cdnjs.cloudflare.com") || u.includes("tile.openstreetmap.org"))) return;
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); if (r.ok) caches.open(C).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then((m) => m || caches.match("index.html"))));
});
