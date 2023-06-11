import { createStore } from 'vuex';
import mainState from './main-state';
import storage from './storage';

const store = createStore({
  modules: {
    mainState,
    storage,
  },
});

export default store;
