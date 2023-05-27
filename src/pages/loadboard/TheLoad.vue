<template>
  <v-card class="right__column">
    <h1 class="pl-10">Проведение ТО и мелкий ремонт</h1>

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

    <v-card-text class="pa-0 mt-5">
      <v-window v-model="tab">
        <v-window-item value="one" class="pa-6 pl-10"> One </v-window-item>

        <v-window-item value="two" class="pa-6 pl-10">
          <TheAddLine @add-load="addLoad" />
          <TheTable
            :saveTemplate="saveTemplate"
            @on-save="onSave"
            @open-dialog-window="openDialogWindow"
          />
        </v-window-item>

        <v-window-item value="three" class="pa-6 pl-10"> Three </v-window-item>
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

import TheAddLine from "@/components/TheAddLine.vue";
import TheTable from "@/components/TheTable.vue";
import TheDialogsWindow from "@/components/TheDialogsWindow.vue";

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
  }),
  components: { TheAddLine, TheTable, TheDialogsWindow },

  computed: {
    ...mapGetters(["getProducts"]),
  },

  methods: {
    ...mapActions(["fetchColumn", "setChangeColumns", "setValue"]),

    addLoad() {
      const current_date = new Date();
      const id = Math.floor(current_date.getTime() / 1000);

      this.fetchColumn({
        one: "",
        action: "",
        name: "Мраморный",
        newCol: "Тестовое поле ",
        price: 0,
        quantity: 0,
        product: "Тестовое название",
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
  margin-bottom: 20px;
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
</style>