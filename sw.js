const C = "jm-trip-v1";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(C).then((c) => c.addAll(["./", "index.html", "icon-180.png", "manifest.json"])).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); if (r.ok && (e.request.url.startsWith(self.location.origin) || e.request.url.includes("fonts."))) caches.open(C).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then((m) => m || caches.match("index.html"))));
});
