import * as renderers from 'echarts/renderers'
import echarts from "./lib";
import { debounce } from '../tools/tools';
import type { EChartsOption } from 'echarts';

type renderers = keyof typeof renderers
type theme = 'light' | 'dark' | 'default'

const low = debounce()
/**
 * 一些自动化功能封装
 * @param el 
 * @param option 
 * @param renderer 
 * @param theme 
 * @returns echarts
 */
export function useChart(el: HTMLElement, option: EChartsOption, renderer?: renderers, theme?: theme) {

    echarts.use(renderers[renderer || 'SVGRenderer']);
    const Chart: echarts.ECharts = echarts.init(el, theme);
    Chart.setOption(option)

    queueMicrotask(() => {
        let stop = autoUpdateRect(el, Chart);
        autoDispose(el, Chart, () => {
            Chart.dispose();
            stop();
            return;
        })
    })

    return Chart;
}
// showLoading()//显示图表加载
// hideLoading()//隐藏图表加载
// dispose()//销毁实列
//调整图表大小
function Resize(Chart: echarts.ECharts) {
    low(() => {
        Chart.resize({
            'animation': {
                'duration': 300,
                'easing': 'linear'
            }
        })
    }, 400)
}
//自动更新图表矩形边框
function autoUpdateRect(el: HTMLElement, Chart: echarts.ECharts) {
    const o = new ResizeObserver((e) => { Resize(Chart) });
    o.observe(el.parentElement as HTMLElement);
    let foo = () => {
        Resize(Chart)
    }
    let stop = () => {
        o.disconnect();
        window.removeEventListener('resize', foo);
    }
    window.addEventListener('resize', foo)

    return stop;
}
//当前容器移除时自动销毁(前提父容器还在)
function autoDispose(el: HTMLElement, Chart: echarts.ECharts, stop: Function) {
    if (!el.parentNode) return;
    const M = new MutationObserver((e) => {
        e.map(v => {
            let l = v.removedNodes.length
            if (l) {
                for (let i = 0; i < l; i++) {
                    if (v.removedNodes.item(i) === el) {
                        M.disconnect();
                        stop()
                        return;
                    }
                }
            }
        })
    });
    M.observe(el.parentNode, { childList: true });
}

export { echarts }