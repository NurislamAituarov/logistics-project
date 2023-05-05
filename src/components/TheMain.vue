<template>
  <div class="wrapper d-flex">
    <TheLeftColumn @open-page="openPage" />

    <v-card v-if="page === 'Load'" class="right__column">
      <v-tabs v-model="tab" class="tabs" bg-color="grey-darken-1">
        <v-tab value="one">Item One</v-tab>
        <v-tab value="two">Item Two</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one"> One </v-window-item>

          <v-window-item value="two" class="pa-5">
            <TheAddLine @add-load="addLoad" />
            <TheTable />
          </v-window-item>

          <v-window-item value="three"> Three </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TheAddLine from "./TheAddLine.vue";
import TheTable from "./TheTable.vue";
import TheLeftColumn from "./TheLeftColumn.vue";

export default {
  components: {
    TheTable,
    TheAddLine,
    TheLeftColumn,
  },

  data: () => ({
    tab: null,
    page: "",
  }),

  methods: {
    ...mapActions(["fetchColumn"]),

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
  },
};
</script>


<style scoped lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
}

.right__column {
  width: 100%;
}
</style>