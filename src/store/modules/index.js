export default {
  actions: {
    fetchColumn({ commit }, productItem) {
      commit('createColumn', productItem);
    },

    setChangeColumns({ commit }, active) {
      commit('setChangeColumns', active);
    },

    setChangeDisabled({ commit }, { show, key }) {
      commit('setChangeDisabled', { show, key });
    },

    setStorageHeaders({ commit }, headers) {
      commit('setStorageHeaders', headers);
    },

    setStorageColumns({ commit }, columns) {
      commit('setStorageColumns', columns);
    },

    async deletedLine({ commit }, id) {
      commit('deletedLine', id);
    },

    setEditLine({ commit }, id) {
      commit('setEditLine', id);
    },

    setSaveLineEdit({ commit }, { data, id }) {
      commit('setSaveLineEdit', { data, id });
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

    setStorageHeaders(state, headers) {
      state.headers = headers;
    },

    setStorageColumns(state, columns) {
      state.products = columns;
    },

    deletedLine(state, id) {
      state.products = state.products.filter((el) => {
        return el.id !== id;
      });
    },

    setEditLine(state, id) {
      state.activeLineEdit = state.products.filter((el) => el.id === id)[0];
    },

    setSaveLineEdit(state, { data, id }) {
      state.products = state.products.map((el) => {
        if (el.id === id) return data;

        return el;
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
        id: null,
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
        id: 1,
        action: 'действие',
        name: 'Серебренный щебень фр. 2-5 мм, 25кг',
        newCol: 'Новая колонка',
        price: 1203,
        quantity: 10,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        id: 2,
        action: 'действие',
        name: 'Золотой щебень фр. 2-5 мм, 25кг',
        newCol: 'Новая колонка',
        price: 1203,
        quantity: 20,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        id: 3,
        action: 'действие',
        name: 'Мраморный щебень фр. 2-5 мм, 25кг',
        newCol: 'Новая колонка',
        price: 1203,
        quantity: 30,
        product: 'Мраморный щебе',
        total: '15623',
      },
      {
        id: 4,
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

    activeLineEdit: {},
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

    getEditLine(state) {
      return state.activeLineEdit;
    },
  },
};
