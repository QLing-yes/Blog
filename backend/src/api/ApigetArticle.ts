import { ApiCall } from "tsrpc";
import { ReqgetArticle, ResgetArticle } from "../shared/protocols/PtlgetArticle";
import { MDB } from "../models/Global";

export default async function (call: ApiCall<ReqgetArticle, ResgetArticle>) {
    const result = await nextPage(10, call.req.start)
    call.succ({ Article: result })
}
/** 获取下一页 */
function nextPage(limit: number, start?: number) {
    const col = MDB.Coll('Blog', 'Article');
    let filter = {}
    if (start) filter = { ID: { $lt: start } }
    return col.find(filter, { sort: { ID: -1 }, limit }).toArray()
}
