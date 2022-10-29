import type { menu_item } from "@/components/Layout/subSidebar/subSidebar"
import { getTagCount } from "@/shared/api/api";
import { ref } from "vue"

export const State = {
    /** 当前路由匹配 */
    currentPath: ref<string>(''),
    /** 面包屑导航集合 { 路由名称: breadcrumb } */
    breadcrumbGather: {} as Record<string, menu_item[]>,
    /** 标签页 */
    tagPages: ref<tag[]>([]),
    /** 文章集合标签数量 */
    Tags: {} as { [key: string]: number; }
}

getTagCount().then((v) => {
    if (v.err) {
        console.error(v.err)
        return
    }
    if (v.res.tagSize) State.Tags = v.res.tagSize;
})

export function getBreadcrumb() {
    return State['breadcrumbGather'][State['currentPath'].value] || []
}

type tag = {
    name: string
    route: string
}