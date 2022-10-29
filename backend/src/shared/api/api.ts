import { client } from '@/shared/api/client'
import type { ServiceType } from "@/shared/protocols/serviceProto";
import type { res } from "@/shared/typeTools/tsrpc";
import type { TsrpcError } from 'tsrpc-browser';
import type { ResgetArticle } from '../protocols/PtlgetArticle';

export type Article = res<'getArticle'>['Article']
export type TagCount = res<'getTagCount'>
type col = { value: string; link?: string }

/** 获取所有标签数量*/
export function getTagCount() {
    return client.callApi('getTagCount', {})
}
/** 获取摘要文章列表 */
export function getArticle(start = 0) {
    return client.callApi('getArticle', { start, brief: true })
}
