// idの乱数生成、cookieに登録済みなら新規登録はしない
// 返り値はid
function idMaker() {
    let cookie = document.cookie.split(";");
    console.log(cookie);
    for(let i of cookie) {
        var cAry = i.split("=");
        if (cAry[0] == "id") {
            return cAry[1];
        }
    }
    let rand = Math.floor(Math.random () * 10000) + 1;
    document.cookie = "id=" + (rand).toString();
    return rand;
}

export {idMaker}
