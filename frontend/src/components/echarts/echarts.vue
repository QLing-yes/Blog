<script lang="ts" setup>
import { inject, nextTick, onMounted, onUnmounted, ref, unref } from 'vue'
import type { EChartsOption } from 'echarts'
import { useChart, echarts } from '@/Q-UI/echarts/main'

const A = ref<HTMLElement>()
let myChart: typeof echarts
let option: EChartsOption = {
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: '0%',
    top: '5%',
    bottom: 20,
  },
  tooltip: {
    trigger: inject('isPC') ? 'item' : 'none',
  },
  label: {
    show: false,
    position: 'center',
  },
  series: [
    {
      name: '标签',
      type: 'pie',
      radius: ['20%', '70%'],
      center: ['42%', '50%'],
      avoidLabelOverlap: false,
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
        // borderColor: '#fff',
        borderWidth: 2,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      label: !inject('isPC')
        ? {
            show: false,
            position: 'center',
          }
        : {},
      labelLine: {
        show: true,
      },
      data: v(),
    },
  ],
}
function v() {
  let d = []
  for (let i = 0; i < 13; i++) {
    d.push({ value: Math.random(), name: '分类' + i })
  }
  return d
}
nextTick(() => {
  myChart = useChart(A.value!, option)
})
</script>

<template>
  <div ref="A" class="A"></div>
</template>

<style lang="scss" scoped>
.A {
  flex: 0.8;
  // background-color: aquamarine;
  contain: strict;
  svg {
    content-visibility: auto;
  }
  canvas {
    content-visibility: auto;
  }
}
</style>
