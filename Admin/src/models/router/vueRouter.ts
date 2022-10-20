import type { RouteRecordRaw } from "vue-router";
import { RoutesTable, initRoute } from "@/Q-UI/tools/vueRouter/autoRouter";
const modules_1 = import.meta.glob('../../page/*/*.vue');
/** 路由表 */
export const Table = routes()
export const { Router, FindRoute } = new initRoute(Table);

Router.beforeEach((to, from, next) => {
    const { path } = to;
    if (path == '/') next({ path: '/page1/' })
    next()
})
console.log('路由表', Router.getRoutes());

// FindRoute('/page1/')!.meta = {
//     s: 11
// }

function routes(): RouteRecordRaw[] {
    return [
        ...RoutesTable('../../page', modules_1)
    ]
}

