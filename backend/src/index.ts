import "./pathAlias/pathAlias";
import * as path from "path";
import { HttpServer } from "tsrpc";
import { serviceProto } from "./shared/protocols/serviceProto";
import { Guard } from "./models/Flow/Flow";
import fs from "fs";
// Create the Server
const server = new HttpServer(serviceProto, {
    port: 3000,
    // Remove this to use binary mode (remove from the client too)
    json: true,
    // logReqBody: false,
    logResBody: false,
    https: {
        key: fs.readFileSync(__dirname + '/../assets/ssl/ling-in.top.key'),
        cert: fs.readFileSync(__dirname + '/../assets/ssl/ling-in.top_bundle.crt')
    },
});

async function init() {
    // Auto implement APIs
    await server.autoImplementApi(path.resolve(__dirname, 'api'));
    Guard.init(server)
};

// Entry function
async function main() {
    await init();
    await server.start();
};
main();