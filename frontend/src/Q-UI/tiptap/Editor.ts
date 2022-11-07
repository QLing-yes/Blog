import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import type { EditorOptions } from '@tiptap/vue-3'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Blockquote from '@tiptap/extension-blockquote'
import image from '@tiptap/extension-image'
import Code from '@tiptap/extension-code'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import Link from '@tiptap/extension-link'
import Dropcursor from '@tiptap/extension-dropcursor'
import Typography from '@tiptap/extension-typography'
lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

export let options: Partial<EditorOptions> | undefined = {
    // extensions: [Document, Paragraph, Text],
    extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        BulletList,
        OrderedList,
        TaskList,
        TaskItem.configure({
            nested: true,
        }),
        HorizontalRule,
        Blockquote,
        Code.configure({
            HTMLAttributes: {
                class: 'code',
            },
        }),
        /** 代码块弱光 */
        CodeBlockLowlight.configure({
            lowlight,
            /** 语言前缀 */
            // languageClassPrefix: 'language-',
            /** 默认语言 */
            defaultLanguage: 'ts',
        }),
        Link.configure({
            openOnClick: false,
            linkOnPaste: true,
            autolink: true,
            /** 链接验证 */
            // validate: href => /^(http|https):\/\//.test(href),
        }),
        image.configure({
            inline: true,
            allowBase64: false,
            HTMLAttributes: {
                class: 'tiptapImg',
                loading: "lazy",
                decoding: "async"
            }
        }),
        Dropcursor.configure({
            // color: '#e85d5d',
            width: 2,
        }),
        Typography,
    ],
    content: '',
    autofocus: true,
    editable: true,
    injectCSS: false,
}