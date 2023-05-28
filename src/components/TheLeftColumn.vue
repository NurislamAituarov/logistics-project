<template>
  <div class="left__sidebar">
    <img :src="img" alt="" class="mb-10" />

    <v-expansion-panels
      v-for="(item, index) of menuListItems"
      :key="index"
      v-model="item.item"
      :disabled="disabled"
      @click="activeListItem = item.list"
      multiple
    >
      <v-expansion-panel class="expansion__panel">
        <v-expansion-panel-title expand-icon="" collapse-icon="">{{
          item.list
        }}</v-expansion-panel-title>
        <v-expansion-panel-text
          v-for="(list, ind) of item.nestedList"
          :key="ind"
          class="menu__item"
          :class="{ 'menu__item-active': activeMenuItem === list }"
          @click="openPage(list)"
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
  name: "TheLeftColumn",
  data() {
    return {
      img,
      menuListItems: [
        {
          item: [],
          list: "Логистика",
          nestedList: ["Новая стараница", "Дополнительная страница"],
        },
        {
          item: [0],
          list: "Перевозчики",
          nestedList: ["Задачи", "Аналитика"],
        },
        {
          item: [],
          list: "Адреса",
          nestedList: ["Новая стараница", "Дополнительная страница"],
        },
      ],
      activeListItem: "",

      disabled: false,
      readonly: false,
      activeMenuItem: "Аналитика",
    };
  },

  watch: {
    "$route.path"() {
      if (this.$route.path === "/load") {
        this.activeMenuItem = "Аналитика";
      }

      if (this.$route.params.key) {
        this.activeMenuItem = "";
        this.menuListItems = this.menuListItems.map((list) => {
          return { ...list, item: [] };
        });
      }
    },

    activeListItem(value) {
      this.menuListItems = this.menuListItems.map((el) => {
        if (value !== el.list) return { ...el, item: [] };

        return el;
      });
    },
  },

  methods: {
    openPage(page) {
      this.activeMenuItem = page;
      if (page === "Аналитика") {
        this.$router.push("/load");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.left__sidebar {
  width: 229px;
  background: #1c2734;
  padding: 31px 0 10px;
  img {
    display: block;
    margin: 0 auto;
  }
}

.expansion__panel {
  background: none;
  color: white;
}
.menu__item {
  cursor: pointer;
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
</style>