import storage from './local-storage.json';

const getItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export default {
  state: {
    size_column_action: getItem(storage.size_column_action),
    size_column_name: getItem(storage.size_column_name),
    size_column_price: getItem(storage.size_column_price),
    size_column_quantity: getItem(storage.size_column_quantity),
    size_column_product: getItem(storage.size_column_product),
    size_column_total: getItem(storage.size_column_total),

    new_order_headers: getItem(storage.new_order_headers),
    new_order_lines: getItem(storage.new_order_lines),
  },
  getters: {
    getValue: (state) => (key) => {
      return state[key];
    },
  },
  actions: {
    setValue({ commit }, { name, value }) {
      commit('setValue', { name, value });
    },
  },
  mutations: {
    setValue(state, { name, value }) {
      const key = storage[name];

      state[name] = value;
      localStorage.setItem(key, JSON.stringify(value));
    },
  },
};
