import icons from '../components/icons/icons';

const values = {
  ...Object.fromEntries(Object.entries(icons).map(([key, value]) => [key, { component: value }])),

  iconCheckboxActive: {
    component: icons.iconCheckbox,
    props: { value: true },
  },
};

export default {
  icons: {
    values,
  },
};
