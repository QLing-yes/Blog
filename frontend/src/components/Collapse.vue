<!-- 竖向折叠面板 -->
<script lang="ts" setup>
import QFolding from '../Q-UI/Q-folding/folding.vue'
import ThreeCol from '@/components/ThreeCol.vue'

type tab = {
  fall?: boolean
  tab?: (string | number)[]
  sub?: (string | number)[][]
}
type prop = {
  tab?: tab[]
}
type emits = {
  (e: 'tab', list: prop['tab'], xy: [number, number?], auto: Function): void
}

const props = defineProps<prop>()
const emit = defineEmits<emits>()

function emitTab(item: tab, xy: [number, number?]) {
  //代理折叠
  function auto() {
    if (xy[1] == undefined) {
      item.fall = !item.fall
      //跳过当前点击, 其他全部折叠
      props.tab?.map((e) => {
        if (props.tab?.[xy[0]] != e) e.fall = false
      })
    }
  }
  emit('tab', props.tab, xy, auto)
}
</script>

<template>
  <QFolding :fall="item.fall" v-for="(item, x) in props.tab">
    <!-- 标题 -->
    <ThreeCol
      class="Col"
      :v="item.tab"
      :rotate="item.fall && !!item.sub"
      @click="emitTab(item, [x])"
    ></ThreeCol>
    <!-- 可折叠区域 -->
    <template #folding>
      <ThreeCol
        @click="emitTab(item, [x, y])"
        class="ColFall"
        :v="sub"
        v-for="(sub, y) in item.sub"
      ></ThreeCol>
    </template>
  </QFolding>
</template>

<style lang="scss" scoped>
.Col {
  flex: 1;
  height: 35px;
  padding-right: 8px;
  padding-left: 8px;
  margin-top: 5px;
  border-radius: 6px;
  transition: background-color 0.4s;
  cursor: pointer;
}
.Col:hover {
  background-color: rgba(#1bcedf, 0.13);
}
.ColFall {
  cursor: pointer;
  margin-left: 8px;
  padding-left: 8px;
  height: 35px;
  border-radius: 6px;
  transition: background-color 0.15s;
}
.ColFall:hover {
  background-color: rgba(#1bdf84, 0.13);
}
</style>
