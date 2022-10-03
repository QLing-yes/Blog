<script lang="ts" setup>
import { provide } from 'vue'
import layout_1 from '@/layout/1.vue'
import start from '@/components/start.vue'
import Sidebar from '@/components/Sidebar.vue'
import StatusBar from '@/components/StatusBar.vue'
import Notice from '@/components/Notice.vue'
import echarts from '@/components/echarts/echarts.vue'
import focus from '@/components/focus.vue'
import List from '@/components/List.vue'

const isPC = matchMedia('(min-width: 768px)').matches
provide('isPC', isPC)
// inject('isPC')
</script>

<template>
  <main role="main" class="main">
    <start></start>
    <layout_1>
      <template #statusBar>
        <StatusBar></StatusBar>
      </template>
      <template #Sidebar>
        <Sidebar></Sidebar>
      </template>
      <template #T>
        <focus></focus>
      </template>
      <template #L>
        <echarts></echarts>
      </template>
      <template #R>
        <Notice></Notice>
      </template>
      <List></List>
    </layout_1>
  </main>
</template>

<style lang="scss" scoped>
// @media (max-width: 768px) {
// }
.main {
  contain: content;
  width: 100%;
  background-color: #f1f2f9;
}
</style>
