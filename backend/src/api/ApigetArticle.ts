import { ApiCall } from "tsrpc";
import { ReqgetArticle, ResgetArticle } from "../shared/protocols/PtlgetArticle";
import { MDB } from "../models/Global";

export default async function (call: ApiCall<ReqgetArticle, ResgetArticle>) {
    const { start, brief } = call.req;
    nextPage(10, start, brief)
        .then((result) => {
            call.succ({ Article: result })
        })
}

/** 获取下一页
 * @param limit 数量
 * @param start 开始位置
 * @param brief 精简内容?
 */
function nextPage(limit: number, start?: number, brief?: boolean) {
    const col = MDB.Coll('Blog', 'Article');
    let filter = {}
    let projection: Record<string, 0 | 1> = {}
    if (start) filter = { ID: { $lt: start } };
    if (brief) projection.content = 0;
    return col.find(filter, { sort: { ID: -1 }, limit, projection }).toArray()
}
