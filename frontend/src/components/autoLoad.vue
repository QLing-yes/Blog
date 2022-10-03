<script lang="ts" setup>
import { ref } from 'vue'
import { debounce } from '@/Q-UI/tools/tools'
const emit = defineEmits<{
  (e: 'load'): void
}>()

const look = new IntersectionObserver(load, { threshold: [0.3] })
const auto = ref<Element>()
let _debounce = debounce() //节流
let autoLoad = ref(false)

function load() {
  _debounce(() => {
    emit('load')
  }, 1000)
}
function toggle() {
  autoLoad.value = !autoLoad.value
  if (autoLoad.value) look.observe(auto.value!)
  else look.unobserve(auto.value!)
}
</script>
<template>
  <label class="load">
    <span @click="load">
      下一页
      <span class="auto" ref="auto" @click="toggle">
        {{ autoLoad ? 'Auto' : 'noAuto' }}
      </span>
    </span>
  </label>
</template>
<style lang="scss" scoped>
.load {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: antiquewhite;
  margin-top: 50px;
  margin-bottom: 50px;
  & span {
    display: flex;
  }
  & > span {
    width: 120px;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #d6d6d6;
    color: #d6d6d6;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    &:hover {
      $a: rgba(#20c997, 0.8);
      color: $a;
      box-shadow: 0px 0px 4px 0px $a;
    }
  }
  .auto {
    font-size: 0.5em;
    align-self: flex-end;
    position: absolute;
    &:hover {
      $b: rgba(#207ac9, 0.8);
      color: $b;
      font-weight: 600;
    }
  }
}
</style>
