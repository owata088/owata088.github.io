/*
マニフェストの設定？ファイル
データ名、verを規定

*/

//↓キャッシュバージョン
var CACHE_NAME = "webcame_v004";

//↓キャッシュ保持するファイル
var dateCache_v1 = [
    "iphone_pwa.html",
    "sw.js",
    "camera.js",
    "style.css",
    "manifest.json",
    "camera03.js",
    "icon/icon-48.png",
    "icon/icon-96.png",
    "icon/icon-144.png",
    "icon/icon-192.png",
    "icon/icon-256.png",
    "icon/icon-512.png",
]


self.addEventListener('install', function (event) {
    event.waitUntil(


        caches.open(CACHE_NAME)
            .then(function (cache) {
                //↓キャッシュ保持したいファイルのパス
                return cache.addAll(dateCache_v1);

            })


    );
});

//↓うまく動作しないから現状無効化
/*
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
*/