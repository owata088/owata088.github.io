var set_id = "";
var naki_cnt = 0;
var naki_mode = "";
var pon_cnt = 1;
var chi_cnt = 1;
var kan_cnt = 1;
var tehai_ar = ["tehai_01", "tehai_02", "tehai_03", "tehai_04", "tehai_05", "tehai_06", "tehai_07", "tehai_08", "tehai_09", "tehai_10", "tehai_11", "tehai_12", "tehai_13", "agarihai"];
var houra_ar = ["houra_01", "houra_02", "houra_03", "houra_04", "houra_05", "houra_06", "houra_07", "houra_08", "houra_09", "houra_10", "houra_11", "houra_12", "houra_13", "houra_a"];
var naki_ar = ["naki_01", "naki_02", "naki_03", "naki_04", "naki_05", "naki_06", "naki_07", "naki_08", "naki_09", "naki_10", "naki_11", "naki_12", "naki_13", "naki_a"];

// 牌選択画面用
function centeringModalSyncer() {
	var w = $( window ).width() ;
	var h = $( window ).height() ;

	var cw = $( "#modal-content" ).outerWidth();
	var ch = $( "#modal-content" ).outerHeight();

	$( "#modal-content" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
}
// リザルト画面用
function centeringModalSyncerRslt() {
	var w = $( window ).width() ;
	var h = $( window ).height() ;

	var cw = $( "#modal-content-rslt" ).outerWidth();
	var ch = $( "#modal-content-rslt" ).outerHeight();

	$( "#modal-content-rslt" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
}
// 鳴き画面用
function centeringModalSyncerNaki() {
	var w = $( window ).width() ;
	var h = $( window ).height() ;

	var cw = $( "#modal-content-naki" ).outerWidth();
	var ch = $( "#modal-content-naki" ).outerHeight();

	$( "#modal-content-naki" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
}

// 牌選択画面オープン
function modal_open(hai_id) {
	set_id = hai_id;
	
	//キーボード操作などにより、オーバーレイが多重起動するのを防止する
	$( this ).blur() ;	//ボタンからフォーカスを外す
	if( $( "#modal-overlay" )[0] ) return false ;		//新しくモーダルウィンドウを起動しない (防止策1)
	//if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)

	//オーバーレイを出現させる
	$( "body" ).append( '<div id="modal-overlay"></div>' ) ;
	$( "#modal-overlay" ).fadeIn( "fast" ) ;

	//コンテンツをセンタリングする
	centeringModalSyncer() ;

	//コンテンツをフェードインする
	$( "#modal-content" ).fadeIn( "fast" ) ;

	//[#modal-overlay]、または[#modal-close]をクリックしたら…
	$( "#modal-overlay,#modal-close" ).unbind().click( function(){

		//[#modal-content]と[#modal-overlay]をフェードアウトした後に…
		$( "#modal-content,#modal-overlay" ).fadeOut( "fast" , function(){

			//[#modal-overlay]を削除する
			$('#modal-overlay').remove() ;
		} ) ;
	} ) ;
}

// 牌選択画面で牌が選択されたとき実行
function hai_change(src_name, alt_name){
	document.getElementById(set_id).src = src_name;
	document.getElementById(set_id).alt = alt_name;
    $( "#modal-content,#modal-overlay" ).fadeOut( "fast" , function(){
        //[#modal-overlay]を削除する
        $('#modal-overlay').remove() ;
    } ) ;
}

// リザルト画面オープン
function modal_open_rslt() {
	//キーボード操作などにより、オーバーレイが多重起動するのを防止する
	$( this ).blur() ;	//ボタンからフォーカスを外す
	if( $( "#modal-overlay" )[0] ) return false ;		//新しくモーダルウィンドウを起動しない (防止策1)
	//if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)

	//オーバーレイを出現させる
	$( "body" ).append( '<div id="modal-overlay"></div>' ) ;
	$( "#modal-overlay" ).fadeIn( "fast" ) ;

	//コンテンツをセンタリングする
	centeringModalSyncerRslt() ;

	//コンテンツをフェードインする
	$( "#modal-content-rslt" ).fadeIn( "fast" ) ;
	modal_hai_load("hourakei");

	//[#modal-overlay]、または[#modal-close]をクリックしたら…
	$( "#modal-overlay,#modal-close" ).unbind().click( function(){

		//[#modal-content]と[#modal-overlay]をフェードアウトした後に…
		$( "#modal-content-rslt,#modal-overlay" ).fadeOut( "fast" , function(){

			//[#modal-overlay]を削除する
			$('#modal-overlay').remove() ;
		} ) ;
	} ) ;
}

// 鳴き画面オープン
function modal_open_naki(id) {
	naki_mode = id;
	naki_title_change(naki_mode);
	//キーボード操作などにより、オーバーレイが多重起動するのを防止する
	$( this ).blur() ;	//ボタンからフォーカスを外す
	if( $( "#modal-overlay" )[0] ) return false ;		//新しくモーダルウィンドウを起動しない (防止策1)
	//if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)

	//オーバーレイを出現させる
	$( "body" ).append( '<div id="modal-overlay"></div>' ) ;
	$( "#modal-overlay" ).fadeIn( "fast" ) ;

	//コンテンツをセンタリングする
	centeringModalSyncerNaki() ;

	//コンテンツをフェードインする
	$( "#modal-content-naki" ).fadeIn( "fast" ) ;
	modal_hai_load("tehai_naki");

	//[#modal-overlay]、または[#modal-close]をクリックしたら…
	$( "#modal-overlay,#modal-close" ).unbind().click( function(){

		//[#modal-content]と[#modal-overlay]をフェードアウトした後に…
		$( "#modal-content-naki,#modal-overlay" ).fadeOut( "fast" , function(){

			//[#modal-overlay]を削除する
			$('#modal-overlay').remove() ;
		} ) ;
	} ) ;
}

// リサイズ用
$( window ).resize( centeringModalSyncer ) ;
$( window ).resize( centeringModalSyncerRslt ) ;
$( window ).resize( centeringModalSyncerNaki ) ;

function naki_title_change(id) {
	var element = document.getElementById("naki_title");
	switch (id) {
		case "10":
			element.innerHTML = "ポンした牌を選択してください";
			break;
		case "20":
			element.innerHTML = "チーした牌を選択してください";
			break;
		case "30":
			element.innerHTML = "明槓した牌を選択してください";
			break;
		case "40":
			element.innerHTML = "暗槓した牌を選択してください";
			break;
	}
}

function naki(id) {
	var element = document.getElementById(id);
	if (naki_cnt < 2 && element.className == "none") {
		naki_cnt += 1;
		switch (naki_mode) {
			case "10":
				element.className = naki_mode + pon_cnt;
				break;
			case "20":
				element.className = naki_mode + chi_cnt;
				break;
			case "30":
				element.className = naki_mode + kan_cnt;
				break;
			case "40":
				element.className = naki_mode + kan_cnt;
				break;
		}
	} 
	else if (naki_cnt == 2 && element.className == "none") {
		switch (naki_mode) {
			case "10":
				element.className = naki_mode + pon_cnt;
				for (var j = 0; j < 13; j++) {
					if (document.getElementById(naki_ar[j]).className == naki_mode + pon_cnt) {
						document.getElementById(tehai_ar[j]).className = naki_mode + pon_cnt;
					}
				}
				pon_cnt += 1;
				break;
			case "20":
				element.className = naki_mode + chi_cnt;
				for (var j = 0; j < 13; j++) {
					if (document.getElementById(naki_ar[j]).className == naki_mode + chi_cnt) {
						document.getElementById(tehai_ar[j]).className = naki_mode + chi_cnt;
					}
				}
				chi_cnt += 1;
				break;
			case "30":
				element.className = naki_mode + kan_cnt;
				for (var j = 0; j < 13; j++) {
					if (document.getElementById(naki_ar[j]).className == naki_mode + kan_cnt) {
						document.getElementById(tehai_ar[j]).className = naki_mode + kan_cnt;
					}
				}
				kan_cnt += 1;
				break;
			case "40":
				element.className = naki_mode + kan_cnt;
				for (var j = 0; j < 13; j++) {
					if (document.getElementById(naki_ar[j]).className == naki_mode + kan_cnt) {
						document.getElementById(tehai_ar[j]).className = naki_mode + kan_cnt;
					}
				}
				kan_cnt += 1;
				break;
		} 
		$( "#modal-content-naki,#modal-overlay" ).fadeOut( "fast" , function(){
			//[#modal-overlay]を削除する
			$('#modal-overlay').remove() ;
		} ) ;
		naki_reset();
		hai_load();
	}
	else if (naki_cnt == 0 && element.className != "none") {
		for (var j = 0; j < 13; j++) {
			var clsnmsrc = element.className
			var mode = clsnmsrc.slice(0,-1);
			var srcnum = clsnmsrc.slice(-1);
			var clsnm = document.getElementById(naki_ar[j]).className
			if (mode == clsnm.slice(0,-1)) {
				if(srcnum == clsnm.slice(-1)) {
					document.getElementById(tehai_ar[j]).className = "none";
				} else if (srcnum < clsnm.slice(-1)) {
					document.getElementById(tehai_ar[j]).className = mode + (clsnm.slice(-1) - 1);
				}
			} else if (mode == "30") {
				mode = "40";
				if(mode == clsnm.slice(0,-1) && srcnum < clsnm.slice(-1)) {
					document.getElementById(tehai_ar[j]).className = mode + (clsnm.slice(-1) - 1);
				}
			} else if (mode == "40") {
				mode = "30";
				if(mode == clsnm.slice(0,-1) && srcnum < clsnm.slice(-1)) {
					document.getElementById(tehai_ar[j]).className = mode + (clsnm.slice(-1) - 1);
				}
			}
		}
		switch (mode) {
			case "10": 
				pon_cnt -= 1;
				break;
			case "20": 
				chi_cnt -= 1;
				break;
			case "30": 
				kan_cnt -= 1;
				break;
			case "40": 
				kan_cnt -= 1;
				break;
		}
		$( "#modal-content-naki,#modal-overlay" ).fadeOut( "fast" , function(){
			//[#modal-overlay]を削除する
			$('#modal-overlay').remove() ;
		} ) ;
		naki_reset();
		hai_load();
	}
}
function naki_reset() {
	naki_cnt = 0;
	naki_mode = "";
}
//鳴き対応のソート
function hai_load() {
	var cnt = 0;
	var n_cnt = 0;
	var set_hai = [];
	var naki_hai = [];
	// 現在の牌を配列に保存
	for (var j = 0; j < 13; j++) {
		var tmp_a = document.getElementById(tehai_ar[j]).alt;
		var tmp_c = document.getElementById(tehai_ar[j]).className;
		if (tmp_c == "none") {
			set_hai[cnt] = {hai: "", cls: ""};
			set_hai[cnt].hai = tmp_a;
			set_hai[cnt].cls = tmp_c;
			cnt += 1;
		} else {
			naki_hai[n_cnt] = {hai: "", cls: ""};
			naki_hai[n_cnt].hai = tmp_a;
			naki_hai[n_cnt].cls = tmp_c.slice(0,-1);
			naki_hai[n_cnt].cls += tmp_c.slice(-1);
			n_cnt += 1;
		}
	}
	// ソート
	naki_hai.sort(function(a, b) {
		if (a.cls < b.cls) {
		  return -1;
		}
		if (a.cls > b.cls) {
		  return 1;
		}
		return 0;
	});
	// 鳴き牌を配列に追加
	for (var j = 0; j < n_cnt; j++) {
		set_hai[cnt] = {hai: "", cls: ""};
		set_hai[cnt].hai = naki_hai[j].hai;
		set_hai[cnt].cls = naki_hai[j].cls;
		cnt += 1;
	}
	var agari = document.getElementById("agarihai");
	set_hai[13] = {hai: "", cls: ""};
	set_hai[13].hai = agari.alt
	set_hai[13].cls = agari.className;
	// 現在の牌を削除して再描画
	var element = document.getElementById("tehai");
	modal_reset(element);
	for (var j = 0; j < 14; j++) {
		var img = document.createElement('img');
		if (set_hai[j].hai == "error") {
			var type = "h";
			var num = "error";
		} else {
			var type = set_hai[j].hai.slice(0, 1);
			var num = set_hai[j].hai.slice(1);
		}
		img.id = tehai_ar[j];
		img.src = "hai/" + type + "/" + num + ".png";
		img.alt = set_hai[j].hai
		img.className = set_hai[j].cls
		img.onclick = new Function("modal_open(this.id);");
		element.appendChild(img);
	}
	console.log(set_hai);
}

// リザルト&鳴き画面の牌生成 (挿入先のidを取得して生成)
function modal_hai_load(id) {
	// リザルト&鳴きの牌を初期化
	var element = document.getElementById(id);
	modal_reset(element);	
	// 設定画面から牌を取得して生成
	for (var j = 0; j < 14; j++) {
		var tmp = document.getElementById(tehai_ar[j]).alt;
		var tmp_c = document.getElementById(tehai_ar[j]).className;
		if (tmp == "error") {
			var type = "h"
			var num = "error"
		} else {
			var type = tmp.slice(0, 1);
			var num = tmp.slice(1);
		}
		var img = document.createElement('img');
		img.id = houra_ar[j];
		img.src = "hai/" + type + "/" + num + ".png";
		img.alt = type + num;
		img.className = tmp_c;
		if (id == "tehai_naki") {
			img.id = naki_ar[j];
			img.onclick = new Function("naki(this.id);");
			if (j == 13) {
				img.className = "agari";
				img.onclick = "";
			}
		}
		element.appendChild(img);
	}
}

// リザルト画面の役生成
function modal_yaku_load(yaku_list) {
	// リザルトの役を初期化
	var element1 = document.getElementById("yaku_name");
	modal_reset(element1);
	var element2 = document.getElementById("yaku_han");
	modal_reset(element2);
	// JSONから取得した役を生成
	for (key in yaku_list) {
		var name = document.createElement("p")
		var han = document.createElement("p")
		name.innerHTML = yaku_list[key].japanese
		han.innerHTML = yaku_list[key].han + "翻";
		element1.appendChild(name);
		element2.appendChild(han);
	}
}

// リザルト画面の点数生成
function modal_ten_load(cost_han, cost_fu, cost_main, cost_additional) {
	// リザルトの点を初期化
	var element = document.getElementById("modal_ten");
	modal_reset(element);
	// JSONから取得した点を生成
	var han = document.createElement("p");
	var ten = document.createElement("p");
	var tumo = document.getElementById("tumo").checked
	var wind = document.getElementById("jikaze").alt
	han.id = "han";
	han.innerHTML = cost_han + "翻" + cost_fu + "符";
	ten.id = "ten";
	// ロン
	if (tumo == false) {
		ten.innerHTML = cost_main + "点";
	}
	// 親ツモ
	else if (wind == 1) {
		ten.innerHTML = "ALL " + cost_main + "点";
	}
	// 子ツモ
	else {
		ten.innerHTML = "親" +  cost_main + "点 子" + cost_additional + "点";
	}
	element.appendChild(han);
	element.appendChild(ten);
	// manganを生成する関数を呼び出し
	var cost_sum = cost_main + (cost_additional * 2)
	modal_mangan_load(cost_sum, cost_han);
}

// リザルト画面の満貫を生成
function modal_mangan_load(cost, han) {
	// リザルトの点を初期化
	var element = document.getElementById("modal_mangan");
	modal_reset(element);
	// manganを生成
	var mangan = document.createElement("p");
	var wind = document.getElementById("jikaze").alt
	// 親の場合
	if (wind == 1) {
		if (cost >= 48000) {
			mangan.innerHTML = "役満";
		}
		else if (cost >= 36000) {
			mangan.innerHTML = "三倍満";
		}
		else if (cost >= 24000) {
			mangan.innerHTML = "倍満";
		}
		else if (cost >= 18000) {
			mangan.innerHTML = "跳満";
		}
		else if (cost >= 12000) {
			mangan.innerHTML = "満貫";
		}
		else {
			mangan.innerHTML = han + "翻";
		}
	}
	// 子の場合
	else {
		if (cost >= 32000) {
			mangan.innerHTML = "役満";
		}
		else if (cost >= 24000) {
			mangan.innerHTML = "三倍満";
		}
		else if (cost >= 16000) {
			mangan.innerHTML = "倍満";
		}
		else if (cost >= 12000) {
			mangan.innerHTML = "跳満";
		}
		else if (cost >= 8000) {
			mangan.innerHTML = "満貫";
		}
		else {
			mangan.innerHTML = han + "翻";
		}
	}
	element.appendChild(mangan);
}

// リザルト画面のリセット用
function modal_reset(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}