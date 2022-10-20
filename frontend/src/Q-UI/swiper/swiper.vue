<script setup lang="ts">
import { Bezier, catchScroll } from '../tools/browser'
import { nextTick, ref } from 'vue'
type transition = { top: number; left: number }
type El = HTMLElement | Element
type prop = {
  item: number
  catch?: boolean
  iscycle?: boolean
}

const _root = ref<El>()
const trigger1 = ref<El>()
const trigger2 = ref<El>()
const List = ref<El[]>()
const props = defineProps<prop>()

nextTick(() => {
  if (props.item > 1) {
    
    if (props.iscycle) {
      let look = new IntersectionObserver(cycle, {
        root: _root.value,
        threshold: [0.51],
      })
      look.observe(trigger1.value!)
      look.observe(trigger2.value!)
    }

    if (props.catch) {
      catchScroll(_root.value! as HTMLElement, 'left')
    }
  }
})
//循环滚动
function cycle(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) {
  entries.forEach((e) => {
    if (!(e.intersectionRatio > 0)) return
    if (e.target == trigger1.value) {
      toEl(_root.value!, List.value![List.value!.length - 1], false)
    }
    if (e.target == trigger2.value) {
      toEl(_root.value!, List.value![0], false)
    }
  })
}
//获取子元素相对滚动区域的静止位置
function getElementTL(_parent: El, _sub: El): transition {
  const parent = _parent.getBoundingClientRect()
  const sub = _sub.getBoundingClientRect()
  return {
    top: Math.abs(parent.top - sub.top - _parent.scrollTop),
    left: Math.abs(parent.left - sub.left - _parent.scrollLeft),
  }
}
//滚动条位置
function getOffset(el: El): transition {
  return {
    top: el.scrollTop,
    left: el.scrollLeft,
  }
}
// 滚动到元素
function toEl(_parent: El, _sub: El, b = true) {
  const parentTL = getOffset(_parent)
  const subTL = getElementTL(_parent, _sub)
  if (b) {
    Bezier.Anima((v: number) => _parent.scrollTo({ left: v }), 800, [
      parentTL.left,
      subTL.left,
    ])
  } else {
    _parent.scrollTo(subTL)
  }
}
function toIndex(i: number) {
  if (i < List.value!.length && i > -1) toEl(_root.value!, List.value![i])
}
defineExpose({
  toIndex,
})
</script>

<template>
  <div class="carousel" ref="_root">
    <div v-if="item > 1 && iscycle" ref="trigger1">
      <slot :name="'el' + item">trigger1</slot>
    </div>
    <div v-for="i in item" ref="List">
      <slot :name="'el' + i">{{ i }}</slot>
    </div>
    <div v-if="item > 1 && iscycle" ref="trigger2">
      <slot :name="'el' + 1">trigger2</slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel {
  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
  & > div {
    min-width: 100%;
  }
  & > div:nth-of-type(2) {
    left: 0px;
  }
}
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
div {
  display: flex;
}
</style>
