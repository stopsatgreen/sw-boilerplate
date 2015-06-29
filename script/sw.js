importScripts('sw-cache-polyfill.js');

var CACHE_NAME = 'site-cache-v1';
var urlsToCache = [
  '/~peter/sw-boilerplate/',
  '/~peter/sw-boilerplate/style/style.css'
];

self.addEventListener('install', function (event) {
  console.log('I am the SW', event);
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Cache open', cache);
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  )
});
