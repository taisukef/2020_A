import { Server } from "https://code4sabae.github.io/js/Server.js"

class MyServer extends Server {
    api(path, req) {

        // アラームを追加する
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
            return { res: "OK" };
        }
        
        // アラーム一覧を取得する
        else if (path === "/api/getalarm") {
            const json = JSON.parse(Deno.readTextFileSync('./alarm.json'));
            return json;
        }
        
        // 問題を追加する
        else if (path === "/api/setquest") {
            const json = JSON.parse(Deno.readTextFileSync('./quest.json'));
            const jsondoc = json;
            const reqdoc = req;
            jsondoc.map(dat => { delete dat.questId });
            delete reqdoc.questId;
            // 重複を確認 なければ追加 あればエラーを返す
            const dup = jsondoc.find(dat => JSON.stringify(dat) === JSON.stringify(reqdoc));
            if (dup === undefined) {
                json.push(req);
                Deno.writeTextFileSync("./quest.json", JSON.stringify(json));
                return { res: "OK" };
            } else {
                return { res: "Failed" };
            }
        }
        
        // 問題一覧を取得する
        else if (path === "/api/getquest") {
            const json = JSON.parse(Deno.readTextFileSync('./quest.json'));
            // 答えを除く時は以下を実行
            // json.map(dat => { delete dat.answer });
            return json;
        }
        else if (path === "/api/getid") {
            const uuid = v4.generate();
            return uuid;
        }
    }
}

new MyServer(8881);
