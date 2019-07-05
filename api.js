//下記はカメラデータの送信部分
function camera_send() {
    $( ".loading" ).fadeIn( "fast" ) ;
    //送信先URL
    var host_url = "https://mahjong.syado.net/img_api/base64";
    //canvas elementを取得
    var canvas = document.getElementById('canvas');
    //base64データを取得（エンコード）
    var img_base64 = canvas.toDataURL('image/png');
    
    var fd = new FormData();
    fd.append('img', img_base64);

    $.ajax({
        //画像処理サーバーに返す場合
        url: host_url,
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: function(data, dataType) {
            //非同期で通信成功時に読み出される [200 OK 時]
            console.log('Success', data);
            seturl = "web_setting.html?"
            //var ar = ["tehai_01", "tehai_02", "tehai_03", "tehai_04", "tehai_05", "tehai_06", "tehai_07", "tehai_08", "tehai_09", "tehai_10", "tehai_11", "tehai_12", "tehai_13", "agarihai"];
            for (var i = 0; i < 14; i++) {
                if (data[i]){
                    seturl += String(i)+"="+data[i]["name"]+"&"
                }
            }
            window.location.href = seturl.slice(0,-1);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //非同期で通信失敗時に読み出される
            console.log('Error : ' + errorThrown);
        }
    });
}

function img_form_send() {
    $( ".loading" ).fadeIn( "fast" ) ;
    $.ajax({
        //画像処理サーバーに返す場合
        url: $("#img_form").attr('action'),
        type: $("#img_form").attr('method'),
        data: new FormData($('#img_form').get(0)),
        contentType: false,
        processData: false,
        complete: function(){
            loading_off();
        },
        success: function (data, dataType) {
            //非同期で通信成功時に読み出される [200 OK 時]
            console.log('Success', data);
            seturl = "web_setting.html?"
            for (var i = 0; i < 14; i++) {
                if (data[i]) {
                    seturl += String(i) + "=" + data[i]["name"] + "&"
                }
            }
            window.location.href = seturl.slice(0, -1);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //非同期で通信失敗時に読み出される
            console.log('Error : ' + errorThrown);
        }
    });
}