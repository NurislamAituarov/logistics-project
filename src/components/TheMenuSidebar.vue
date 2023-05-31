<template>
  <div class="left__sidebar" :class="{ 'mobile-menu': getMenuWindow }">
    <img :src="img" alt="" class="mb-10 logo" />

    <div
      class="d-flex justify-space-between align-center pl-3 pr-3 mb-10 menu-header"
    >
      <h2>Меню</h2>
      <p @click="$emit('close-menu-window')" class="menu-return">
        Вернутся
        <v-icon color="#1253a2"> mdi-chevron-right</v-icon>
      </p>
    </div>

    <v-expansion-panels
      v-for="(item, index) of menuListItems"
      :key="index"
      v-model="item.item"
      :disabled="disabled"
      @click="$emit('close-unnecessary-selects', item.list)"
      multiple
    >
      <v-expansion-panel class="expansion__panel">
        <v-expansion-panel-title>{{ item.list }}</v-expansion-panel-title>
        <v-expansion-panel-text
          v-for="(list, ind) of item.nestedList"
          :key="ind"
          class="menu__item"
          :class="{ 'menu__item-active': activeMenuItem === list }"
          @click="$emit('open-page', list)"
        >
          {{ list }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>


<script>
import img from "../assets/logo-compas.png";

export default {
  name: "TheMenuSidebar",
  props: {
    getMenuWindow: { type: Boolean, default: false },
    menuListItems: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    activeMenuItem: { type: String, default: "" },
    activeListItem: { type: String, default: "" },
  },

  emits: ["close-menu-window", "close-unnecessary-selects", "open-page"],

  data() {
    return {
      img,
    };
  },
};
</script>


<style scoped lang="scss">
.left__sidebar {
  width: 229px;
  background: #1c2734;
  padding: 31px 0 10px;
  padding-left: calc(1vw - 20px);

  img {
    display: block;
    margin: 0 auto;
  }
}
.mobile-menu {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 100;
}

.expansion__panel {
  background: none;
  color: white;
}
.menu__item {
  cursor: pointer;
  padding-left: 10px;

  div {
    padding: 8px 24px !important;
  }
}
.menu__item-active {
  color: #fd8301;
  position: relative;
  transition: 0.3s;

  &::before {
    content: "";
    position: absolute;
    background-color: #fd8301;
    width: 2px;
    height: 100%;
    top: 0;
    left: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>