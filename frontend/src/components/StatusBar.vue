<script lang="ts" setup>
import { $scrollTo } from '@/Q-UI/tools/anima'
import { inject, ref } from 'vue'

const winEl = inject('isPC') ? document.documentElement : document.body
const html = document.documentElement
const progress = ref(0 + '%')
let p: string
let logo = ['\ue649', '\ue600', '\ue722']

loopAnima()
//进度条
function loopAnima() {
  p = getProgress2(html) + '%'
  if (p != progress.value) progress.value = p
  requestAnimationFrame(loopAnima)
}
function getProgress(el: HTMLElement) {
  return ((el.scrollTop + el.clientHeight) / el.scrollHeight) * 100
}
function getProgress2(el: HTMLElement) {
  const Rect = el.getBoundingClientRect()
  return ((Math.abs(Rect.top) + el.clientHeight) / Rect.height) * 100
}
function toTop() {
  $scrollTo(winEl, [0, 0])
}
</script>

<template>
  <div class="progress"></div>
  <div class="StatusBar shadow" v-bind="$attrs">
    <div class="L">
      <span class="logo" icon v-for="item in logo">{{ item }}</span>
    </div>
    <div class="C"></div>
    <div class="R">
      <span @click="toTop">&#xe605;</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  contain: strict;
  width: v-bind(progress);
  height: 2px;
  opacity: 0.8;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(134, 175, 232), #7117ea, #ea6060);
  transition: all 0.5s;
  margin-bottom: 1px;
}

.StatusBar {
  height: 10px;
  transition: all 0.35s;
  background: rgba(255, 255, 255, 0.25);
  padding-left: 5px;
  padding-right: 5px;
  contain: strict;
  &:hover {
    height: 30px;
  }
  &:hover > div > span,
  div {
    transform: scale(1);
  }
  & > div {
    flex: 1;
    align-items: center;
    font-size: 1.3em;
    & span,
    div {
      margin-right: 5px;
      justify-content: center;
      color: #4186f5;
      transform: scale(0.5);
      transition: all 0.35s;
      cursor: pointer;
      -webkit-user-drag: none;
      user-select: none;
    }
    & span:hover,
    div:hover {
      transform: scale(1.2);
    }
  }
}
// .L {
// }
.C {
  justify-content: center;
}
.R {
  flex-direction: row-reverse;
}
.shadow {
  border-radius: 10px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 0px 32px 0 rgba(31, 38, 135, 0.37);
}
</style>
