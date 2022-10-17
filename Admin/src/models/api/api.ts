import { client } from '@/models/api/client'
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