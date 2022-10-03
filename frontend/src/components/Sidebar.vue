<script lang="ts" setup>
import avatar from '@img/LingMo.webp'
import { ref } from 'vue'
import Collapse from '@/components/Collapse.vue'
import tabList from '@/assets/json/SidebarList.json'

//侧边栏 tab列表
let SidebarList = ref(tabList)
//点击侧边栏的tab列表处理
function SidebarTab(list: any, xy: any[], auto: Function) {
  auto()
  return
}
</script>

<template>
  <!-- 个人信息 -->
  <div class="my">
    <img loading="lazy" decoding="async" type="image/webp" :src="avatar" />
    <div class="txt">
      <span>LingMo</span>
      <span>LingMo的小站</span>
    </div>
  </div>
  <!-- 选项tab -->
  <Collapse :tab="SidebarList" @tab="SidebarTab"></Collapse>
</template>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .my {
    min-width: 45vw;
  }
}
.my {
  height: 100px;
  margin-bottom: 8px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #e6e6e6;
  // background-color: antiquewhite;
  align-items: center;
  justify-content: space-evenly;
  > img {
    width: 60px;
    height: 60px;
    border-radius: 60px;
  }
  .txt {
    contain: content;
    flex-direction: column;
    & span:nth-of-type(1) {
      font-size: 1.3rem;
      font-weight: 500;
    }
    & span:nth-of-type(2) {
      font-size: 0.8rem;
      color: #999999;
    }
  }
}
</style>
