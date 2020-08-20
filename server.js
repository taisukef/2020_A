import { Server } from "https://code4sabae.github.io/js/Server.js"

class MyServer extends Server {
    api(path, req) {
        if (path === "/api/setalarm") {
            var json = JSON.parse(Deno.readTextFileSync('./alarm.json'));
            json.push(req);
            Deno.writeTextFileSync("./alarm.json", JSON.stringify(json));
        } else if (path === "/api/getalarm") {
            const json = JSON.parse(Deno.readTextFileSync('./alarm.json'));
            return json;
        }
    }
}

new MyServer(8881);