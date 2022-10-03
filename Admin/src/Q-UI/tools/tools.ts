/**
 * 定时器 - 基于requestAnimationFrame
 * @param callback 回调
 * @param n ms
 * @param repeat 是否循环
 * @returns 立即停止函数stop
 */
export function $Timing(callback: Function, n: number, repeat?: boolean) {
    let endTime = Date.now() + n
    let id: number | null;
    let down
    function stop() { id && cancelAnimationFrame(id) }
    function foo() {
        down = (endTime - Date.now()) / 1000
        if (down <= 0) {
            if (!repeat) {
                stop()
                callback()
                return
            } else endTime = Date.now() + n
            callback()
        }
        id = requestAnimationFrame(foo)
    }
    queueMicrotask(foo)
    // foo()
    return stop
}
/**
 * 持续执行器 - 基于requestAnimationFrame
 * @param duration ms
 * @param callback 回调入参百分比
 * @returns 立即停止函数stop
 */
export function CountAnimaFrame(callback: (e: number) => void, duration: number) {
    const endTime = Date.now() + duration;
    let id: number | null;
    function stop() { id && cancelAnimationFrame(id) }
    function foo() {
        const now = endTime - Date.now();
        callback((duration - now) / duration)
        if (now <= 0) {
            stop()
            return;
        }
        id = requestAnimationFrame(foo)
    }
    queueMicrotask(foo)
    // foo()
    return stop;
}
type tween = keyof typeof Bezier.tween
/**
 * 贝塞尔
 */
export class Bezier {
    static readonly tween = {
        // t:百分比0-1; a:多阶贝塞尔参数;
        1: (t: number, ...a: number[]) => a[0] + (a[1] - a[0]) * t,
        2: (t: number, ...a: number[]) => ((1 - t) * (1 - t)) * a[0] + 2 * t * (1 - t) * a[1] + t * t * a[2],
        3: (t: number, ...a: number[]) => a[0] * (1 - t) * (1 - t) * (1 - t) + 3 * a[1] * t * (1 - t) * (1 - t) + 3 * a[2] * t * t * (1 - t) + a[3] * t * t * t,
    }
    /**
     * 双值坐标
     * @param callback 回调入参计算后的贝塞尔值
     * @param duration 持续时间
     * @param x 多阶贝塞尔x参数
     * @param y 多阶贝塞尔y参数
     */
    static AnimaXY(callback: (x: number, y: number) => void, duration: number, x: number[], y: number[]) {
        const xi = x.length, yi = y.length;
        if (!(xi == yi && xi > 1 && xi < 5)) {
            console.error('Bezier.Anima函数的参数3或4的数组长度需在2-4范围');
            return;
        }
        const tween = this.tween[xi - 1 as tween];
        CountAnimaFrame((t) => {
            callback(tween(t, ...x), tween(t, ...y))
        }, duration)
    }
    /**
     * 单值 (同AnimaXY函数)
     * @param callback 回调入参计算后的贝塞尔值
     * @param duration 持续时间
     * @param a 多阶贝塞尔参数
     */
    static Anima(callback: (v: number) => void, duration: number, a: number[]) {
        const i = a.length;
        if (!(i >= 2)) {
            console.error('Bezier.Anima函数的参数3的数组长度需在2-3范围');
            return;
        }
        const tween = this.tween[i - 1 as tween];
        CountAnimaFrame((t) => {
            callback(tween(t, ...a))
        }, duration)
    }
}

/** 防抖 */
export function debounce() {
    let timer: any = undefined
    return (callback: Function, wait = 400) => {
        clearTimeout(timer)
        timer = setTimeout(callback, wait)
    }
}
/** 类型判断 */
function isType(obj: any) {
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