import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import store from './store';
import TheLoad from '@/pages/loadboard/Load.vue';
import TheBid from '@/pages/bid/Bid.vue';
import MyLoad from '@/pages/my-load/MyLoad.vue';
import TextTruncate from '@/components/base/global/TextTruncate.vue';
import './assets/styles/main.css';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: TheBid },
    { path: '/load', component: TheLoad },
    { path: '/my-load/:key', component: MyLoad },
  ],
});

loadFonts();

const app = createApp(App);
app.use(store);
app.use(vuetify);
app.use(router);
app.component('TextTruncate', TextTruncate);
app.mount('#app');
