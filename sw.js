/*
マニフェストの設定？ファイル
データ名、verを規定

*/
//var CACHE_NAME = index.html;
//↑キャッシュの名前

self.addEventListener('install', function (event) {
    event.waitUntil(


        caches.open(CACHE_NAME)
            .then(function (cache) {
                //↓キャッシュ保持したいファイルのパス
                return cache.addAll(pct / sio.jpg);

            })


    );
});
//activeteイベントの中でcaches.keys()を使って古いキャッシュだけを削除する
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cache) {
            if (CACHE_NAME !== name) caches.delete(name);
        })
    )
})

//fetchイベントの中でevent.respondWirh()を使いリクエスト知れたリソースがキャッシュに存在するか調べる
self.addEventListener('fetch', function (event) {
    event.returnValue(
        caches.match(event.request).then(function (res) {
            if (res) return res;
            return fetch(event.request);
        })
    )
})