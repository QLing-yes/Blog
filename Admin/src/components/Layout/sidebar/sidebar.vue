<script lang="ts" setup>
import { ref } from 'vue'
import subSidebar from '../subSidebar/subSidebar.vue'
import type { MenuItemClicked } from 'element-plus'
import { menuList, active } from './menuList'

type props = {
  isCollapse?: boolean
  mode?: 'horizontal' | 'vertical'
}

const props = defineProps<props>()

function Select(index: string, indexPath: string[], item: MenuItemClicked) {
  // console.log(index, indexPath, item)
}
function Open(key: string, keyPath: string[]) {
  // console.log(key, keyPath)
}
function Close(key: string, keyPath: string[]) {
  // console.log(key, keyPath)
}
</script>

<template>
  <el-menu
    class="el-menu-vertical"
    :default-active="active"
    :mode="mode || 'vertical'"
    :unique-opened="true"
    :collapse="isCollapse"
    @select="Select"
    @open="Open"
    @close="Close"
  >
    <subSidebar :list="menuList"></subSidebar>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu-vertical {
  overflow-y: auto;
  &:not(.el-menu--collapse) {
    width: 210px;
  }
}
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
