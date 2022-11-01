/** 防抖 */
export function debounce() {
    let timer: any = undefined
    return (callback: Function, wait = 400) => {
        clearTimeout(timer)
        timer = setTimeout(callback, wait)
    }
}
/** 节流
 * @param CB 回调
 * @param cancel (保存返回值并赋值给"cancel")
 * @param t 延时
 */
export function throttle(CB: () => void, cancel?: NodeJS.Timeout, t?: number): NodeJS.Timeout {
    clearTimeout(cancel);
    cancel = setTimeout(CB, t);
    return cancel;
}
/** 类型判断 */
export function isType(obj: any) {
    if (obj !== obj) return 'NaN';
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
/** 文件路径信息 */
export function path(p: string) {
    let ext = p.includes('.') ? p.substring(p.lastIndexOf("."), p.length) : '';
    if (ext.includes('/')) ext = '';
    const name = ext ? p.substring(('/' + p).lastIndexOf("/"), p.lastIndexOf(ext)) : '';
    const dir = name ? p.replace(name + ext, '') : p;
    let d = dir.replace(/\/\//g, '')
    if (d[d.length - 1] === '/') d = d.substring(0, d.length - 1);
    const basename = d.substring(('/' + d).lastIndexOf("/"), d.length);

    return {
        ext,
        name,
        basename,
        dir
    }
}
/** 响应式
 * @param obj 目标对象
 * @param callback 响应回调
 * @param deep 深响应(默认false)
 */
export function ref<T extends object>(obj: T, callback: (v: T) => void, deep = false) {
    if (deep) {
        const Handler: ProxyHandler<T> = {
            getPrototypeOf(proto) {
                return { proto, isProxy: true }
            },
            get: (o, k) => {
                subProxy(o, k)
                return Reflect.get(o, k)
            },
            set(o, k, v) {
                Reflect.set(o, k, v)
                subProxy(o, k)
                callback(o)
                return true;
            }
        }
        function subProxy<T extends object>(o: T, k: string | symbol) {
            let l = Reflect.get(o, k)
            if ((typeof l) == 'object' && Object.getPrototypeOf(l).isProxy != true) {
                Reflect.set(o, k, new Proxy(l, Handler))
            }
        }
        return new Proxy<T>(obj, Handler)
    } else {
        type k = keyof T;
        return new Proxy(obj, {
            getPrototypeOf(proto) {
                return { proto, isProxy: true }
            },
            get: (o, k) => Reflect.get(o, k),
            set(o, k, v) {
                Reflect.set(o, k, v)
                callback(obj)
                return true;
            }
        })
    }
}