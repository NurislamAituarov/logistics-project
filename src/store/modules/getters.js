export const getters = {
  getHeaders(state) {
    return state.headers;
  },

  getHeaderActive(state) {
    return state.headerActive;
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
};
