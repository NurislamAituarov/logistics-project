import { createStore } from 'vuex';
import products from './modules/products';
import columnSize from './storage';

const store = createStore({
  modules: {
    products,
    columnSize,
  },
});

export default store;
