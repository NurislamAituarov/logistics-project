<template>
  <v-card class="right__column">
    <v-tabs v-model="tab" class="tabs" bg-color="blue-grey-darken-1">
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one"> One </v-window-item>

        <v-window-item value="two" class="pa-5">
          <TheAddLine @add-load="addLoad" />
          <TheTable
            :saveTemplate="saveTemplate"
            @on-save="onSave"
            @open-dialog-window="openDialogWindow"
          />
        </v-window-item>

        <v-window-item value="three"> Three </v-window-item>
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
    tab: null,
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
  },
};
</script>


<style scoped lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
}

.right__column {
  width: calc(100% - 229px);
  border-radius: 0;
}
</style>