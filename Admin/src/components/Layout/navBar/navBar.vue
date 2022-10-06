<script setup lang="ts">
import { Fold } from '@element-plus/icons-vue'
import { Fullscreen } from '@/Q-UI/tools/browser'
import breadcrumb from '@/components/Layout/breadcrumb/breadcrumb.vue'
import { computed, inject, provide, ref, type InjectionKey } from 'vue'
import type { menu_item } from '../subSidebar/subSidebar'
import { State,getBreadcrumb } from '@/models/State/State'
import { useRouter } from 'vue-router'
type emit = {
  (e: 'fold'): void
}

const { push } = useRouter()
const emit = defineEmits<emit>()
const isFullscreen = ref(!!document.fullscreenElement)
const closable = computed(() => State.tagPages.value.length-1 > 0)

function _Fullscreen() {
  isFullscreen.value = Fullscreen()
}
function closeTag(key:number) {
 const tags = State.tagPages.value;
 const item = tags.splice(key,1)[0];

 if(Current()?.index == item.route){
    if (!tags.length) return;
    if(key-1>=0) push(tags[key-1].route);
    else if(key < tags.length) push(tags[key].route);
    else if(tags.length == 1) push(tags[0].route);
    else push('/');
 }

}
function Current() {
  return getBreadcrumb().at(-1)
}
</script>

<template>
  <div class="navBar noSelect">
    <header class="header">
      <el-icon class="Fold hover" size="20px" @click="emit('fold')">
        <Fold />
      </el-icon>
      <breadcrumb :list="getBreadcrumb()"></breadcrumb>
      <div class="R">
        <span class="Fullscreen hover" @click="_Fullscreen">
          {{ isFullscreen ? '\ue8fb' : '\ue8fa' }}
        </span>
      </div>
    </header>
    <div class="tabs">
      <el-tag
        draggable="true"
        :closable="closable"
        class="tag"
        @click="push(item.route)"
        @close="closeTag(i)"
        :type="Current()?.index == item.route ? 'success' : ''"
        v-for="(item, i) in State.tagPages.value"
      >
        {{ item.name }}
      </el-tag>
    </div>
  </div>
</template>

<style scoped lang="scss">
.Fullscreen {
  font-size: 20px;
  height: 100%;
}
.R {
  width: 100%;
  height: 100%;
  flex-direction: row-reverse;
  align-items: center;
}
.Fold {
  height: 100%;
  transition: all 0.3s;
  color: rgb(37, 37, 37);
}
.hover {
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
.header {
  display: flex;
  height: 50px;
  align-items: center;
}
.tabs {
  align-items: center;
  height: 31px;
  padding-left: 10px;
  padding-right: 10px;
  $border: 1px solid rgba(214, 214, 214, 0.4);
  border-top: $border;
  border-bottom: $border;
  contain: strict;
  overflow: auto;
  & > .tag {
    cursor: pointer;
    margin-right: 10px;
  }
}
.navBar {
  flex-direction: column;
  flex: 1;
  background-color: rgb(255, 255, 255);
}
div,
span {
  display: flex;
}
</style>
