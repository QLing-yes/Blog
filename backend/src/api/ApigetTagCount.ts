import { ApiCall } from "tsrpc";
import { ReqgetTagCount, ResgetTagCount } from "../shared/protocols/PtlgetTagCount";
import { MDB } from "../models/Global";
import { filterIndex } from "./ApigetTag";

export default async function (call: ApiCall<ReqgetTagCount, ResgetTagCount>) {
    const tags = await countTag(/^tag_/);
    call.succ(tags)
}
/** 获取标签下文章数量 */
async function countTag(reg: RegExp) {
    const col = MDB.Coll('Blog', 'Article');
    const index = await filterIndex(reg);
    const tags: Record<string, number> = {};
    await Promise.all(index.map(async ({ name }) => {
        name = name.replace(reg, '');
        tags[name] = await col.countDocuments({ 'tag': { $eq: name } });
    }))
    return tags
}