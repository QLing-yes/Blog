<script lang="ts" setup>
const props = defineProps({
  fall: { type: Boolean },
})
</script>
<!-- 竖向折叠控件 -->
<template>
  <!-- flex-direction: column; -->
  <div class="title" v-bind="$attrs">
    <slot></slot>
  </div>
  <div class="folding" :class="(props.fall ? 'fall' : '')">
    <slot name="folding"></slot>
  </div>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
div {
  display: flex;
}
.folding {
  flex-direction: column;
  transition: max-height 0.5s;
  overflow: scroll;
  max-height: 0%;
}
.fall {
  max-height: 100%;
}
</style>
