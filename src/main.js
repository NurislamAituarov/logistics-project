import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import store from './store';
import TheLoad from '@/pages/loadboard/TheLoad.vue';
import TheBid from '@/pages/bid/About.vue';
import MyLoad from '@/pages/my-load/my-load.vue';
import './assets/styles/main.css';

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: TheBid },
    { path: '/load', component: TheLoad },
    { path: '/my-load/:key', component: MyLoad },
  ], // short for `routes: routes`
});

loadFonts();

const app = createApp(App);
app.use(store);
app.use(vuetify);
app.use(router);
app.mount('#app');
