import { ServiceType } from "@src/shared/protocols/serviceProto";
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
            if (!DomainCheck(ip, v)) return undefined;

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
/**允许的域*/
function DomainCheck(ip: string, v?: any) {
    const Domain = {
        '127.0.0.1': true
    }
    const b = Domain[ip as keyof typeof Domain];
    if (!b) v?.conn.httpRes.end(JSON.stringify({ err: '非法域名', }));
    return b;
}