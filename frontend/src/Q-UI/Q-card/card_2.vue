<script lang="ts" setup>
type prop = {
  order?: number //顺序
  row?: boolean //flex-direction方向
  rows?: number | string //主内容行数
  //图片
  imgW?: string // row时设置
  imgH?: string // !row时设置
  src?: string
  //内容
  content: string[]
  noContent?: boolean
}

const props = defineProps<prop>()
</script>
<template>
  <div class="Card2">
    <img
      v-if="props.src"
      class="bj"
      loading="lazy"
      decoding="async"
      :src="props.src"
    />
    <div class="contentBox">
      <span class="date">{{ props.content[0] }}</span>
      <span class="title">{{ props.content[1] }}</span>
      <div class="label">{{ props.content[2] }}</div>
      <span class="content" v-show="!props.noContent">{{ props.content[3] }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@mixin omit($n) {
  contain: content;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $n;
}
.date {
  font-family: sans-serif;
  color: #918888;
  font-size: 0.85em;
}
.title {
  cursor: pointer;
  color: #504e4e;
  font-size: 1.5em;
  margin: 8px 0px 8px 0px;
  transition: color 0.3s;
  @include omit(1);
}
.title:hover {
  color: #1c7ed6;
}
.label {
  color: #8b8a88;
  font-size: 0.85em;
}
.content {
  font-family: sans-serif;
  color: #626262;
  margin-top: 8px;
  contain: content;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: v-bind('props.rows||"none"');
}
@media (max-width: 768px) {
  .title {
    font-size: 1em;
    margin: 2px 0px 2px 0px;
  }
  .content{
    margin-top: 2px;
  }
}
.contentBox {
  contain: content;
  z-index: 2;
  flex-direction: column;
  align-items: v-bind('props.row?"none":"center"');
  justify-content: center;
  padding: 10px;
  background-color: inherit;
  & > div,
  span {
    align-items: center;
  }
}
.Card2 {
  flex-direction: v-bind('props.row?"row":"column"');
  // justify-content: space-between;
  contain: content;
  background-color: rgb(255, 255, 255);
  & > img {
    order: v-bind('props.order||0');
    width: v-bind('!props.row?"100%":props.imgW||"0px"');
    height: v-bind('props.row?"100%":props.imgH||"0px"');
    transition: transform 0.5s;
    object-fit: cover;
    contain: content;
    cursor: pointer;
  }
  & > img:hover {
    transform: scale(1.1);
  }
  //   &:hover > img {
  //     transform: scale(1.1);
  //   }
}
</style>
