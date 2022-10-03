import { createApp } from 'vue'
import App from './App.vue'

import './main.scss'
import { Router } from "@/models/router/vueRouter";

const app = createApp(App);
app.use(Router);
app.mount('#app');
