
const CACHE_NAME = "tokyo-family-trip-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./app-icon.png"
];

// 安裝時，儲存 App 的必要檔案
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// 啟用時，清除舊版本快取
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys
                    .filter(function(key) {
                        return key !== CACHE_NAME;
                    })
                    .map(function(key) {
                        return caches.delete(key);
                    })
            );
        })
    );
    self.clients.claim();
});

// 網路不可用時，使用已儲存的檔案
self.addEventListener("fetch", function(event) {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    // 只處理我們自己網站的檔案
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request, {
                ignoreSearch: true
            });
        })
    );
});
