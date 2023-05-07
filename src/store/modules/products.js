export default {
  actions: {
    async fetchColumn({ commit }, productItem) {
      commit('createColumn', productItem);
    },

    setChangeColumns({ commit }, active) {
      commit('setChangeColumns', active);
    },
  },
  mutations: {
    createColumn(state, productItem) {
      state.products.push(productItem);
    },
    setChangeColumns(state, active) {
      state.changeColumns = active;
    },
  },
  state: {
    products: [
      {
        id: 1,
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
    changeColumns: false,
  },
  getters: {
    getProducts(state) {
      return state.products;
    },

    getChangeColumns(state) {
      return state.changeColumns;
    },
  },
};
