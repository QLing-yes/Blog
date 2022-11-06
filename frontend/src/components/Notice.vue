<script lang="ts" setup>
import { Basic } from '@/models/State/State';
import type { ResBasic } from '@/shared/protocols/basic/PtlBasic';
import { ref, shallowReactive, watch } from 'vue'
const info = shallowReactive<(string | number)[][]>([]);
const notice = ref('');
watch(Basic.isSucc, (v, ol) => {
  if (v) {
    const { Articles, StartTime, basic } = Basic.value;
    notice.value = basic?.notice || '';
    const s = (Date.now() - StartTime!) / 1000;
    info.push(['\ue643', "文章数", Articles!]);
    info.push(['\ue643', "评论数", "待开发"]);
    info.push(['\ue643', "稳定运行", `${Math.floor(s / 60 / 60) % 24}时`]);
  }
}, { immediate: true })
</script>
<template>
  <div class="Notice" icon>
    <span class="title">公告</span>
    <div class="info">
      <span class="mark">
        <span class="notice">
          <span>{{ notice }}</span>
        </span>
      </span>
    </div>
    <span class="title">博客信息</span>
    <div class="info">
      <span v-for="item in info">
        <span class="mark">{{ item[0] }}</span>
        <span>{{ item[1] }}</span>
        <span>{{ item[2] }}</span>
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.notice {
  // font-family: sans-serif;
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
}

.Notice {
  flex: 1;
  flex-direction: column;
  //   align-items: center;
  border-radius: inherit;
  margin: 15px;
  margin-top: 0px;
}

.mark {
  font-size: 1.2em;
  padding-right: 5px;
}

.title {
  color: $grey2;
  font-weight: 600;
  letter-spacing: 3px;
  margin-top: 23px;
  margin-bottom: 5px;
}

.info {
  color: $grey1;
  padding: 13px;
  border-radius: inherit;
  border: 1px dashed #e6e6e6;
}

.info:nth-of-type(2) {
  flex-direction: column;

  >span {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    span:nth-of-type(2) {
      color: $grey2;
      font-size: 0.9em;
    }

    span:nth-of-type(3) {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
