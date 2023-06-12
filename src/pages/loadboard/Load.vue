<template>
  <v-card class="right__column">
    <div class="pl-10 mb-5 d-flex align-start container__title">
      <BaseIcon
        name="drag"
        width="20"
        class="mt-2 menu-burger"
        @click="openMenuWindow"
      />
      <h1>Проведение ТО и мелкий ремонт</h1>
    </div>

    <v-tabs v-model="tab" class="pl-10 tabs">
      <v-tab
        v-for="item of itemTabs"
        :key="item"
        :value="item.tab"
        class="tab"
        :class="{ tab__active: tab === item.tab }"
        >{{ item.title }}</v-tab
      >
    </v-tabs>

    <v-card-text class="pa-0 mt-5 card__container">
      <v-window v-model="tab">
        <v-window-item value="one" class="pa-6 pl-10 card__item">
          Общие сведения о товаре
        </v-window-item>

        <v-window-item value="two" class="pa-6 pl-10 card__item">
          <TheAddLine @add-load="addLoad" />
          <TheTable
            :saveTemplate="saveTemplate"
            @on-save="onSave"
            @open-dialog-window="openDialogWindow"
          />
        </v-window-item>

        <v-window-item value="three" class="pa-6 pl-10 card__item">
          Дополнительные рассходы при доставке
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>

  <TheDialogsWindow
    :dialog-active="dialog"
    @close-dialog-window="closeDialogWindow"
  />
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { VTouch } from "vuetify/lib/directives";
import TheAddLine from "@/components/TheAddLine.vue";
import TheTable from "@/components/table/TheTable.vue";
import TheDialogsWindow from "@/components/TheDialogsWindow.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default {
  name: "TheLoad",
  data: () => ({
    tab: "two",
    itemTabs: [
      { title: "Общее", tab: "one" },
      { title: "Товар списания", tab: "two" },
      { title: "Доп. расходы", tab: "three" },
    ],
    page: "",
    saveTemplate: false,
    dialog: false,
    menuWindowActive: false,
  }),
  components: { TheAddLine, TheTable, TheDialogsWindow, BaseIcon },
  directives: {
    VTouch,
  },

  computed: {
    ...mapGetters(["getProducts", "getMenuWindow"]),
  },

  watch: {
    getMenuWindow(value) {
      this.menuWindowActive = value;
    },
  },

  methods: {
    ...mapActions([
      "addLoadLine",
      "setChangeColumns",
      "setValue",
      "setMenuWindow",
    ]),

    addLoad() {
      const current_date = new Date();
      const id = Math.floor(current_date.getTime() / 1000);

      this.addLoadLine({
        action: "",
        name: "Тестовое наименование еденицы",
        newCol: "Тестовое поле ",
        price: 0,
        quantity: 0,
        product: "Тестовое название товара",
        total: "0000",
        id,
      });

      this.setValue({ name: "new_order_lines", value: this.getProducts });
    },

    openPage(page) {
      this.page = page;
    },

    onSave() {
      this.saveTemplate = true;
      setTimeout(() => {
        this.saveTemplate = false;
      }, 1000);
    },

    openDialogWindow() {
      this.dialog = true;
    },

    closeDialogWindow(save) {
      this.dialog = false;
      save &&
        this.setValue({ name: "new_order_lines", value: this.getProducts });
    },

    capitalizeFirstLetter(title) {
      return title[0].toUpperCase() + title.slice(1);
    },
    openMenuWindow() {
      this.setMenuWindow(true);
    },
  },
};
</script>



<style scoped lang="scss">
h1 {
  font-family: MyriadPro;
  font-size: 30px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: black;
}
.wrapper {
  width: 100vw;
  height: 100vh;
}

.right__column {
  width: calc(100% - 229px);
  border-radius: 0;
  padding: 25px;
  padding-left: 0;
}
.card__container {
  -ms-touch-action: pan-y;
  touch-action: pan-y;
}
.tab {
  color: #1253a2;
  font-family: MyriadPro;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-transform: none !important;
}
.tab__active {
  color: black;
}

@media (max-width: 678px) {
  .tab {
    padding: 0 10px;
  }

  .card__item {
    padding: 10px !important;
  }
}
</style>