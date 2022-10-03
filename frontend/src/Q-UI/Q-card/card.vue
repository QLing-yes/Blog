<script lang="ts" setup>
type prop = {
  img?: string
  title?: string
  subtitle?: string
}

const props = defineProps<prop>()
</script>
<template>
  <div class="cardBox">
    <div class="card">
      <img
        v-if="props.img"
        class="bj"
        loading="lazy"
        decoding="async"
        :src="props.img"
      />
      <span class="title">{{ props.title }}</span>
      <span class="subtitle">{{ props.subtitle }}</span>
      <span class="label">{{ props.title }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cardBox {
  user-select: none;
  content-visibility: auto;
  flex-direction: column;
  transition: all 0.6s;
}
.card {
  contain: strict;
  flex: 1;
  flex-direction: column;
  border-radius: 10px;
  transition: all 0.6s;
  border: 1px solid #dee2e6;
  & > .bj {
    contain: strict;
    z-index: 0;
    position: absolute;
    object-fit: cover;
    border-radius: inherit;
    height: 100%;
    width: 100%;
    transition: all 0.5s;
  }
}
.title,
.subtitle {
  display: flex;
  contain: strict;
  z-index: 1;
  flex: 1;
  align-items: center;
  transition: all 0.6s;
  color: #fff;
  text-shadow: rgb(0, 0, 0) 0.2px 0 0;
}
.title {
  font-size: 2em;
  font-weight: 600;
  transform: translateX(-101%);
}
.subtitle {
  flex-direction: row-reverse;
  font-style: oblique;
  transform: translateX(101%);
}
@media (min-width: 768px) {
  .title {
    justify-content: center;
    padding-right: 100px;
  }
  .subtitle {
    justify-content: center;
    padding-left: 100px;
  }
}
@media (max-width: 768px) {
  .title {
    font-size: 1.5em;
    padding-left: 10px;
  }
  .subtitle {
    font-size: 0.9em;
    padding-right: 10px;
  }
}
.card:hover {
  .title,
  .subtitle {
    transform: translateX(0%);
  }
  .bj {
    transform: scale(1.15);
    -webkit-filter: brightness(50%);
    filter: brightness(50%);
  }
  .label {
    content-visibility: hidden;
  }
}
.label {
  z-index: 1;
  // margin-left: 8px;
  backdrop-filter: blur(1px);
  color: rgb(0, 0, 0);
  text-shadow: rgb(255, 255, 255) 0.2px 0 0;
}
</style>
