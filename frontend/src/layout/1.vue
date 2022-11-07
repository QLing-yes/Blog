<script lang="ts" setup>
import { computed, inject, ref } from 'vue'

type prop = {
  /** 主题色 */
  color?: string
  /** 关闭面板? */
  no_panel?: boolean
  /** 展开侧边栏? */
  unfold?: boolean
}

const props = defineProps<prop>()
const _color = computed(() => props.color || '#fff')
// const unfold = ref(matchMedia('(min-width: 768px)').matches) //侧边栏默认展开?
const emit = defineEmits<{
  (e: 'unfold', unfold: boolean): void
}>()

function _unfold(e: boolean) {
  // unfold.value = e
  emit('unfold', e)
}
</script>

<template>
  <div class="statusBar sticky" v-bind="$attrs">
    <slot name="statusBar"></slot>
  </div>
  <div class="box">
    <!-- 侧边栏 -->
    <div class="Sidebar" :class="unfold ? '' : 'SidebarFolding'">
      <div>
        <slot name="Sidebar"></slot>
      </div>
      <div @click="_unfold(!unfold)">⋛</div>
    </div>
    <div class="Content">
      <!-- 面板 -->
      <div class="panel" v-if="!no_panel">
        <div class="T">
          <slot name="T"></slot>
        </div>
        <div class="LR">
          <div>
            <slot name="L"></slot>
          </div>
          <div>
            <slot name="R"></slot>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$r: 10px;
$gap: 12px;
$max-height: 100vh;

.statusBar {
  flex-direction: column;
  // min-height: $gap;
  margin: $gap;
  margin-top: calc($gap / 2);
  margin-bottom: calc($gap / 2);
  z-index: 999;
}

.box {
  min-height: 100vh;
}

$w: 280px;

.Sidebar {
  z-index: 1;
  width: $w;
  max-height: calc($max-height - ($gap * 3));
  position: sticky;
  top: $gap * 2;
  margin-left: $gap;
  transition: margin-left 0.4s;

  // will-change: margin-left;
  &>div:nth-of-type(1) {
    overflow: auto;
    flex: 1;
    padding: 20px;
    border-radius: $r;
    flex-direction: column;
    background-color: v-bind('_color');
  }

  &>div:nth-of-type(2) {
    user-select: none;
    cursor: pointer;
    position: absolute;
    right: -25px;
    // margin-right: calc($gap / 2);
    width: 25px;
    height: 55px;
    border-radius: 0px 8px 8px 0px;
    background: linear-gradient(270deg, #4dabf7, v-bind('_color'));
    margin-top: 28.5vh;
    align-items: center;
    justify-content: center;
    color: rgba($color: #000000, $alpha: 0.7);
  }
}

.SidebarFolding {
  margin-left: $w * -1 !important;
  // background-color: brown !important;
}

.Content {
  transition: all 0.4s;
  flex-direction: column;
  flex: 1;
  margin: 0px $gap 0px $gap;
  // margin: 0px $gap 0px calc($gap / 2);
  // margin-top: $gap;
}

.panel {
  flex-direction: column;
  height: calc($max-height - ($gap * 3));
  // margin-bottom: $gap;
}

.T {
  background-color: v-bind('_color');
  margin-bottom: $gap;
  flex: 0.5;
  border-radius: $r;
}

.LR {
  flex: 1;
  flex-direction: row;

  &>div:nth-of-type(1) {
    flex: 1;
    margin-right: $gap;
    background-color: v-bind('_color');
    border-radius: $r;
    justify-content: center;
    contain: size paint;
  }

  &>div:nth-of-type(2) {
    flex: 0.5;
    background-color: v-bind('_color');
    border-radius: $r;
  }
}

@media (max-width: 768px) {
  .panel {
    height: initial;
  }

  .T {
    order: 1;
  }

  .LR {
    order: 0;
    flex-direction: column;

    &>div:nth-of-type(1) {
      min-height: 33vh;
      order: 1;
      margin-bottom: $gap;
      margin-right: 0px;
    }

    &>div:nth-of-type(2) {
      order: 0;
      margin-bottom: $gap;
    }
  }
}
</style>
