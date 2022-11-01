import { client } from '@/shared/api/client'
import type { ServiceType } from "@/shared/protocols/serviceProto";
import type { req, res } from "@/shared/typeTools/tsrpc";
import type { TsrpcError } from 'tsrpc-browser';
import type { ReqBasic } from '../protocols/basic/PtlBasic';
import type { ReqgetArticle, ResgetArticle } from '../protocols/PtlgetArticle';

// export type ResBasic = res<'basic/Basic'>
export type Article = res<'getArticle'>['Article']
export type TagCount = res<'getTagCount'>
type col = { value: string; link?: string }

/** 获取所有标签数量*/
export function getTagCount() {
    return client.callApi('getTagCount', {});
}
/** 获取文章 */
export function getArticle(q: ReqgetArticle) {
    return client.callApi('getArticle', q);
}
/** 基本信息 */
export function apiBasic(q?: ReqBasic) {
    return client.callApi('basic/Basic', q || {});
}