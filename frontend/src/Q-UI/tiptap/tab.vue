<script lang="ts" setup>
import { computed } from 'vue'

type prop = {
  tip?: string //小提示内容
  more?: boolean //是否更多功能框
  placeX?: 'L' | 'C' | 'R' //弹出位置
  now?: boolean //选中?
  icon?: string//图标
}

const props = defineProps<prop>()
const Place = computed(() => {
  return foo(props.placeX)
})

function foo(x: prop['placeX']) {
  if (x == 'L') return '50%'
  if (x == 'C') return '0%'
  if (x == 'R') return '-50%'
  return '50%'
}
</script>

<template>
  <span
    :class="{ tip: !props.more, cBut: props.now }"
    :style="{ '--tip': props.tip }"
  >
    <!-- <slot></slot> -->
    {{ props.icon }}
    <!-- 弹出更多功能 -->
    <div class="more" v-if="props.more">
      <slot></slot>
    </div>
  </span>
</template>

<style scoped lang="scss">
@mixin cBut() {
  color: #ffffff;
  background-color: #0d0d0d;
}
$h: 28px;
span {
  margin-left: 1px;
  margin-right: 1px;
  width: $h;
  height: $h;
  border-radius: 6px;
  transform: all 0.35s;
  align-items: center;
  justify-content: center;
  & > .more {
    min-height: 30px;
    min-width: 30px;
    max-height: 30vw;
    max-width: 30vw;
    padding: 6px;
    position: absolute;
    margin-top: $h;
    transform: translateX(v-bind(Place)) translateY(50%); //控制弹出位置
    visibility: hidden;
    color: #000000;
    background-color: rgb(255, 255, 255);
    border: 1px solid #c5c5c5;
    box-shadow: 0px 0px 8px -4px #000000;
    border-radius: 6px;
    flex-wrap: wrap;
  }
  &:hover {
    @include cBut();
    & > .more {
      visibility: visible;
    }
  }
}
.cBut {
  @include cBut();
}
.tip:hover {
  &::before {
    content: var(--tip);
    font-weight: 500;
    font-size: 0.8em;
    color: #4e4e4e;
    border-radius: 2px;
    border: 1px solid #aeaeae;
    padding: 2px;
    background-color: rgb(255, 255, 255);
    position: absolute;
    margin-top: $h;
    transform: translateX(v-bind(Place)) translateY(50%); //控制弹出位置
  }
}
div,
span {
  display: flex;
}
</style>
