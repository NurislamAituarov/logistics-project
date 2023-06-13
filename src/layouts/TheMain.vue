<template>
  <div class="wrapper d-flex">
    <TheLeftColumn />

    <router-view> </router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheLeftColumn from "../components/TheLeftColumn.vue";

export default {
  components: {
    TheLeftColumn,
  },

  computed: {
    ...mapGetters(["getValue"]),
  },

  created() {
    this.$router.push(`/load`);
    this.getValueStorage();
  },

  methods: {
    ...mapActions(["setStorageHeaders", "setStorageColumns"]),

    getValueStorage() {
      this.getValue("new_order_headers") &&
        this.setStorageHeaders(this.getValue("new_order_headers"));

      this.getValue("new_order_lines") &&
        this.setStorageColumns(this.getValue("new_order_lines"));
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