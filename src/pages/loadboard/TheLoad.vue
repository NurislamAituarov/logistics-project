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
          <TheTable :saveTemplate="saveTemplate" @on-save="onSave" />
        </v-window-item>

        <v-window-item value="three"> Three </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>


<script>
import { mapActions } from "vuex";

import TheAddLine from "@/components/TheAddLine.vue";
import TheTable from "@/components/TheTable.vue";

export default {
  name: "TheLoad",
  data: () => ({
    tab: null,
    page: "",
    saveTemplate: false,
  }),
  components: { TheAddLine, TheTable },

  methods: {
    ...mapActions(["fetchColumn", "setChangeColumns"]),

    addLoad() {
      this.fetchColumn({
        one: "",
        action: "",
        name: "Мраморный",
        price: 0,
        quantity: 0,
        product: "fffffff",
        total: "0000",
      });
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