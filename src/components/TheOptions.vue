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
          <v-list-item-title
            @click="
              item.title === 'Удалить' ? deleteLine(idLine) : editLine(idLine)
            "
            class="list__item-title"
            :class="{ 'list__item-title-delete': item.title === 'Удалить' }"
            >{{ item.title }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mergeProps } from "vue";
import BaseIcon from "./icons/BaseIcon.vue";
import { mapActions } from "vuex";

export default {
  name: "TheOptions",

  components: { BaseIcon },

  props: {
    idLine: { type: [String, Number], default: "" },
    itemLine: { type: Object, default: () => {} },
  },

  data: () => ({
    items: [{ title: "Удалить" }, { title: "Изменить" }],
  }),

  watch: {},

  methods: {
    ...mapActions(["setEditLine"]),
    mergeProps,

    deleteLine(id) {
      this.$emit("delete-line", id);
    },

    editLine(id) {
      this.$emit("open-dialog-window");
      this.setEditLine(id);
    },
  },
};
</script>

<style scoped lang="scss">
.list__item-title {
  cursor: pointer;
  &:hover {
    color: #1253a2;
    transition: 0.3s;
  }
}
.list__item-title-delete {
  color: rgb(185, 0, 0);
  &:hover {
    color: red;
    transition: 0.3s;
  }
}
</style>