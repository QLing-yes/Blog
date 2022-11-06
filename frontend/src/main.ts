import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'

import '@/main.scss'
import anime from 'animejs'
import { Router } from './models/router/vueRouter'
// import * as echarts from 'echarts'
window.$anime = anime;
// window.$echarts = echarts;

const app = createApp(App);
// app.use(createPinia());
app.use(Router);
app.mount('#app');