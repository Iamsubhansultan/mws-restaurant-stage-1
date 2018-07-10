var CACHE_VERSION = 'restaurant-reviews';
var CACHE_FILES = [  
	'/', 
	'/index.html', 
	'/restaurant.html', 
	'/css/styles.css', 
	'/js/dbhelper.js', 
	'/js/main.js', 
	'/data/restaurants.json', 
	'/js/restaurant_info.js', 
	'/img/1.jpg', 
	'/img/2.jpg', 
	'/img/3.jpg', 
	'/img/4.jpg', 
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg', 
	'/img/8.jpg',
	'/img/9.jpg', 
	'/img/10.jpg'
];
self.addEventListener('install', function (event) { 
	event.waitUntil( 
		caches.open(CACHE_VERSION).then(function (cache) { 
		return cache.addAll(CACHE_FILES);
		})
	);
});

self.addEventListener('fetch', function(event) { 
	const url = new URL(event.request.url);
	if (url.pathname.startsWith('/restaurant.html')) { 
		event.respondWith(
			caches.match('restaurant.html') .then(response => {
				if(response !== undefined) { 
					const cacheResponse = response;
					caches.open(CACHE_VERSION).then(function (cache) { 
						fetch(event.request).then(function(responseFetch) { 
							cache.put('restaurant.html', responseFetch.clone()); 
						})
					});
					return response; 
				} 
				return fetch(event.request);
			})
		);
		return;
	}
	event.respondWith( 
		caches.match(event.request).then(function(response) { 
			if(response !== undefined) { 
				const cacheResponse = response; 
				caches.open(CACHE_VERSION).then(function (cache) { 
					fetch(event.request).then(function(responseFetch) { 
						cache.put(event.request, responseFetch.clone());
					})
				}); 
				return response;
			}
			return fetch(event.request);
		})
	);
});
