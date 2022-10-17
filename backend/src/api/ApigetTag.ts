import { ApiCall } from "tsrpc";
import { ReqgetTag, ResgetTag } from "../shared/protocols/PtlgetTag";
import { MDB } from "../models/Global";
/** 获取所有tag标签 */
export default async function (call: ApiCall<ReqgetTag, ResgetTag>) {
    let index = await filterIndex(/^tag_/)
    let key = index.map(({ name }) => name as string)
    call.succ({ tag: key })
}
/** 筛选索引名称 */
export async function filterIndex(reg: RegExp) {
    const col = MDB.Coll('Blog', 'Article');
    const I = await col.indexes();
    return I.filter(({ name }) => reg.test(name));
}