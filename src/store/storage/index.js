import storage from './local-storage.json';

const getItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export default {
  state: {
    size_column_1: getItem(storage.size_column_1),
    size_column_2: getItem(storage.size_column_2),
    size_column_3: getItem(storage.size_column_3),
    size_column_4: getItem(storage.size_column_4),
    size_column_5: getItem(storage.size_column_5),
    size_column_6: getItem(storage.size_column_6),
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
