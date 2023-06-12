export const mutations = {
  createLoadLine(state, productItem) {
    state.products.push(productItem);
  },
  setChangeColumns(state, active) {
    state.changeColumns = active;
  },
  setChangeDisabled(state, { show, key, index }) {
    state.headers = state.headers.map((header) => {
      if (key !== header.key) return header;

      state.headerActive = { ...header, show, index };

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

  setMenuWindow(state, active) {
    state.menuWindow = active;
  },
};
