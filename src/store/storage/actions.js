export default {
  setValue({ commit }, { name, value }) {
    commit('setValue', { name, value });
  },
};
