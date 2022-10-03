<script lang="ts" setup>
import type { menu, menu_item } from './subSidebar'
import subSidebar from './subSidebar.vue'
import { State } from '@/models/State/State'

type props = {
  list: menu
  breadcrumb?: menu_item[]
  mark?: string
}
const props = defineProps<props>()

function itemIndex(
  item: menu_item,
  i: string | number,
  mark?: string,
  breadcrumb?: menu_item[],
) {
  let { index } = item
  index = index || _index(i, mark)
  //建立面包屑导航表
  if (breadcrumb) State.breadcrumbGather[index] = [...breadcrumb, item]
  return index
}
function _index(i: string | number, mark?: string) {
  return (mark || '') + '-' + i
}
function _breadcrumb(item: menu_item, breadcrumb?: menu_item[]) {
  return breadcrumb ? [...breadcrumb, item] : [item]
}
</script>

<template>
  <template v-for="(item, i) in list">
    <!-- 子菜单 -->
    <el-sub-menu v-if="item.sub" :index="_index(i, mark)">
      <template #title>
        <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
        <span>{{ item.title }}</span>
      </template>
      <subSidebar
        :breadcrumb="_breadcrumb(item, breadcrumb)"
        :list="item.sub"
        :mark="_index(i, mark)"
      ></subSidebar>
    </el-sub-menu>
    <!-- 分组 -->
    <el-menu-item-group v-else-if="item.group" :title="item.title">
      <subSidebar
        :breadcrumb="_breadcrumb(item, breadcrumb)"
        :list="item.group"
        :mark="_index(i, mark)"
      ></subSidebar>
    </el-menu-item-group>
    <!-- 项目 -->
    <el-menu-item
      v-else
      :index="itemIndex(item, i, mark, breadcrumb)"
      @click="item.click?.($event, item)"
    >
      <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
      <template #title>
        <span>{{ item.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
