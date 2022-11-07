import type { Editor } from "@tiptap/vue-3";
type list = {
    name?: string //Active 菜单名称
    attributes?: {} //Active 属性选项
    attr: {
        tip?: string //小提示内容
        more?: boolean //是否更多功能框
        placeX?: 'L' | 'C' | 'R' //弹出位置
        now?: boolean //选中?
        icon?: string//图标
    },
    event?: () => void
    list?: list[]
}
export function tabList(editor: Editor): list[][] {
    let tab = []
    tab.push([
        {
            name: 'bold',
            attr: {
                tip: "'加粗'",
                icon: '\ue602',
            },
            event() {
                editor.chain().focus().toggleBold().run()
            },
        },
        {
            name: 'italic',
            attr: {
                tip: "'倾斜'",
                icon: '\ue61f',
            },
            event() {
                editor.chain().focus().toggleItalic().run()
            },
        },
        {
            name: 'underline',
            attr: {
                tip: "'下划线'",
                icon: '\ue70b',
            },
            event() {
                editor.chain().focus().toggleUnderline().run()
            },
        },
        {
            name: 'strike',
            attr: {
                tip: "'删除线'",
                icon: '\ue708',
            },
            event() {
                editor.chain().focus().toggleStrike().run()
            },
        },
        {
            name: 'code',
            attr: {
                tip: "'代码'",
                icon: '\ue606',
            },
            event() {
                editor.chain().focus().toggleCode().run()
            },
        },
    ])
    tab.push([
        {
            attr: {
                icon: '\ue617',
                more: true
            },
            list: Heading(editor)
        },
        {
            attr: {
                tip: "'重置样式'",
                icon: '\ue60f',
            },
            event() {
                editor.commands.unsetAllMarks()
            },
        },
    ])
    tab.push([
        {
            attr: {
                icon: '\ue711',
                more: true
            },
            list: Align(editor)
        },
    ])
    tab.push([
        {
            name: '',
            attr: {
                tip: "'分割线'",
                icon: '\ue640',
            },
            event() {
                editor.commands.setHorizontalRule()
                // editor.chain().focus().setHorizontalRule().run()
            },
        },
        {
            attr: {
                icon: '\ue624',
                tip: "'清单列表'",
                more: true
            },
            list: ListItem(editor)
        },
    ])
    tab.push([
        {
            name: 'blockquote',
            attr: {
                icon: '\ue611',
                tip: "'引用'",
            },
            event() {
                editor.commands.toggleBlockquote()
            }
        },
        {
            name: 'codeBlock',
            attr: {
                icon: '{ }',
                tip: "'代码块'",
            },
            event() {
                editor.commands.toggleCodeBlock()
            }
        },
        {
            name: 'link',
            attr: {
                icon: '\ue627',
                tip: "'取消超链接'",
            },
            event() {
                editor.commands.unsetLink()
            }
        },
        {
            name: 'image',
            attr: {
                icon: '\ue8ba',
                tip: "'图片'",
            },
            event() {
                const url = window.prompt('URL:(http或https)最大长度200')
                const reg = new RegExp(/[^http?:\/\/]|[^https?:\/\/]/);
                if (reg.test(url || '')) {
                    editor.commands.setImage({ src: url! })
                }
                else {
                    alert("URL过长或不规范");
                }
            }
        },
    ])
    return tab;
}

/** 列表清单 */
function ListItem(editor: Editor) {
    let icon = ['\ue624', '\ue626', '\ue628']
    let name = ['bulletList', 'orderedList', 'taskList']
    let tip = ["无序列表", "有序列表", "任务列表"]
    let f = [() => { editor.commands.toggleBulletList() }, () => { editor.commands.toggleOrderedList() }, () => { editor.commands.toggleTaskList() }]

    let list: list[] = []
    for (let i = 0; i < icon.length; i++) {
        list.push({
            name: name[i],
            attr: {
                tip: tip[i],
                icon: icon[i],
            },
            event() {
                f[i]()
            },
        },)
    }
    return list;
}
/** 对齐方式 */
function Align(editor: Editor) {
    let icon = ['\ue712', '\ue711', '\ue715']
    let name = ['left', 'center', 'right']
    let list: list[] = []
    for (let i = 0; i < icon.length; i++) {
        let attr = { textAlign: name[i] };
        list.push({
            attributes: attr,
            attr: {
                tip: "'" + name[i] + "'",
                icon: icon[i],
            },
            event() {
                editor.chain().focus().setTextAlign(name[i]).run()
            },
        })
    }
    return list;
}
/** h1-h6 */
function Heading(editor: Editor) {
    let icon = ['\ue613', '\ue719', '\ue61a', '\ue618', '\ue60e', '\ue616']
    let list: list[] = []
    for (let i = 0; i < icon.length; i++) {
        let lv = { level: (i + 1) as any };
        list.push({
            name: 'heading',
            attributes: lv,
            attr: {
                tip: "'字号" + (i + 1) + "'",
                icon: icon[i],
            },
            event() {
                editor.chain().focus().toggleHeading(lv).run()
            },
        })
    }
    return list;
}