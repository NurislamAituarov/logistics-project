import { createRouter, createWebHashHistory } from 'vue-router';
import TheLoad from '@/pages/loadboard/Load.vue';
import TheBid from '@/pages/bid/Bid.vue';
import MyLoad from '@/pages/my-load/MyLoad.vue';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: TheBid },
    { path: '/load', component: TheLoad },
    { path: '/my-load/:key', component: MyLoad },
  ],
});
