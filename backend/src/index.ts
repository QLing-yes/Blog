import "./pathAlias";
import * as path from "path";
import { HttpServer } from "tsrpc";
import { serviceProto } from "./shared/protocols/serviceProto";
import { NextData } from "./models/Flow/Flow";

// Create the Server
const server = new HttpServer(serviceProto, {
    port: 3000,
    // Remove this to use binary mode (remove from the client too)
    json: true
});

// Initialize before server start
async function init() {
    // Auto implement APIs
    await server.autoImplementApi(path.resolve(__dirname, 'api'));
    NextData.init(server)
};

// Entry function
async function main() {
    await init();
    await server.start();
};
main();