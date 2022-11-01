import { createRouter, createWebHashHistory } from 'vue-router'
import type { Router } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { path } from '@/Q-UI/tools/tools';

export class initRoute {
    public Router: Router;
    constructor(routes: RouteRecordRaw[]) {
        this.Router = createRouter({
            history: createWebHashHistory(),
            routes,
        })
    }
    /** 查找路由(就可以修改属性了) */
    FindRoute = (_path: string) => {
        for (let v of this.Router.getRoutes()) {
            if (v.path == _path) return v
        }
    }
}
/** 创建路由表
 * @param removeHead 去除路径段开始部分
 * @param modules 示例 import.meta.glob(匹配文件);
 */
export function RoutesTable(removeHead: string, modules: Record<string, () => Promise<unknown>>) {
    const Table: RouteRecordRaw[] = [];
    for (let key in modules) {
        let { dir } = path(key)
        Table.push({
            path: dir.replace(removeHead, ''),
            component: modules[key],
        })
    }
    return Table;
}

// const modules = import.meta.glob('../../page/*/*.vue');
// FindRoute('/page1/')!.meta = {
//     s: 11
// }