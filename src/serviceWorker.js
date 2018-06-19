let urlsToCache=[
  '/',
  '/App.js',
  '/list.js',
  '/map.js',
  '/App.css',
  '/InfoAPI.js',
  '/index.js'
];
self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open('cache1').then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});
addToCache = (name,request,response) => {
  caches.open('cache1').then(cache => cache.put(request,response))
}
self.addEventListener( "fetch" ,(event) => {
    //fetch request as specified by event object
//console.log(event.request);
    event.respondWith(
        fetch(event.request)
        .then((response) => {
          console.log(response);

                urlsToCache.push(event.request);
                addToCache('cache1',event.request,response.clone());
                return response;
        })
        .catch( (error)=> {
          console.log(' catch net');
          return caches.match(event.request).then(function(response) {
            return response;
          })
        })
    );
});

    //console.log('hello'); //Note that Request and Response are also objects
