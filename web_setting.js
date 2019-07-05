function getUrlVars() {
    var arg = new Object;
    var pair=location.search.substring(1).split('&');
    for(var i=0;pair[i];i++) {
        var kv = pair[i].split('=');
        arg[kv[0]]=kv[1];
    }
    return arg
}
// クリックしたら風を変える
function changewind(id, alt) {
    var kaze_src = new Array("hai/h/1.png", "hai/h/2.png", "hai/h/3.png", "hai/h/4.png");
    var num = Number(alt) - 1
    // 場風は東と南のみで変異
    if (id == "bakaze" && num >= 1 || id == "jikaze" && num >= 3) {
        num = 0;
    }
    else {
        num++;
    }
    document.getElementById(id).src = kaze_src[num];
    document.getElementById(id).alt = String(num + 1);
}
function tumo() {
    document.getElementById("chankan").checked = false;
    if (!document.getElementById("tumo").checked){
        document.getElementById("rinshan").checked = false;
        document.getElementById("tenhou").checked = false;
    }
}
function riichi() {
    if (document.getElementById("riichi").checked) {
        document.getElementById("wriichi").checked = false;
        document.getElementById("tenhou").checked = false;
    }
    else {
        document.getElementById("ippatsu").checked = false;
    }
}
function wriichi() {
    if (document.getElementById("wriichi").checked) {
        document.getElementById("riichi").checked = false;
        document.getElementById("tenhou").checked = false;
        document.getElementById("haitei").checked = false;
    }
    else {
        document.getElementById("ippatsu").checked = false;
    }
}
function ippatsu() {
    if (document.getElementById("riichi").checked) {
        if (document.getElementById("ippatsu").checked){
            document.getElementById("ippatsu").checked = true;
            document.getElementById("rinshan").checked = false;
        }
    }
    else if (document.getElementById("wriichi").checked) {
        if (document.getElementById("ippatsu").checked){
            document.getElementById("ippatsu").checked = true;
            document.getElementById("rinshan").checked = false;
        }
    }
    else {
        document.getElementById("ippatsu").checked = false;
        document.getElementById("tenhou").checked = false;
    }
}
function rinshan() {
    document.getElementById("tumo").checked = true;
    document.getElementById("chankan").checked = false;
    document.getElementById("haitei").checked = false;
    document.getElementById("tenhou").checked = false;
    document.getElementById("ippatsu").checked = false;
}
function chankan() {
    document.getElementById("tumo").checked = false;
    document.getElementById("rinshan").checked = false;
    document.getElementById("haitei").checked = false;
    document.getElementById("tenhou").checked = false;
}
function haitei() {
    document.getElementById("rinshan").checked = false;
    document.getElementById("chankan").checked = false;
    document.getElementById("tenhou").checked = false;
    document.getElementById("wriichi").checked = false;
}
function tenhou() {
    document.getElementById("tumo").checked = true;
    document.getElementById("ippatsu").checked = false;
    document.getElementById("riichi").checked = false;
    document.getElementById("wriichi").checked = false;
    document.getElementById("rinshan").checked = false;
    document.getElementById("chankan").checked = false;
    document.getElementById("haitei").checked = false;
}

var rslt

function calc() {
    var tehai_ar = ["tehai_01", "tehai_02", "tehai_03", "tehai_04", "tehai_05", "tehai_06", "tehai_07", "tehai_08", "tehai_09", "tehai_10", "tehai_11", "tehai_12", "tehai_13", "agarihai"];
    var tehai = {
        man: "",
        pin: "",
        sou: "",
        honors: ""
    };
    var agari = {
        man: "",
        pin: "",
        sou: "",
        honors: ""
    };
    var pon = [];
    var chi = [];
    var kan = [];
    var cnt = 0;
    for (var j = 0; j < 14; j++) {
        var tmp = document.getElementById(tehai_ar[j]).alt;
        var cls = document.getElementById(tehai_ar[j]).className;
        if (tmp.slice(0, 1) == "m") tehai.man += tmp.slice(1);
        else if (tmp.slice(0, 1) == "p") tehai.pin += tmp.slice(1);
        else if (tmp.slice(0, 1) == "s") tehai.sou += tmp.slice(1);
        else if (tmp.slice(0, 1) == "h") tehai.honors += tmp.slice(1);
        if (tehai_ar[j] == "agarihai"){
            if (tmp.slice(0, 1) == "m") agari.man += tmp.slice(1);
            else if (tmp.slice(0, 1) == "p") agari.pin += tmp.slice(1);
            else if (tmp.slice(0, 1) == "s") agari.sou += tmp.slice(1);
            else if (tmp.slice(0, 1) == "h") agari.honors += tmp.slice(1);
        }
        if (cls.slice(0,2) == "10") {
            var num = cls.slice(2);
            num -= 1;
            if (pon[num] == null){
                pon[num] = {
                    man: "",
                    pin: "",
                    sou: "",
                    honors: ""
                };
            }
            if (tmp.slice(0, 1) == "m") pon[num].man += tmp.slice(1);
            else if (tmp.slice(0, 1) == "p") pon[num].pin += tmp.slice(1);
            else if (tmp.slice(0, 1) == "s") pon[num].sou += tmp.slice(1);
            else if (tmp.slice(0, 1) == "h") pon[num].honors += tmp.slice(1);
        }
        if (cls.slice(0,2) == "20") {
            var num = cls.slice(2);
            num -= 1;
            if (chi[num] == null){
                chi[num] = {
                    man: "",
                    pin: "",
                    sou: "",
                    honors: ""
                };
            }
            if (tmp.slice(0, 1) == "m") chi[num].man += tmp.slice(1);
            else if (tmp.slice(0, 1) == "p") chi[num].pin += tmp.slice(1);
            else if (tmp.slice(0, 1) == "s") chi[num].sou += tmp.slice(1);
            else if (tmp.slice(0, 1) == "h") chi[num].honors += tmp.slice(1);
        }
        if (cls.slice(0,2) == "30" || cls.slice(0,2) == "40") {
            cnt += 1;
            var num = cls.slice(2);
            num -= 1;
            if (kan[num] == null){
                kan[num] = {
                    man: "",
                    pin: "",
                    sou: "",
                    honors: "",
                    open: ""
                };
            }
            if (tmp.slice(0, 1) == "m") kan[num].man += tmp.slice(1);
            else if (tmp.slice(0, 1) == "p") kan[num].pin += tmp.slice(1);
            else if (tmp.slice(0, 1) == "s") kan[num].sou += tmp.slice(1);
            else if (tmp.slice(0, 1) == "h") kan[num].honors += tmp.slice(1);
            if (cnt == 3) {
                if (tmp.slice(0, 1) == "m") kan[num].man += tmp.slice(1);
                else if (tmp.slice(0, 1) == "p") kan[num].pin += tmp.slice(1);
                else if (tmp.slice(0, 1) == "s") kan[num].sou += tmp.slice(1);
                else if (tmp.slice(0, 1) == "h") kan[num].honors += tmp.slice(1);
                cnt = 0;
            }
            if (cls.slice(0,2) == "40") kan[num].open = 0
            else kan[num].open = 1
        }
    }
    var dora_ar = ["dora_01", "dora_02", "dora_03", "dora_04", "dora_05", "dora_06", "dora_07", "dora_08", "dora_09", "dora_10"];
    var dora = {
        man: "",
        pin: "",
        sou: "",
        honors: ""
    };
    for (var j = 0; j < 10; j++) {
        var tmp = document.getElementById(dora_ar[j]).alt;
        if (tmp.slice(0, 1) == "m") dora.man += tmp.slice(1);
        else if (tmp.slice(0, 1) == "p") dora.pin += tmp.slice(1);
        else if (tmp.slice(0, 1) == "s") dora.sou += tmp.slice(1);
        else if (tmp.slice(0, 1) == "h") dora.honors += tmp.slice(1);
    }
    console.log(tehai);
    console.log(dora);
    console.log(pon);
    console.log(chi);
    console.log(kan);
    var wind = { round: "", player: "" }
    wind.round = document.getElementById("bakaze").alt;
    wind.player = document.getElementById("jikaze").alt;
    console.log(wind);
    var option = Array();
    if (document.getElementById("tumo").checked) option.push("tsumo");
    if (document.getElementById("wriichi").checked) option.push("daburu_riichi");
    if (document.getElementById("rinshan").checked) option.push("rinshan");
    if (document.getElementById("haitei").checked) {
        if (document.getElementById("tumo").checked) option.push("haitei");
        else option.push("houtei");
    };
    if (document.getElementById("riichi").checked) option.push("riichi");
    if (document.getElementById("ippatsu").checked) option.push("ippatsu");
    if (document.getElementById("chankan").checked) option.push("chankan");
    if (document.getElementById("tenhou").checked) {
        if (wind.player == 1) option.push("tenhou");
        else option.push("chiihou");
    };
    console.log(option);

    var json_data = {
        tehai: tehai,
        agari: agari,
        dora: dora,
        wind: wind,
        pon: pon,
        chi: chi,
        kan: kan,
        option: option
    };
    
    console.log(json_data);

    $.ajax({
        url: 'https://mahjong.syado.net/calc_api/post',
        method: "POST",
        dataType: 'json',
        contentType: 'application/json',
        scriptCharset: 'utf-8',
        data: JSON.stringify(json_data, null, 2),
        success: function (data) {
            console.log(data);
            // reselt画面を表示する
            modal_open_rslt();
            // 役を生成
            modal_yaku_load(data.yaku);
            // 点数を生成
            modal_ten_load(data.han, data.fu, data.cost.main, data.cost.additional);
            // alert(data.cost.main);
        }
    });
}