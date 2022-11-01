import { ApiCall } from "tsrpc";
import { ReqAddArticle, ResAddArticle } from "../shared/protocols/PtlAddArticle";
import { MDB } from "../models/Global";

let ID: number = 0;
const reg = new RegExp('<[^<>]+>', 'g');
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

    const { brief, content, tag } = call.req;
    call.req.tag = Array.from(new Set(tag.map(e => e.toLowerCase())));
    const Brief = (brief || content.value.replace(reg, '')).substring(0, 60);
    const Doc = {
        insertOne: {
            document: {
                ...call.req,
                tag: call.req.tag.toString(),
                ID,
                time: Date.now(),
                brief: Brief
            }
        }
    }

    MDB.bindCB(Doc, (doc, _err) => {
        if (_err) {
            call.error(_err.err.errmsg);
        }
        else {
            ID += 1;
            call.succ({ _id: doc._id.toString() });
            UpTagSize(call.req.tag);
        }
    })
    MDB.PushTaskFlow('Blog', 'Article', [Doc]);
}
/** 更新集合tag标签大小 */
function UpTagSize(tag: string[]) {
    setImmediate(() => {
        const update: Record<string, number> = {};
        tag.forEach((e) => {
            update['tagSize.' + e] = 1;
        })
        MDB.PushTaskFlow('Blog', 'State', [
            {
                updateOne: {
                    filter: { '_id': { $exists: true } },
                    update: { $inc: update },
                    upsert: true
                }
            },
        ])
    })
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