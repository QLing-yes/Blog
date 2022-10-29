<script lang="ts" setup>
import { ref } from 'vue'
let info = ref<string[][]>([])
info.value = [
  ['\ue643', '文章数', '10'],
  ['\ue643', '评论数', '10'],
  ['\ue643', '稳定运行', '10天'],
]
</script>
<template>
  <div class="Notice" icon>
    <span class="title">公告</span>
    <div class="info">
      <span class="mark">&#xe643;</span>
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
  > span {
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
