import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import type { EditorOptions } from '@tiptap/vue-3'

export let options: Partial<EditorOptions> | undefined = {
    // extensions: [Document, Paragraph, Text],
    extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        })
    ],
    content: '<p>Example</p>',
    autofocus: true,
    editable: true,
    injectCSS: false,
}