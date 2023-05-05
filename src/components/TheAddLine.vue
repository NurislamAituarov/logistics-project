<template>
  <div class="block__add">
    <BaseBtn color="black" height="40" width="207" @click="onAddLoad">
      <template v-if="!loading">
        <BaseIcon name="plus" width="13px" color="white" />
        Добавить строку
      </template>
      <template v-else>
        <v-progress-circular
          indeterminate
          color="white"
          size="20"
          :width="3"
        ></v-progress-circular>
      </template>
    </BaseBtn>
  </div>
</template>


<script>
import BaseIcon from "./icons/BaseIcon.vue";
import BaseBtn from "./BaseBtn.vue";

export default {
  name: "TheAddLine",

  components: {
    BaseIcon,
    BaseBtn,
  },

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    onAddLoad() {
      this.loading = true;

      setTimeout(() => {
        this.$emit("add-load");
        this.loading = false;
      }, 1000);
    },
  },
};
</script>


<style scoped lang="scss">
.block__add {
  padding: 20px 25px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  margin-bottom: 25px;
}

.block__add .v-btn__content {
  div {
    margin-right: 10px;
  }
}
</style>