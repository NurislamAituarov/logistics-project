import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import store from './store';
import TextTruncate from '@/components/base/global/TextTruncate.vue';
import { router } from './plugins/roter';

import './assets/styles/main.css';

loadFonts();

const app = createApp(App);
app.use(store);
app.use(vuetify);
app.use(router);
app.component('TextTruncate', TextTruncate);
app.mount('#app');
