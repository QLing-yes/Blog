<script lang="ts" setup>
import card from '@/Q-UI/Q-card/card.vue'
import img from '@img/welt.jpg'
import { nextTick, ref, shallowReactive, watch } from 'vue'
import { catchScroll } from '@/Q-UI/tools/browser'
import { useRouter } from 'vue-router'
import { Basic } from '@/models/State/State'

const router = useRouter()
const cardList = shallowReactive<string[][]>([])

watch(Basic.isSucc, (v, ol) => {
  if (v) {
    for (let key in Basic.value.tagSize) {
      cardList.push([
        img,
        key,
        '文章数量' + Basic.value.tagSize[key],
        //"query,field"
        `${key},tag`
      ])
    }
  }

}, { immediate: true })

let cardBOX = ref<HTMLElement>()
nextTick(() => {
  catchScroll(cardBOX.value!)
})

function read(key: string) {
  const l = key.split(',');
  router.push({ path: '/Search', query: { field: l[1], query: l[0], } });
}
</script>
<template>
  <div class="focus">
    <div class="cardBOX" ref="cardBOX" title="使用滚轮或拖动移动">
      <card class="Card" :img="item[0]" :title="item[1]" :subtitle="item[2]" @click="read(item[3])"
        v-for="item in cardList"></card>
    </div>
    <div class="mark">
      &#xe63e;
      <span style="margin-left: 8px;">Focusing</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.focus {
  flex: 1;
  flex-direction: column-reverse;
  position: relative;
}

.mark {
  flex: 1;
  align-items: center;
  padding-left: 15px;
  color: #66666697;
  // background-color: antiquewhite;
}

.cardBOX {
  padding: 0px 10px 15px 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  contain: strict;
  height: 170px;
  cursor: grab;

  .Card {
    height: 170px;
    min-width: 280px;
    margin: 0px 4px;
  }
}

@media (max-width: 768px) {
  .cardBOX {
    height: 120px;

    .Card {
      height: 120px;
      min-width: 180px;
    }
  }
}
</style>
