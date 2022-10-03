import type { MenuItemRegistered } from "element-plus"

type menu_item = {
    index?: string
    icon?: any
    title: string
    //sub优先级高于group
    sub?: menu_item[]
    group?: menu_item[]
    /**
     * @param e 当前项事件
     * @param breadcrumb 层级关系
     * @param item 当前项 
     */
    click?: (e: MenuItemRegistered, item: menu_item) => any
}
type menu = menu_item[]