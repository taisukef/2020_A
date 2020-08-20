import { Server } from "https://code4sabae.github.io/js/Server.js"

class MyServer extends Server {
    api(path, req) {
        if (path === "/api/setalarm") {
            var json = JSON.parse(Deno.readTextFileSync('./alarm.json'));
            // 重複を確認 なければ追加 あれば更新
            const dup = json.find(dat => dat.id === req.id);
            if (dup === undefined) {
                json.push(req);
            } else {
                dup.time = req.time;
            }
            Deno.writeTextFileSync("./alarm.json", JSON.stringify(json));
        } else if (path === "/api/getalarm") {
            const json = JSON.parse(Deno.readTextFileSync('./alarm.json'));
            return json;
        } else if (path === "/api/setquest") {
            const json = JSON.parse(Deno.readTextFileSync('./quest.json'));
            // 重複を確認 なければ追加 あればエラーを返す
            const dup = json.find(dat => JSON.stringify(dat) === JSON.stringify(req));
            if (dup === undefined) {
                json.push(req);
                Deno.writeTextFileSync("./quest.json", JSON.stringify(json));
                return 0;
            } else {
                return -1;
            }
        } else if (path === "/api/getquest") {
            const json = JSON.parse(Deno.readTextFileSync('./quest.json'));
            // 答えを除く時は以下を実行
            // json.map(dat => { delete dat.answer; });
            return json;
        }
    }
}

new MyServer(8881);