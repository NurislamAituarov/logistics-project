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
    headers: [
      {
        title: 'Действие',
        align: 'start',
        sortable: false,
        key: 'action',
      },
      {
        title: 'Наименование еденицы',
        align: 'start',
        sortable: false,
        key: 'name',
      },
      { title: 'Цена', align: 'start', sortable: false, key: 'price' },
      { title: 'Кол-во', align: 'start', sortable: false, key: 'quantity' },
      {
        title: 'Название товара',
        align: 'start',
        sortable: false,
        key: 'product',
      },
      { title: 'Итого', align: 'start', sortable: false, key: 'total' },
    ],
    products: [
      {
        one: '',
        action: 'действие',
        name: 'Серебренный щебень фр. 2-5 мм, 25кг',
        price: 1203,
        quantity: 10,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        action: 'действие',
        name: 'Золотой щебень фр. 2-5 мм, 25кг',
        price: 1203,
        quantity: 20,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        action: 'действие',
        name: 'Мраморный щебень фр. 2-5 мм, 25кг',
        price: 1203,
        quantity: 30,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        action: 'действие',
        name: 'Мраморный щебень фр. 2-5 мм, 25кг',
        price: 1203,
        quantity: 40,
        product: 'Мраморный щебе',
        total: '15623',
      },
    ],
    changeColumns: false,
  },
  getters: {
    getHeaders(state) {
      return state.headers;
    },

    getProducts(state) {
      return state.products;
    },

    getChangeColumns(state) {
      return state.changeColumns;
    },
  },
};
