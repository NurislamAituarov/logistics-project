import storage from './local-storage.json';

export default {
  setValue(state, { name, value }) {
    const key = storage[name];

    state[name] = value;
    localStorage.setItem(key, JSON.stringify(value));
  },
};
