var staticCacheName = 'restaurant-review-stage-v5';

// TODO: install new cache
self.addEventListener('install', function(event) {
	event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
		return cache.addAll([
		'/',
		'index.html',
		'restaurant.html',
		'css/styles.css',
		'css/mediacss.css',
		'data/restaurants.json',
		'js/dbhelper.js',
		'js/main.js',
		'js/registering-sw.js',
		'js/restaurant_info.js',
		'img/1.jpg',
		'img/2.jpg',
		'img/3.jpg',
		'img/4.jpg',
		'img/5.jpg',
		'img/6.jpg',
		'img/7.jpg',
		'img/8.jpg',
		'img/9.jpg',
		'img/10.jpg'
		]);
	})
   );
});

// TODO: delete old caches
self.addEventListener('activate',function(event) {
	event.waitUntil(
	    caches.keys().then(function(cacheNames) {
			return Promise.all(
			cacheNames.filter(function(cacheName) {
				return cacheName.startsWith('restaurant-') && (staticCacheName != cacheName);
            }).map(function(cacheName) {
				return caches.delete(cacheName);
        })
      );
    })
  );
});

// TODO: fetch request
self.addEventListener('fetch', function(event) {
	var requestUrl = new URL(event.request.url);
	event.respondWith(
    caches.match(event.request).then(function(response) {
		return response || fetch(event.request);
	}).catch(function() {
      return ('fetchis failed ...');
    })
  );
});
