if (navigator.serviceWorker) {
    navigator.serviceWorker.register('js/sw.js')
    .then(registration => {
        console.log(`Registered!! || Scope:  ${registration.scope}`);
	}).catch(error => {
		console.log(`Failed: , error: ${error}`);
	});
}
//sw.js//
// Cache Name
const staticCacheName = 'restaurant-stage-1';

// Default files to always cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll([
          /* Add every page to cache */
          '/index.html',
          '/css/styles.css',
          '/js/dbhelper.js',
          '/js/registering-sw.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/data/restaurants.json',
          '/restaurant.html?id=1',
          '/restaurant.html?id=2',
          '/restaurant.html?id=3',
          '/restaurant.html?id=4',
          '/restaurant.html?id=5',
          '/restaurant.html?id=6',
          '/restaurant.html?id=7',
          '/restaurant.html?id=8',
          '/restaurant.html?id=9',
          '/restaurant.html?id=10'
        ]).catch(error => {
          console.log('Caches open failed: ' + error);
        });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(error => {
      return new Response('No Internet', {
        statusText: "No internet",
        status: 404
      });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-stage-') && cacheName !== staticCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
//styles.css
@charset "utf-8";
/* CSS Document */
body,td,th,p{
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10pt;
	color: #333;
	line-height: 1.5;
}
body {
	background-color: #fdfdfd;
	position:relative;
	width: 100%;
	margin: 0px;
	padding: 0px;
	overflow-x: hidden; 
}
ul, li {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10pt;
	color: #333;
}
a {
	color: orange;
	text-decoration: none;
}
a:hover, a:focus {
	color: #3397db;
	text-decoration: none;
}
a img{
	border: none 0px #fff;
}
h1, h2, h3, h4, h5, h6 {
	font-family: Arial, Helvetica, sans-serif;
	margin: 0 0 20px;
}
article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
	display: block;
}
#maincontent {
	background-color: #f3f3f3;
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	width: 100%;
	margin: 0 auto;
}
#footer {
	width: 100%;
	background-color: #444;
	color: #e5d1d1;
	font-size: 8pt;
	letter-spacing: 1px;
	padding: 25px 0px;
	text-align: center;
	text-transform: uppercase;
}
/* ====================== Navigation ====================== */
nav {
	width: 100%;
	height: 80px;
	background-color: #252831;
	text-align:center;
}
nav h1 {
	padding:10px 0px 10px 0px;
	margin: auto;
}
nav h1 a {
	color: #fff;
	font-size: 12pt;
	font-weight: 800;
	letter-spacing: 5px;
	text-transform: uppercase;
}
#breadcrumb {
    padding: 10px 40px 16px;
    list-style: none;
    background-color: #eee;
    font-size: 17px;
    margin: 0;
    width: calc(50% - 80px);
}

/* Display list items side by side */
#breadcrumb li {
    display: inline;
}

/* Add a slash symbol (/) before/behind each list item */
#breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
}

/* Add a color to all links inside the list */
#breadcrumb li a {
    font-size: 16px;
    color: #0275d8;
    text-decoration: none;
}

/* Add a color on mouse-over */
#breadcrumb li a:hover {
    color: #01447e;
    text-decoration: underline;
}
/* ====================== Map ====================== */
#map {
	height: 400px;
	width: 100%;
	background-color: #ccc;
	margin: 0 auto;
}
#filter{
	width: 100%;
}
/* ====================== Restaurant Filtering ====================== */
.filter-options {
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	width: 100%;
	background-color: #3397DB;
	align-items: center;
	padding: 10px 0px;
}
.filter-options h2 {
	color: white;
	font-size: 1rem;
	font-weight: normal;
	line-height: 1;
	margin: 0 20px;
	width: 100%;
	text-align: center;
}
.filter-options select {
	background-color: white;
	border: 1px solid #fff;
	font-family: Arial,sans-serif;
	font-size: 11pt;
	height: 35px;
	letter-spacing: 0;
	margin: 10px;
	padding: 0 10px;
	width: 200px;
}

/* ====================== Restaurant Listing ====================== */
#restaurants-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	background-color: #f3f3f3;
	list-style: outside none none;
	padding: 20px 0px ;
	text-align: center;
	width:100%;
	margin: 0 auto;
}
#restaurants-list li {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border: 2px solid #ccc;
	font-family: Arial,sans-serif;
	width: 270px;
	margin: 15px;
	padding: 0 30px 25px;
	text-align: left;
	min-height: 380px;
}
#restaurants-list .restaurant-img {
	background-color: #ccc;
	display: block;
	margin: 0;
	max-width: 100%;
	min-height: 248px;
	min-width: 100%;
}
#restaurants-list li h1 {
	color: #f18200;
	font-family: Arial,sans-serif;
	font-size: 14pt;	  
	font-weight: 200;
	letter-spacing: 0;
	line-height: 1.3;
	margin: 20px 0 10px;
	text-transform: uppercase;
}
#restaurants-list p {
	margin: 0;
	font-size: 11pt;
	width: 100%;
	padding-left: 5px;
	font-weight: 400;
}
#restaurants-list li a {
	background-color: orange;
	border-bottom: 3px solid #eee;
	color: #fff;
	display: inline-block;
	font-size: 10pt;
	margin: 15px 0 0;
	padding: 8px 30px 10px;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
}

/* ====================== Restaurant Details ====================== */
.inside header {
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 1000;
}
.inside #map-container {
	background: blue none repeat scroll 0 0;
	height: 87%;
	position: fixed;
	right: 0;
	top: 80px;
	width: 50%;
}
.inside #map {
	background-color: #ccc;
	height: 100%;
	width: 100%;
}
.inside #footer {
	bottom: 0;
	position: absolute;
	width: 50%;
}
#restaurant-name {
	color: #f18200;
	font-family: Arial,sans-serif;
	font-size: 20pt;
	font-weight: 200;
	letter-spacing: 0;
	margin: 15px 0 30px;
	text-transform: uppercase;
	line-height: 1.1;
	padding: 0px 30px;
	width: 100%;
}
#restaurant-img {
	width: 90%;
	padding: 0;
	max-height: 380px;
	max-width: 500px;
	margin: 0 auto;
}
#restaurant-address {
	padding: 20px 0px;
	font-size: 12pt;
	margin: 10px 0px;
	width: 100%;
	text-align: center;
}
#restaurant-cuisine {
	background-color: #333;
	color: #ddd;
	font-size: 12pt;
	font-weight: 300;
	letter-spacing: 10px;
	margin: 0 0 20px;
	padding: 2px 0;
	text-align: center;
	text-transform: uppercase;
	width: 100%;
}
#restaurant-container, #reviews-container {
	border-bottom: 1px solid #d9d9d9;
	border-top: 1px solid #fff;
	padding: 140px 40px 30px;
	width: 50%;
}
#reviews-container {
	padding: 30px 40px 80px;
}
#reviews-container h2 {
	color: #f58500;
	font-size: 24pt;
	font-weight: 300;
	letter-spacing: -1px;
	padding-bottom: 1pt;
	text-align: center;
	padding: 20px 0px 5px 0px;
}
#reviews-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	margin: 0 auto;
	padding: 0;
}
#reviews-list li {
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	background-color: #fff;
    border: 2px solid #f3f3f3;
	display: block;
	list-style-type: none;
	margin: 0 0 30px;
	overflow: hidden;
	padding: 0 20px 20px;
	position: relative;
	width: 85%;
}
#reviews-list li p {
	padding:5px;
	width: 100%;
	margin: 0;
}
#restaurant-hours td {
	color: #666;
}
//mediacss
@media screen and (min-width: 800px) {
	#reviews-list li {
		width: calc(50% - 20px);
		margin-left: auto;
		margin-right: auto;
    }
  }
  
  @media screen and (min-width: 1000px) {

    /* Added order attribute to  
	flexbox contents */
    #map-container{
		height: 500px;
		width: 100%;
    }
    #map {
		height: 500px;
		width: 100%;
		background-color: #efcbcb;
		margin: 0 auto;	
    }
    h2#restaurant-name {
		order: -2;
		font-size: 38px;
		margin: 0px auto;
		padding: 20px;
		float: left;
    }
    nav h1 a, h2#restaurant-name {
		font-size: 26px;
    }
  
    ul#breadcrumb li, ul#breadcrumb li a{
		font-size: 18px;
    }
    img#restaurant-img {
		width: calc(50% - 30px);
		max-width: 500px;
		order: 1;
		padding:20px 20px 0px 20px;
		max-height: 400px;
		max-width: 600px;
		margin: 0;
	}
    table#restaurant-hours {
		width: calc(50% - 30px);
		order: 2;
		margin-top: 20px;
	}
    table#restaurant-hours tr td {
		font-size: 18px;
		order: 2;
		margin: auto auto 0 auto;
		padding-top: 20px;
		padding-bottom: 0;
    }
    p#restaurant-cuisine {
		width: calc(50% - 30px);
		margin: 0 0 40px 20px;
		max-width: 600px;
		order: 3;
		line-height:2em;
    }
    p#restaurant-address {
		order: 4;
		font-size: 20px;
		text-decoration: none;
		width: 100%;
		width: calc(50% - 30px);
		margin: 0 0 10px 0;
		padding: 0;
		line-height: 2em;
    }
    #reviews-list li p:last-of-type {
		font-size: 20px;
    }
}
@media screen and (min-width: 1200px) {
    #reviews-list li {
		width: calc(33% - 20px);
		margin-left: auto;
		margin-right: auto;
    }
  }

