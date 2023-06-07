<template>
  <div class="pl-15 mb-5 d-flex align-start container__title">
    <BaseIcon
      name="drag"
      width="20"
      class="mt-5 menu-burger"
      @click="openMenuWindow"
    />
    <h1 class="pa-2">Название: {{ item.name }}</h1>
  </div>
</template>

<script>
import BaseIcon from "@/components/icons/BaseIcon.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MyLoad",
  components: { BaseIcon },

  data() {
    return {
      item: "",
    };
  },

  computed: {
    ...mapGetters(["getProducts"]),
  },

  created() {
    this.item = this.getProducts.filter(
      (el) => el.id == this.$route.params.key.replace(/\D/g, "")
    )[0];
  },

  mounted() {},

  methods: {
    ...mapActions(["setMenuWindow"]),

    openMenuWindow() {
      this.setMenuWindow(true);
    },
  },
};
</script>

<style scoped>
.container__title {
  height: max-content;
  padding-left: 20px !important;
}
</style>