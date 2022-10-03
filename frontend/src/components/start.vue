<script lang="ts" setup>
import { inject, nextTick, ref } from 'vue'
import { $scrollTo } from '@/Q-UI/tools/anima'
import avatar from '@img/LingMo.webp'
import bj from '@img/bj.jpg'

const StartPage = ref<Element>()
const winEl = inject('isPC') ? document.documentElement : document.body
let blog = 'LingMo'
let logo = ['\ue649', '\ue600', '\ue722']

nextTick(() => {
  StartPage.value?.addEventListener(
    'wheel',
    (e: any) => {
      if (e.deltaY > 0) {
        e.preventDefault()
        nextPage()
      }
    },
    { passive: false },
  )
})

function nextPage() {
  $scrollTo(winEl, [0, StartPage.value?.getBoundingClientRect().height || 0])
}
</script>

<template>
  <div class="root" ref="StartPage">
    <img class="bj" loading="lazy" decoding="async" :src="bj" />
    <div class="content">
      <!-- 头像 -->
      <img
        @click="nextPage"
        loading="lazy"
        decoding="async"
        draggable="false"
        type="image/webp"
        :src="avatar"
      />
      <!-- 博客名称 -->
      <div class="GermaniaOne BlogName">
        <span
          v-for="(item, i) in blog + '`s&nbsp;Blog'"
          :style="'--i:' + i + ';'"
        >
          {{ item }}
        </span>
      </div>
      <!-- 平台 -->
      <div class="float"></div>
      <div class="float">
        <div class="logo" icon v-for="item in logo">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/anima/anima.scss';
.float {
  animation: float 2.5s linear 0s infinite;
}
.BlogName {
  color: #fff;
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 8px;
  margin-top: 15px;
  margin-bottom: 5px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  & span {
    display: inline-block;
    animation: shake 1.5s ease-in-out;
    animation-delay: calc(0.05s * var(--i));
  }
  &:hover span {
    animation: shake 1.8s ease-in-out infinite;
    animation-delay: calc(0.05s * var(--i));
  }
}
.logo {
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 10px;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.2);
  }
}
.content {
  z-index: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // backdrop-filter: blur(1px);
  & > img {
    $vh: 135px;
    width: $vh;
    height: $vh;
    border-radius: $vh;
    border: 5px solid rgba(0, 0, 0, 0.25);
  }

  @mixin background {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(2.5px);
  }
  & > div:nth-of-type(2) {
    width: 22px;
    height: 12px;
    -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    @include background;
  }
  & > div:nth-of-type(3) {
    min-width: 8%;
    height: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    @include background;
  }
}
.bj {
  position: absolute;
  height: 100vh;
  width: 100%;
  object-fit: cover;
}
.root {
  height: 100vh;
  align-items: center;
  justify-content: center;
}
@media (max-width: 768px) {
  .content {
    & > img {
      $vh: 120px;
      width: $vh;
      height: $vh;
    }
  }
  .BlogName {
    font-size: 2rem;
  }
  $h: 60vh;
  .bj {
    height: $h;
  }
  .root {
    height: $h;
  }
}
</style>
