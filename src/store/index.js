import { createStore } from 'vuex';
import module from './modules';
import columnSize from './storage';

const store = createStore({
  modules: {
    module,
    columnSize,
  },
});

export default store;
