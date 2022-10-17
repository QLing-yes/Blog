import { ApiCall } from "tsrpc";
import { ReqAddArticle, ResAddArticle } from "../shared/protocols/PtlAddArticle";
import { MDB } from "../models/Global";

let ID: number = 0;
/** 添加文章 */
export default async function (call: ApiCall<ReqAddArticle, ResAddArticle>) {
    const errmsg = sizeLimit(call.req.tag, 20)
    if (errmsg) {
        call.error(errmsg);
        return
    }
    if (!ID) {
        const Last = await last(["ID"]);
        ID = (Last[0]?.ID || 0) + 1;
    }
    call.req.tag = Array.from(new Set(call.req.tag.map(e => e.toLowerCase())));
    const Doc = {
        'insertOne': {
            'document': { ...call.req, ID }
        }
    }
    MDB.bindCB(Doc, (doc, _err) => {
        if (_err) {
            call.error(_err.err.errmsg);
        }
        else {
            ID += 1;
            call.succ({ _id: doc._id.toString() })
            createTagIndex(call.req.tag)
        }
    })
    MDB.PushTaskFlow('Blog', 'Article', [Doc])
}
/** 动态创建索引(标签tag) */
async function createTagIndex(tag: string[]) {
    const col = MDB.Coll('Blog', 'Article');
    const I = await col.indexes()
    const key = I.map(({ name }) => name)
    for (const v of tag) {
        if (!key.includes(v)) {
            col.createIndex({ "tag": 1 }, {
                name: "tag_" + v,
                background: true,
                partialFilterExpression: { tag: { $eq: v } }
            })
        }
    }
}
/** string[] 字符串长度校验 */
function sizeLimit(tag: string[], size: number) {
    for (let l of tag) {
        if (l.length > size) return `"${l}"长度超过限制(${size})`
    }
}
/** 获取最后一个插入项 */
function last(projec?: string[]) {
    const col = MDB.Coll('Blog', 'Article');
    const projection = {} as Record<string, 1>
    projec?.forEach(e => { projection[e] = 1 })
    return col.find({}, { sort: { _id: -1 }, limit: 1, projection }).toArray()
}