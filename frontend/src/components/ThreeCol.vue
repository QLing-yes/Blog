<!-- 三栏布局 可传入"props:v"或者直接使用"slot" -->
<script lang="ts" setup>
type prop = {
  v?: (string | number)[]
  rotate?: boolean
}
const props = defineProps<prop>()
</script>

<template>
  <div class="ThreeCol">
    <div icon>
      <slot name="L">{{ props.v![0] }}</slot>
    </div>
    <div class="C">
      <slot>{{ props.v![1] }}</slot>
    </div>
    <div>
      <slot name="R">
        <span class="rotate" :class="rotate ? 'r' : ''">
          {{ props.v![2] }}
        </span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.C {
  font-family: cursive;
  font-size: 1.1em;
}

.ThreeCol {
  user-select: none;
  align-items: center;

  &>div:nth-of-type(1) {
    font-size: 1.15rem;
  }

  &>div:nth-of-type(2) {
    margin-left: 8px;
  }

  &>div:nth-of-type(3) {
    flex: 1;
    flex-direction: row-reverse;

    >.rotate {
      transform-origin: center center;
      transform: rotate(-90deg);
      transition: transform 0.6s;
      color: $grey3;
      opacity: 0.7;
    }

    >.r {
      color: #32d3e3;
      transform: rotate(-180deg);
    }
  }
}
</style>
