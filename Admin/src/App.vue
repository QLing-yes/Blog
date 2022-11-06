<script setup lang="ts">
import Layout1 from '@/Q-UI/Layout/1.vue'
import sidebar from '@/components/Layout/sidebar/sidebar.vue'
import navBar from '@/components/Layout/navBar/navBar.vue'
import { provide, ref } from 'vue'
const isPC = matchMedia('(min-width: 769px)').matches
provide('isPC', isPC)
const fold = ref(false)
</script>

<template>
  <main class="main">
    <Layout1 h="30px" w="unset">
      <template #navBar>
        <navBar @fold="fold = !fold"></navBar>
      </template>
      <template #sidebar>
        <sidebar class="noPC" :isCollapse="fold"></sidebar>
        <el-drawer
          :custom-class="mod.drawer"
          modal-class="yesPC"
          :model-value="fold"
          direction="ltr"
          :show-close="false"
          :with-header="false"
          append-to-body
        >
          <sidebar :isCollapse="false"></sidebar>
        </el-drawer>
      </template>
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </Layout1>
  </main>
</template>
<style module="mod">
.drawer {
  width: 230px !important;
}
</style>
<style scoped lang="scss">
.main {
  background-color: rgb(255, 255, 255);
  width: 100%;
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
