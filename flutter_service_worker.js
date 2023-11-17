'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "009c9e65172e010890f7f65fde438006",
"favicon.ico": "10c565f640105ecd41c668cf9f9e1f85",
"index.html": "8531d2566a8e27f274bc9634dcb03218",
"/": "8531d2566a8e27f274bc9634dcb03218",
"main.dart.js": "7917b65d339b970c3d47386ce5f6be3c",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/favicon-16x16.png": "200d6896f994d6fa0475ac9d305bbf97",
"icons/android-chrome-192x192.png": "72402f3b5aac1d8f3306a868ded286b6",
"icons/android-chrome-512x512.png": "4c37890b553b817084348a0f12900d06",
"icons/favicon-32x32.png": "e25df25304ae5aacc311c1361c8cdde5",
"manifest.json": "d40c47d1c161f94dbcb13094d37f1f55",
"assets/AssetManifest.json": "e16728409355e0e6cd2c7b58e4fbbcf3",
"assets/NOTICES": "3506a0248440c4e6dca8f7f423d91ebc",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "bf9f9f16a7e44b0bd389619fc4f1bfda",
"assets/fonts/MaterialIcons-Regular.otf": "9c11dc542b3e56fac4635e384ebb0aeb",
"assets/assets/images/design.png": "d38d7469539409890cac4663fbd00451",
"assets/assets/images/Shape-1.png": "2ebcc105205722cf9f4aff725c886689",
"assets/assets/images/Ellipse%25202.png": "5d9aaf99de96b20b20e294ced51fe8fc",
"assets/assets/images/flutter.png": "46b7f8f8bc42d18ab6b10fe89b7ac49f",
"assets/assets/images/Shape-2.png": "d05faa76713b2c02ff4d014d1906e939",
"assets/assets/images/Bitmap-1.png": "d3ee08ab7ec8b6b07074955ce86e7867",
"assets/assets/images/lsb.png": "3a7ef35f830f0faf55a08b80e960274a",
"assets/assets/images/mar.png": "84effd19dc3cc94622c4f7d6f8b07d6a",
"assets/assets/images/Bitmap-2.png": "60f0b5cf49f8f4fd08c0e84fb529fb96",
"assets/assets/images/dev.png": "4ff522d9bd5d8ca00bafafed4f29614e",
"assets/assets/images/ko.png": "b4326a5ddebeda60a2457bf64856951b",
"assets/assets/images/prof.png": "6207a3bce769e5903e16ba693ebf00ed",
"assets/assets/images/logo.png": "0c54a353015d3317f97ee3ec0961e0cf",
"assets/assets/images/html.png": "c58cc2ffd639956097eb06ccca5393eb",
"assets/assets/images/df.png": "0d6f1180de03192f3767304950551b20",
"assets/assets/images/web.png": "34bc1bbd4717a378e00b9d72f6123432",
"assets/assets/images/Star.png": "c25e72070b4c24bd5bbd7322f69e42f8",
"assets/assets/images/gambar1.png": "25d7dbf5fb2072509b83dcf148502c11",
"assets/assets/images/Bitmap.png": "1ec7d45e3d63902f5bc9165c9bb440e0",
"assets/assets/images/image%25202.png": "14dbd62ddeec71f04f660efb1f114be8",
"assets/assets/images/poo.jpeg": "e6729001dfbafdeda2309a391c42a70f",
"assets/assets/skills/santan.jpeg": "9b7da767c0f090fdd6904f658d3c57fc",
"assets/assets/skills/savana.jpeg": "55b8c398ab76e71f8c6ce102eed4b68d",
"assets/assets/skills/git.png": "b3cc5ce579c1f5a3139ded55fb7d2726",
"assets/assets/skills/flutter.png": "46b7f8f8bc42d18ab6b10fe89b7ac49f",
"assets/assets/skills/github.png": "e9d3ba55beba1359717c2f78a1d87c9f",
"assets/assets/skills/tambak.png": "926ca465263f11e2e04d09fd034a2d74",
"assets/assets/skills/html.png": "c58cc2ffd639956097eb06ccca5393eb",
"assets/assets/skills/css.png": "a146616f14ce8b99b139138a281efbae",
"assets/assets/skills/bkpsdm.png": "03166691d6d95efbba29a958bd2b9934",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
