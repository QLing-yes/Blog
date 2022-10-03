import { ApiCall } from "tsrpc";
import { ReqTest, ResTest } from "../shared/protocols/PtlTest";

export default async function (call: ApiCall<ReqTest, ResTest>) {
    call.succ({
        b:1
    })
}