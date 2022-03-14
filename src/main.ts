import { useTitle } from '@vueuse/core';
import 'virtual:windi.css';
import { createApp } from 'vue';
import { useRoute } from 'vue-router';
import App from './App.vue';
import i18n from './modules/i18n';
import router from './router/';
import store from './store';

createApp(App).use(i18n).use(router).use(store).mount('#app');
