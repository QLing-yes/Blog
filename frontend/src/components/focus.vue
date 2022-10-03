<script lang="ts" setup>
import card from '@/Q-UI/Q-card/card.vue'
import img from '@/assets/img/welt.jpg'
import { nextTick, ref } from 'vue'
import { catchScroll } from '@/Q-UI/tools/anima'
let cardList = ref<string[][]>([])
cardList.value = [
  [img, 'node.js', '文章数量20'],
  [img, 'vue3', '文章数量20'],
  [img, 'vue2', '文章数量20'],
  [img, 'uniapp', '文章数量20'],
  [img, 'web', '文章数量20'],
  [img, 'js', '文章数量20'],
  [img, 'css', '文章数量20'],
]
let cardBOX = ref<HTMLElement>()
nextTick(() => {
  catchScroll(cardBOX.value!)
})
</script>
<template>
  <div class="focus">
    <div class="cardBOX" ref="cardBOX">
      <card
        class="Card"
        :img="item[0]"
        :title="item[1]"
        :subtitle="item[2]"
        v-for="item in cardList"
      ></card>
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
