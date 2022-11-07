<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import tab from './tab.vue'
import { tabList } from './tabList'

type prop = {
  editor: Editor
}

const props = defineProps<prop>()
const _tablist = tabList(props.editor)
</script>

<template>
  <div class="but" editor v-for="list in _tablist">
    <!-- 菜单 -->
    <tab :now="
      item.name
        ? props.editor.isActive(item.name, item.attributes)
        : item.attributes
          ? props.editor.isActive(item.attributes || {})
          : false
    " v-bind="item.attr" @click="item.event?.()" v-for="item in list">
      <!-- 弹出菜单 -->
      <template v-if="!item.name && item.list">
        <tab :now="
          popup.name
            ? props.editor.isActive(popup.name, popup.attributes)
            : popup.attributes
            ? props.editor.isActive(popup.attributes || {})
            : false
        " v-bind="popup.attr" @click="popup.event?.()" v-for="popup in item.list"></tab>
      </template>
    </tab>
  </div>
</template>

<style scoped lang="scss">
@mixin cBut() {
  color: #ffffff;
  background-color: #0d0d0d;
}

$h: 28px;

.but {
  $t: 5.5px;
  box-shadow: $t + 3px 0px 0px $t * -1 #e5e5e5;
  margin-right: 3px;
}

div,
span {
  display: flex;
}
</style>
