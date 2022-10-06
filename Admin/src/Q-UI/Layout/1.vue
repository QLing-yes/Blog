<script setup lang="ts">
type props = {
  /** Sidebar元素最小宽 */
  w?: string
  /** NavBar元素最小高 */
  h?: string
}
const props = defineProps<props>()
</script>

<template>
  <div class="Layout">
    <div class="Sidebar sticky">
      <slot name="sidebar"></slot>
    </div>
    <div class="Box">
      <div class="NavBar sticky">
        <slot name="navBar"></slot>
      </div>
      <div class="Content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.Content {
  flex-direction: column;
}
.NavBar {
  contain: v-bind("h || 'size'") layout;
  // width: 100%;
  min-height: v-bind("h || '0px'");
  transition: all 0.35s;
  background-color: aliceblue;
}
.Sidebar {
  contain: v-bind("w || 'size'") layout;
  height: 100vh;
  min-width: v-bind("w || '0px'");
  transition: all 0.35s;
}
.Box {
  width: 100%;
  flex-direction: column;
}
.sticky {
  position: sticky;
  top: 0px;
  z-index: 999;
}
div {
  display: flex;
}
</style>
