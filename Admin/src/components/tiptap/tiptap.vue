<script lang="ts" setup>
import menus from './menus.vue'

import { nextTick, onBeforeUnmount, ref } from 'vue'
// import { Editor } from '@tiptap/core'
import { useEditor, Editor, EditorContent } from '@tiptap/vue-3'
import { options } from '@/components/tiptap/Editor'

let editor: Editor = new Editor({
  ...options,
})

onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<template>
  <div class="tiptap">
    <div class="menus">
      <menus :editor="editor"></menus>
    </div>
    <div class="content">
      <EditorContent :editor="editor" class="editor" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.editor {
  flex: 1;
  background-color: aliceblue;
}
.tiptap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  & > .menus {
    display: flex;
    height: 40px;
    align-items: center;
    background-color: #ffffff;
    // background-color: #e9ecf4;
    overflow-x: scroll;
    overflow-y: hidden;
    // contain: strict;
  }
  & > .content {
    display: flex;
    flex: 1;
    justify-content: center;
    background-color: blueviolet;
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
