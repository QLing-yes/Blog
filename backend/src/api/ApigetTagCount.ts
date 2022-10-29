import { ApiCall } from "tsrpc";
import { ReqgetTagCount, ResgetTagCount } from "../shared/protocols/PtlgetTagCount";
import { MDB } from "../models/Global";

export default async function (call: ApiCall<ReqgetTagCount, ResgetTagCount>) {
    const col = MDB.Coll('Blog', 'State');
    col.find({}, { limit: 1, projection: { 'tagSize': 1 } }).toArray()
        .then((v) => {
            call.succ({ tagSize: v[0]?.tagSize })
        })
}