/** 全屏/退出 */
export function Fullscreen(El?: HTMLElement) {
    const l = document.fullscreenElement
    if (l) document.exitFullscreen()
    else (El || document.body).requestFullscreen()
    return !l
}