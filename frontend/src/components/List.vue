<script lang="ts" setup>
import card from '@/Q-UI/Q-card/card_2.vue'
import Load from '@/components/autoLoad.vue'
import { computed, inject, ref } from 'vue'
import { ArticleList, nextPage } from '@/models/State/State'
import { Router, FindRoute } from '@/models/router/vueRouter'
import { getDate } from '@/Q-UI/tools/date'

const isPC = inject('isPC')
// const reg = new RegExp('<[^<>]+>', 'g')

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

function slice(item: typeof ArticleList.value[0]) {
  const { time, title, tag, brief } = item
  return ['发布于'+date(time), title, tag.toString(), brief]
}

function read(item: typeof ArticleList.value[0]) {
  Router.push({ path: '/Article', query: { ID: item.ID } });
}
function date(time?: number) {
  if (!time) return '';
  const { Y, M, D } = getDate(new Date(time));
  return `${Y}-${M}-${D}`;
}
</script>
<template>
  <div class="List">
    <label class="configure">
      <span>&#xe6cd; Article</span>
      <span @click="row = !row">切换布局</span>
    </label>
    <div>
      <card v-for="(item, i) in ArticleList" @click="read(item)" :key="item.ID" :rows="1" class="card"
        :content="slice(item)" :src="item.coverImg" v-bind="imgWH">
      </card>
    </div>
    <Load @load="nextPage"></Load>
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

  &>span {
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

.List>div {
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-around;

  &>.card {
    contain: content;
    content-visibility: auto;
    border-radius: 10px;
    border: 1px solid rgba(#dee2e6, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  }

  @media (min-width: 768px) {
    &>.card1 {
      height: 300px;
      width: 680px;
      margin: 20px;
    }

    &>.card2 {
      margin: 15px;
      width: 300px;
    }
  }

  @media (max-width: 768px) {
    &>.card1 {
      height: 35vw;
      width: 85vw;
      margin: 13px;
    }

    &>.card2 {
      margin: 10px 0px 0px 10px;
      width: 150px;
      // align-self: flex-end;
    }
  }
}
</style>
