export const actions = {
  fetchColumn({ commit }, productItem) {
    commit('createColumn', productItem);
  },

  setChangeColumns({ commit }, active) {
    commit('setChangeColumns', active);
  },

  setChangeDisabled({ commit }, { show, key, index }) {
    commit('setChangeDisabled', { show, key, index });
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
};
