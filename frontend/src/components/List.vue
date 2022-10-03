<script lang="ts" setup>
import card from '@/Q-UI/Q-card/card_2.vue'
import img from '@/assets/img/welt.jpg'
import Load from '@/components/autoLoad.vue'
import { computed, inject, ref } from 'vue'
let d = [
  '2022/9/8',
  '贝塞尔曲线算法',
  'node.js',
  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quae autvoluptates facere at cum mai ores dolores neque, eum iste, eos inventorecupiditate tempora ducimus itaque quibus dam debitis! Expedita, ab.`,
]
const isPC = inject('isPC')

let num = ref(5)
let autoLoad = ref(false)
let row = ref<boolean>(true)
let imgWH = computed(() => {
  return {
    row: row.value,
    // rows: 3,
    class: row.value ? 'card1' : 'card2',
    noContent: row.value && !isPC ? true : undefined,
    'img-w': row.value ? '50%' : undefined,
    'img-h': !row.value ? (isPC ? '15vw' : '100px') : undefined,
  }
})

function rows() {
  return Math.floor(Math.random() * 3 + 1)
}
function load() {
  console.log("加载");
  num.value = num.value + 5
}
</script>
<template>
  <div class="List">
    <label class="configure">
      <span>&#xe6cd; Article</span>
      <span @click="row = !row">切换布局</span>
    </label>
    <div v-for="w in isPC ? 3 : 2">
      <card
        :rows="rows()"
        v-for="l in num"
        class="card"
        :content="d"
        :src="img"
        v-bind="imgWH"
      ></card>
    </div>
    <Load @load="load"></Load>
  </div>
</template>
<style lang="scss" scoped>
.configure {
  width: 100%;
  margin: 0px 10px;
  display: flex;
  justify-content: space-between;
  user-select: none;
  contain: content;
  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    max-width: 30vw;

    align-items: center;
    padding-left: 10px;
    color: #66666697;
  }
}
.List {
  contain: content;
  border-radius: 10px;
  flex-wrap: wrap;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  margin-top: 12px;
  margin-bottom: 12px;
  padding-top: 10px;
  padding-bottom: 20px;
}
.List > div {
  flex: 1;
  flex-direction: column;
  align-items: center;
  & > .card {
    contain: content;
    content-visibility: auto;
    border-radius: 10px;
    border: 1px solid rgba(#dee2e6, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  }
  @media (min-width: 768px) {
    & > .card1 {
      height: 300px;
      width: 680px;
      margin: 20px;
    }
    & > .card2 {
      margin: 15px;
      width: 300px;
    }
  }
  @media (max-width: 768px) {
    & > .card1 {
      height: 35vw;
      width: 85vw;
      margin: 13px;
    }
    & > .card2 {
      margin: 10px 0px 0px 10px;
      width: 150px;
      // align-self: flex-end;
    }
  }
}
</style>
