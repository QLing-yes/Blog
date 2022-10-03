import { ServiceType } from "@src/shared/protocols/serviceProto";
import { HttpConnection, HttpServer } from "tsrpc";

export class NextData {

    static init(server: HttpServer<ServiceType>) {
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
function BaseInfo(v: any) {
    let { data, serviceName, } = v;
    let { ip } = v.conn as HttpConnection;
    let { method, url } = v.conn.httpReq;
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