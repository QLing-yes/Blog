<script lang="ts" setup>
import { inject, nextTick, onMounted, onUnmounted, ref, unref, watch } from 'vue'
import type { EChartsOption, PieSeriesOption } from 'echarts'
import { useChart, echarts } from '@/Q-UI/echarts/main'
import { Basic } from '@/models/State/State'
import { useRouter } from 'vue-router';

const isPC = inject('isPC')
const A = ref<HTMLElement>()
const router = useRouter()

async function Chart() {
  watch(Basic.isSucc, (v, ol) => {
    if (!v) return;
    const tagSize = Basic.value.tagSize!
    const data: PieSeriesOption['data'] = []

    for (let name in tagSize) {
      data.push({ name, value: tagSize[name] })
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
          name: 'tag',
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
    const myChart = useChart(A.value!, option)
    myChart.on('click', (e) => {
      const { name } = e;
      router.push({ path: '/Search', query: { field: 'tag', query: name, } });
    })
  }, { immediate: true })
}
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
