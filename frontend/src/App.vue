<script lang="ts" setup>
import { nextTick, onMounted, provide, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import layout_1 from '@/layout/1.vue'
import start from '@/components/start.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import StatusBar from '@/components/StatusBar.vue'
import Notice from '@/components/Notice.vue'
import echarts from '@/components/echarts/echarts.vue'
import focus from '@/components/focus.vue'
import { unfold } from '@/models/State/State';

const isPC = matchMedia('(min-width: 768px)').matches;
provide('isPC', isPC);
// const route = useRoute()
const router = useRouter()

const path = ref('')

router.beforeEach((to, from, next) => {
  path.value = to.path;
  next()
})
</script>

<template>
  <main role="main" class="main">
    <start></start>
    <layout_1 :unfold="unfold" @unfold="unfold = $event" :no_panel="path != '/'">
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
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
          <!-- <List v-else-if="route.path == '/'"></List> -->
          <!-- <span v-else>待定...</span> -->
        </transition>
      </router-view>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
