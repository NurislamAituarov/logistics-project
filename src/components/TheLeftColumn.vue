<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <TheMenuSidebar
      :get-menu-window="getMenuWindow"
      :menu-list-items="menuListItems"
      :disabled="disabled"
      :active-menu-item="activeMenuItem"
      @close-menu-window="closeMenuWindow"
      @open-page="openPage"
      @close-unnecessary-selects="closeUnnecessarySelects"
    />
  </v-navigation-drawer>
  <TheMenuSidebar
    :get-menu-window="false"
    :menu-list-items="menuListItems"
    :disabled="disabled"
    :active-menu-item="activeMenuItem"
    @close-menu-window="closeMenuWindow"
    @open-page="openPage"
    @close-unnecessary-selects="closeUnnecessarySelects"
  />
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import TheMenuSidebar from "@/components/TheMenuSidebar.vue";

export default {
  name: "TheLeftColumn",

  components: { TheMenuSidebar },

  data() {
    return {
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
          nestedList: ["Новый адрес", "Дополнительный адрес"],
        },
      ],
      activeListItem: "",

      disabled: false,
      readonly: false,
      activeMenuItem: "Аналитика",
      drawer: null,
    };
  },

  computed: {
    ...mapGetters(["getMenuWindow"]),
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

    activeMenuItem() {
      this.setMenuWindow(false);
    },

    getMenuWindow(value) {
      this.drawer = value;
    },

    drawer(value) {
      if (!value) this.setMenuWindow(false);
    },
  },

  methods: {
    ...mapActions(["setMenuWindow"]),

    openPage(page) {
      this.activeMenuItem = page;
      if (page === "Аналитика") {
        this.$router.push("/load");
      } else {
        this.$router.push("/");
      }
    },
    closeMenuWindow() {
      this.setMenuWindow(false);
    },

    closeUnnecessarySelects(list) {
      this.activeListItem = list;
    },
  },
};
</script>
