import { ApiCall } from "tsrpc";
import { ReqgetArticle, ResgetArticle } from "../shared/protocols/PtlgetArticle";
import { MDB } from "../models/Global";

export default async function (call: ApiCall<ReqgetArticle, ResgetArticle>) {
    const { start, brief, search, field, ID } = call.req;
    let data: ReturnType<typeof searchID>;

    if (ID) data = searchID(ID);
    else if (search) data = searchTxt(search, 10, start, brief, field);
    else data = nextPage(10, start, brief);

    data.then((result) => {
        call.succ({ Article: result })
    })
}

/** 最新文章
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
    const data = col.find(filter, { limit, projection }).sort({ ID: -1 });

    return data.toArray();
}
/** 文章搜索
 * @param search 匹配内容
 * @param limit 数量
 * @param start 开始位置
 * @param field 指定字段进行匹配
 */
function searchTxt(search: string, limit: number, start?: number, brief?: boolean, field?: string) {
    const col = MDB.Coll('Blog', 'Article');

    const filter = {}
    let projection: Record<string, 0 | 1> = {}

    if (brief) projection.content = 0;
    if (start) Reflect.set(filter, 'ID', { $lt: start });
    if (field) {
        Reflect.set(filter, field, { $regex: new RegExp(search) });
    }
    else {
        Reflect.set(filter, '$text', { $search: search });
    }

    const data = col.find(filter, { limit, projection })
        .sort({ ID: -1 });
    // .sort({ score: { $meta: 'textScore' } });
    // data.explain('allPlansExecution').then((e) => {
    //     let { stage, indexName } = e.executionStats.executionStages;
    //     console.log(stage, indexName);
    // })
    return data.toArray();
}
/** 匹配ID */
function searchID(ID: number) {
    const col = MDB.Coll('Blog', 'Article');
    const data = col.find({ ID }).sort({ ID: -1 });
    return data.toArray();
}
