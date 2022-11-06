import { ServiceType } from "@src/shared/protocols/serviceProto";
import { type } from "os";
import { HttpConnection, HttpServer } from "tsrpc";

type Server = HttpServer<ServiceType>
type Flow = Parameters<Parameters<Server['flows']['preRecvDataFlow']['push']>[0]>[0]
export class Guard {

    static init(server: Server) {
        // 发送数据前
        // server.flows.preSendDataFlow.push((v) => {
        //     return v;
        // });
        // 接收数据前
        server.flows.preRecvDataFlow.push((v) => {
            let { ip } = BaseInfo(v);
            if (!IPFrequently(ip, v)) return undefined;
            return v;
        })
    }

}


//基本httpReq信息
function BaseInfo(v: Flow) {
    let { data, serviceName, } = v;
    // HttpServer，对应的 conn 实际是 HttpConnection
    let { ip, httpReq } = v.conn as HttpConnection;
    let { method, url } = httpReq;
    return {
        conn: v.conn as HttpConnection,
        data,
        ip,
        method,
        url,
        serviceName
    }
}

let IPs: Record<string, number | undefined> = {};
/** 请求频率限制 */
function IPFrequently(ip: string, call: any) {
    const now = Date.now();
    if (IPs[ip]) {
        const time = now - IPs[ip]!;
        if (time < 1500) {
            call.conn.httpRes.end(JSON.stringify({ isSucc: false, err: '请求频繁', }));
            IPs[ip] = now;
            return false;
        }
    }
    IPs[ip] = now;
    return true;
}
setInterval(() => { IPs = {} }, 5000)