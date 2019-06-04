/*
カメラ周りのコード記述
カメラの解像度設定
カメラで撮影した画像の送信先の記述

*/
let width = "480"   // We will scale the photo width to this
let height = "360"     // This will be computed based on the input stream

let streaming = false

let video = null
let canvas = null
let photo = null
let startbutton = null
let constrains = { video: {facingMode: 'environment'}, audio: false }
let myStream = null;
/**
 * ユーザーのデバイスによるカメラ表示を開始し、
 * 各ボタンの挙動を設定する
 *
 */
function startup() {
    video = document.getElementById('video')
    canvas = document.getElementById('canvas')
    photo = document.getElementById('photo')
    startbutton = document.getElementById('startbutton')

    videoStart()

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width)

            video.setAttribute('width', width)
            video.setAttribute('height', height)
            canvas.setAttribute('width', width)
            canvas.setAttribute('height', height)
            streaming = true
        }
    }, false)

    // 「画像撮影」ボタンをとる挙動を定義
    startbutton.addEventListener('click', function (ev) {
        takepicture()
        ev.preventDefault()
        //カメラの動作を停止？
        streaming = true    
        
        if(myStream){
            for(track of myStream.getTracks()) track.stop();
            myStream = null;
          };
          video.pause();
          if("srcObject" in video) video.srcObject = null;
          else video.src = null;
    }, false);

    clearphoto()
}

/**
 * カメラ操作を開始する
 */
function videoStart() {
    streaming = false
    navigator.mediaDevices.getUserMedia(constrains)
        .then(function (stream) {
            video.srcObject = stream
            video.play()
            myStream = stream;
        })
        .catch(function (err) {
            console.log("An error occured! " + err)
        })
}
/* canvasの写真領域を初期化する
 */
function clearphoto() {
    let context = canvas.getContext('2d')
    context.fillStyle = "#AAA"
    context.fillRect(0, 0, canvas.width, canvas.height)
}

/**
 * カメラに表示されている現在の状況を撮影する
 */
function takepicture() {
    let context = canvas.getContext('2d')
    if (width && height) {
        canvas.width = width
        canvas.height = height
        context.drawImage(video, 0, 0, width, height)
        send()
    } else {
        clearphoto()
    }
}
function videoRestartbutton(){
    navigator.mediaDevices.getUserMedia(constrains)
    .then(function(stream){
      if("srcObject" in video) video.srcObject = stream;
      else video.src = window.URL.createObjectURL(stream);
      video.onloadedmetadata = function(e){
        video.play();
        myStream = stream;
      };
    })
    .catch(function(err){ console.log(err.name + ": " + err.message); });
  
  };
//下記はカメラデータの送信部分
/*
function send() {
    data = canvas.toDataURL('image/png').replace(/^.*,/, '')
    $.ajax('/read.php', {
        method: 'POST',
        data: { image: data }
    }).then(res => {
        $('#readStr').val(res)
    })
}
*/

//#########################線の描画？

var video = document.getElementById('video');
// videoは非表示にしておく
video.style.display = 'none';

var canvas = document.getElementById('canvas');
// そのまま表示すると鏡像にならないので反転させておく
canvas.style.transform = 'rotateY(180deg)';

var context = canvas.getContext('2d');

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia({video: true, audio: false}, function (stream) {
    video.src = URL.createObjectURL(stream);
    draw();
}, function () {});

// videoの映像をcanvasに描画する
var draw = function () {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(draw);
};
startup()