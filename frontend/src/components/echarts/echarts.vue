<script lang="ts" setup>
import { inject, nextTick, onMounted, onUnmounted, ref, unref } from 'vue'
import type { EChartsOption, PieSeriesOption } from 'echarts'
import { useChart, echarts } from '@/Q-UI/echarts/main'
import { getTagCount } from '@/shared/api/api'

const isPC = inject('isPC')
const A = ref<HTMLElement>()
// let myChart: typeof echarts
async function Chart() {
  getTagCount().then((e) => {
    if (e.err) return;
    let data: PieSeriesOption['data'] = []
    for (let name in e.res.tagSize) {
      data.push({ name, value: e.res.tagSize[name] })
    }

    const option: EChartsOption = {
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: '0%',
        top: '5%',
        bottom: 20,
      },
      tooltip: {
        trigger: isPC ? 'item' : 'none',
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
          label: !isPC
            ? {
                show: false,
                position: 'center',
              }
            : {},
          labelLine: {
            show: true,
          },
          data: data,
        },
      ],
    }

    useChart(A.value!, option)
  })
}
// function v() {
//   let d = []
//   for (let i = 0; i < 13; i++) {
//     d.push({ value: Math.random(), name: '分类' + i })
//   }
//   return d
// }
nextTick(async () => {
  Chart()
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
