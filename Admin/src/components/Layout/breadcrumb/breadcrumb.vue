<script lang="ts" setup>
import type { menu_item } from '../subSidebar/subSidebar'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
type props = {
  list: menu_item[]
}

const props = defineProps<props>()
const { push } = useRouter()
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in list">
      <el-dropdown :disabled="!item.sub">
        <span class="title">
          {{ item.title }}
          <el-icon v-if="item.sub">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="sub in item.sub">
              <el-dropdown-item
                v-if="sub.index"
                @click="push(sub.index!)"
              >
                {{ sub.title }}
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
}
</style>
