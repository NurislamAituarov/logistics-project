<template>
  <div class="pl-10 mb-5 d-flex align-center container__title">
    <BaseIcon
      name="drag"
      width="20"
      class="mt-2 menu-burger"
      @click="openMenuWindow"
    />
    <h1 class="pa-5">New Page</h1>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default {
  name: "TheBid",
  components: { BaseIcon },
  data() {
    return {
      itemsPerPage: 5,
    };
  },
  computed: {},

  watch: {},

  mounted() {},

  methods: {
    ...mapActions(["setMenuWindow"]),

    openMenuWindow() {
      this.setMenuWindow(true);
    },
  },
};
</script>


<style scoped lang="scss">
.container__title {
  height: max-content;
  padding-left: 20px !important;
}
</style>