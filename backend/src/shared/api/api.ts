import { client } from '@/shared/api/client'
import type { ServiceType } from "@/shared/protocols/serviceProto";
import type { res } from "@/shared/typeTools/tsrpc";
import type { TsrpcError } from 'tsrpc-browser';
import type { ResgetArticle } from '../protocols/PtlgetArticle';

export type Article = res<'getArticle'>['Article']
type col = { value: string; link?: string }

/** 获取所有标签 */
export function getTag(CB: (col?: col[]) => void) {
    client.callApi('getTag', {}).then((e) => {
        const { isSucc, res } = e
        let v = res?.tag.map((tag) => {
            return { value: tag.replace('tag_', '') }
        })
        CB(v)
    })
}

/** 获取文章 */
export function getArticle(start = 0, Callback?: (e?: TsrpcError, res?: ResgetArticle) => void) {
    client.callApi('getArticle', { start })
        .then((e) => { Callback?.(e.err, e.res) })
}
