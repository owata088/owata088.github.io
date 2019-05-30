//キャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    '/owata088.github.io/',
];

//インストール処理
self.addEventListener('install',function(event)
{
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache)
            {
                return cache.addAll(urlsToCache);
            })
    );
});

/*
//リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch',function(event)
{
    event.respondWith(
        caches
            .match(event.request)
            .then(function(responce)
            {
                return responce ? responce :fetch(event.request);
            })
    );
});
*/