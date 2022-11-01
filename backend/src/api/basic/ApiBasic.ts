import { MDB } from "@src/models/Global";
import { ApiCall } from "tsrpc";
import { ReqBasic, ResBasic } from "../../shared/protocols/basic/PtlBasic";
const StartTime = Date.now();
export default async function (call: ApiCall<ReqBasic, ResBasic>) {
    // MDB.PushTaskFlow('Blog', 'State', [
    //     {
    //         updateOne: {
    //             filter: { '_id': { $exists: true } },
    //             update: { $set: { "basic.notice": "通知" } },
    //             upsert: true
    //         }
    //     },
    // ])
    const col = MDB.Coll('Blog', 'State');
    const data = col.findOne({});
    data.then(async e => {
        call.succ({
            ...e!,
            Articles: await Count(),
            StartTime: StartTime
        })
    })
}
function Count() {
    return MDB.Coll('Blog', 'Article').estimatedDocumentCount();
}