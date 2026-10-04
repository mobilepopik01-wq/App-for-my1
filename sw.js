var C='acc-v1';
var F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.open(C).then(function(c){
    return c.match(e.request,{ignoreSearch:true}).then(function(m){
      var n=fetch(e.request).then(function(r){if(r&&r.ok)c.put(e.request,r.clone());return r}).catch(function(){return m||c.match('./index.html')});
      return m||n})}))});
