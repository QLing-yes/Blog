import anime from 'animejs'

let { abs, trunc, PI } = Math;
type target = string | HTMLElement;
type transition = { top: number, left: number };
//获取子元素在滚动区域的静止位置
function getElementTL(_parent: HTMLElement, _sub: HTMLElement): transition {
    const parent = _parent.getBoundingClientRect();
    const sub = _sub.getBoundingClientRect();
    return {
        top: abs(parent.top - sub.top - _parent.scrollTop),
        left: abs(parent.left - sub.left - _parent.scrollLeft),
    }
}
//滚动条位置
function getOffset(el: HTMLElement): transition {
    return {
        top: el.scrollTop,
        left: el.scrollLeft
    }
}
//获取HTMLElement
function getElement(el: target) {
    return (el instanceof HTMLElement ? el : document.querySelector(el) as HTMLElement);
}
/**
 * 滚动条滚动过渡
 * @param el 父元素
 * @param target 子元素 | css选择器 | [x,y]
 * @param duration 持续时间
 */
export function $scrollTo(el: target, target: target | [number, number], duration?: number) {
    if (el && target) {
        el = getElement(el);
        let start = getOffset(el);

        let to = Array.isArray(target) ?
            {
                left: target[0],
                top: target[1]
            } :
            getElementTL(el, getElement(target));

        //npm animejs
        anime({
            targets: start,
            ...to,
            duration: duration || 500,
            easing: 'linear',
            update() {
                (el as HTMLElement).scrollTo(start);
            },
        })
    }
}
/**
 * 使用滚轮和拖拽 滚动内容
 */
export function catchScroll(el: HTMLElement, to?: 'top' | 'left', destroy?: (e: Function) => void) {
    let startX: number, startY: number;
    let options = { passive: false };
    el.addEventListener('wheel', wheel, options);
    el.addEventListener('mousedown', drag, options);
    destroy?.(Destroy);
    //拖拽
    function drag(e: MouseEvent) {
        if (e.button <= 1) {
            e.preventDefault();
            startX = e.offsetX;
            startY = e.offsetY;
            el.addEventListener('mousemove', move);
            el.addEventListener('mouseup', stop);
            el.addEventListener('mouseleave', stop);
        }
    }
    function move(e: MouseEvent) {
        el.scrollTo({ top: el.scrollTop - (e.offsetY - startY), left: el.scrollLeft - (e.offsetX - startX) });
    }
    function wheel(e: WheelEvent) {
        e.preventDefault();
        if (to == 'top') el.scrollTo({ top: el.scrollTop + e.deltaY });
        else if (to == 'left') el.scrollTo({ left: el.scrollLeft + e.deltaY });
        else el.scrollTo({ top: el.scrollTop + e.deltaY, left: el.scrollLeft + e.deltaY });
    }
    //释放资源
    function stop() {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseup', stop);
        el.removeEventListener('mouseleave', stop);
    }
    function Destroy() {
        el.removeEventListener('wheel', wheel);
        el.removeEventListener('mousedown', drag);
    }
}