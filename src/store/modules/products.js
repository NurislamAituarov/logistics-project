export default {
  actions: {
    async fetchColumn({ commit }, productItem) {
      commit('createColumn', productItem);
    },
  },
  mutations: {
    createColumn(state, productItem) {
      state.columns.unshift(productItem);
    },
  },
  state: {
    products: [
      {
        one: '',
        action: 'действие',
        name: 'Мраморный щебень фр. 2-5 мм, 25кг',
        price: 1203,
        quantity: 24,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        action: 'действие',
        name: 'Мраморный щебень фр. 2-5 мм, 25кг',
        price: 1203,
        quantity: 24,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        action: 'действие',
        name: 'Мраморный щебень фр. 2-5 мм, 25кг',
        price: 1203,
        quantity: 24,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        action: 'действие',
        name: 'Мраморный щебень фр. 2-5 мм, 25кг',
        price: 1203,
        quantity: 24,
        product: 'Мраморный щебе',
        total: '15623',
      },
    ],
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
  },
};
