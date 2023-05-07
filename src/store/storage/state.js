import storage from './local-storage.json';

const getItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export default () => ({
  columnsSize: getItem(storage.columns_size),
});
