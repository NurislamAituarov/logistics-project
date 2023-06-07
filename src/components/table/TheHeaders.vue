<template>
  <th
    v-for="header of headers.flat()"
    :key="header.key"
    :class="[
      'column sortable',
      pagination.descending ? 'desc' : 'asc',
      header.key === pagination.sortBy ? 'active' : '',
      header.key === 'action' ? 'column_action' : '',
    ]"
    :data-order="header.key"
  >
    <div class="headerHandle">
      {{ header.title }}
    </div>
  </th>
</template>

<script>
export default {
  name: "TheTableHeadersTh",

  props: {
    headers: { type: Array, default: () => [] },
    pagination: { type: Object, default: () => {} },
  },
};
</script>

<style scoped>
.column_action {
  pointer-events: none;
}
</style>