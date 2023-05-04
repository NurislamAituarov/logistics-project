<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="blue-grey-lighten-2 mb-3">
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
</template>

<script>
import TheAddLine from "./TheAddLine.vue";
import TheTable from "./TheTable.vue";

export default {
  components: {
    TheTable,
    TheAddLine,
  },

  data: () => ({
    tab: null,
  }),

  methods: {
    addLoad() {
      console.log("addLoad");
    },
  },
};
</script>
