export default {
  actions: {
    async fetchColumn({ commit }, productItem) {
      commit('createColumn', productItem);
    },

    setChangeColumns({ commit }, active) {
      commit('setChangeColumns', active);
    },

    setChangeDisabled({ commit }, { show, key }) {
      commit('setChangeDisabled', { show, key });
    },
  },
  mutations: {
    createColumn(state, productItem) {
      state.products.push(productItem);
    },
    setChangeColumns(state, active) {
      state.changeColumns = active;
    },

    setChangeDisabled(state, { show, key }) {
      state.headers = state.headers.map((header) => {
        if (key !== header.key) return header;
        return { ...header, show };
      });
    },
  },
  state: {
    headers: [
      {
        title: 'Действие',
        align: 'start',
        sortable: false,
        key: 'action',
        show: true,
      },
      {
        title: 'Наименование еденицы',
        align: 'start',
        sortable: false,
        key: 'name',
        show: true,
      },

      { title: 'Новая колонка', align: 'start', sortable: false, key: 'newCol', show: true },

      { title: 'Цена', align: 'start', sortable: false, key: 'price', show: true },
      { title: 'Кол-во', align: 'start', sortable: false, key: 'quantity', show: true },
      {
        title: 'Название товара',
        align: 'start',
        sortable: false,
        key: 'product',
        show: true,
      },
      { title: 'Итого', align: 'start', sortable: false, key: 'total', show: true },
    ],
    products: [
      {
        one: '',
        action: 'действие',
        name: 'Серебренный щебень фр. 2-5 мм, 25кг',
        newCol: 'Новая колонка',
        price: 1203,
        quantity: 10,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        action: 'действие',
        name: 'Золотой щебень фр. 2-5 мм, 25кг',
        newCol: 'Новая колонка',
        price: 1203,
        quantity: 20,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        action: 'действие',
        name: 'Мраморный щебень фр. 2-5 мм, 25кг',
        newCol: 'Новая колонка',
        price: 1203,
        quantity: 30,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        action: 'действие',
        name: 'Мраморный щебень фр. 2-5 мм, 25кг',
        newCol: 'Новая колонка',
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
