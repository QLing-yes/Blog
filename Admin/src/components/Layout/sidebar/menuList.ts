import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { nextTick, ref } from 'vue'
import { Router } from '@/models/router/vueRouter'
import { State, getBreadcrumb } from '@/models/State/State';
import type { MenuItemRegistered } from 'element-plus'
import type { menu, menu_item } from '../subSidebar/subSidebar'

let page1: menu_item = {
    icon: Location,
    index:'/editor/',
    title: 'editor',
    click: tab
}
let page2: menu_item = {
    icon: Location,
    index:'/page2/',
    title: 'page2',
    click: tab
}

let item1 = {
    icon: Location,
    title: 'page1',
    sub:[page1],
    click: tab
}
let item2 = {
    icon: Location,
    title: 'page2',
    sub:[page2],
    click: tab
}
/** 侧边栏列表 */
export const menuList: menu = [item1,item2]
/** 默认激活的index */
export const active = ref('')
Router.beforeEach((to, from, next) => {
    nextTick(() => {
        const { path } = to.matched[0];
        State.currentPath.value = path;
        active.value = path;
        const { index, title } = getBreadcrumb().at(-1)!
        const tagPages = State.tagPages.value;

        let isAddTag = true;
        tagPages.forEach(({ name, route }) => {
            if (name == title && route == index) isAddTag = false;
        })
        if (isAddTag && index) tagPages.push({
            name: title,
            route: index
        })
        console.log('当前匹配路由', path);
    })
    next()
})

function tab(e: MenuItemRegistered, item: menu_item) {
    Router.push(e.index)
}