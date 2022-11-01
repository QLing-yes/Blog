import type { ServiceType } from "../protocols/serviceProto";
type api = ServiceType['api'];
/** 请求参数 */
export type req<T extends keyof api> = api[T]['req']
/** 响应对象 */
export type res<T extends keyof api> = api[T]['res']