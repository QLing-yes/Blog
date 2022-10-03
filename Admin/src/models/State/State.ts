import type { menu_item } from "@/components/Layout/subSidebar/subSidebar"
import { ref } from "vue"

export const State = {
    /** 当前路由匹配 */
    currentPath: ref<string>(''),
    /** 面包屑导航集合 { 路由名称: breadcrumb } */
    breadcrumbGather: {} as Record<string, menu_item[]>,
    /** 标签页 */
    tagPages: ref<tag[]>([])
}

export function getBreadcrumb() {
    return State['breadcrumbGather'][State['currentPath'].value] || []
}

type tag = {
    name: string
    route: string
}