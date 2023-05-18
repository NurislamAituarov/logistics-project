<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ props: menu }">
        <v-tooltip location="top">
          <template v-slot:activator="{ props: tooltip }">
            <BaseIcon
              name="options"
              color="#a6b7d4"
              shadow="true"
              v-bind="mergeProps(menu, tooltip)"
            />
          </template>
          <span>Настройка строки, удалить, изменить </span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title class="list__item-title">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mergeProps } from "vue";
import BaseIcon from "./icons/BaseIcon.vue";

export default {
  name: "TheOptions",
  data: () => ({
    items: [{ title: "Удалить" }, { title: "Изменить" }],
  }),
  methods: {
    mergeProps,
  },
  components: { BaseIcon },
};
</script>

<style scoped lang="scss">
.list__item-title {
  cursor: pointer;
  &:hover {
    color: #1253a2;
  }
}
</style>