<script lang="ts" setup>
import menus from './menus.vue'

import { nextTick, onBeforeUnmount, ref } from 'vue'
// import { Editor } from '@tiptap/core'
import { useEditor, Editor, EditorContent } from '@tiptap/vue-3'
import { options } from '@/components/tiptap/Editor'

const editor: Editor = new Editor({
  ...options,
})
defineExpose({
  editor,
})
onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<template>
  <div class="tiptap">
    <div class="head">
      <div class="menus">
        <menus :editor="editor"></menus>
      </div>
    </div>
    <div class="content">
      <EditorContent :editor="editor" class="editor" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.head {
  position: fixed;
  width: 100%;
}
.menus {
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  // overflow-x: scroll;
  // overflow-y: hidden;
  contain: size layout;
}
.editor {
  flex: 1;
  &:deep(.ProseMirror) {
    outline: none;
  }
}
.tiptap {
  display: flex;
  flex-direction: column;
  position: relative;
  & > .content {
    margin-top: 40px;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    overflow: auto;
  }
}

::-webkit-scrollbar {
  width: 3px;
  height: 4px;
}
::-webkit-scrollbar-thumb {
  background-color: #0088ff6a;
  border-radius: 4px;
}
@media (max-width: 750px) {
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
</style>
