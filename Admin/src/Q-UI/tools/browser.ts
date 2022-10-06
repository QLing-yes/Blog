/** 全屏/退出 */
export function Fullscreen(El?: HTMLElement) {
    const l = document.fullscreenElement
    if (l) document.exitFullscreen()
    else (El || document.body).requestFullscreen()
    return !l
}
/** 拖动上传文件 */
export function getDragFiles(el: HTMLElement) {
    const options = { passive: false };
    function Cancel(e: Event) {
        e.stopPropagation()
        e.preventDefault()
    }
    function dragenter(e: DragEvent) {
        Cancel(e)
    }
    function dragover(e: DragEvent) {
        Cancel(e)
    }
    function drop(e: DragEvent) {
        Cancel(e)
        console.log(e.dataTransfer?.files)
        console.log(e.dataTransfer?.items)
    }

    el.addEventListener('dragenter', dragenter, options)
    el.addEventListener('dragover', dragover, options)
    el.addEventListener('drop', drop, options)
}

function Record<T extends Record<string, keyof FileReader>>(o: T) {
    return o
}
type files = HTMLInputElement['files']
type result = FileReader['result'][]
const ReadAs = Record({
    Buffer: 'readAsArrayBuffer',
    Binary: 'readAsBinaryString',
    Base64: 'readAsDataURL',
    Text: 'readAsText',
})
export type ev = { files: File[] | null; result: result | null }
/**转换input选择的文件
 * @param El input文件类型元素
 * @param readAs 到数据类型
 * @param cb result[]值等于null表示转换失败
 */
export function getFile(
    El: HTMLInputElement,
    readAs: keyof typeof ReadAs,
    cb: (ev: ev) => void,
) {
    El.addEventListener('change', change, false)
    function change(e: Event) {
        const el = e.target as HTMLInputElement
        const result: result = []
        if (!el.files) {
            cb({ files: null, result: null })
            return
        }
        
        const files = Array.from(el.files)
        let n = 0
        for (let i = 0; i < files.length; i++) {
            const Reader = new FileReader()
            Reader.onerror = (e) => {
                result[i] = null
            }
            Reader.onload = (e) => {
                if (e.target) result[i] = e.target.result
                else result[i] = null
            }
            Reader.onloadend = (e) => {
                ++n
                if (n == files.length) cb({ files, result })
            }
            Reader[ReadAs[readAs]](files[i])
        }
    }
}