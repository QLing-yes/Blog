import type { RouteRecordRaw } from "vue-router";
import { RoutesTable, initRoute } from "@/Q-UI/tools/vueRouter/autoRouter";
const modules_1 = import.meta.glob('../../page/*/*.vue');
const List = () => import("@/components/List.vue");
const Empty = () => import("@/page/Empty/Empty.vue");

/** 路由表 */
export const Table = routes()
export const { Router, FindRoute } = new initRoute(Table);
console.log('路由表', Router.getRoutes());
// Router.beforeEach((to, from, next) => {
// })
// FindRoute('/page1/')!.meta = {
// }

function routes(): RouteRecordRaw[] {
    return [
        {
            path: '/',
            component: List
        },
        ...RoutesTable('../../page', modules_1)
    ]
}

