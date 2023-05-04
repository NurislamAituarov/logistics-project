<template>
  <div class="block__add">
    <v-btn prepend-icon color="blue">
      <BaseIcon name="plus" color="black" /> Добавить строку
    </v-btn>
  </div>
</template>


<script>
import BaseIcon from "./svg/BaseIcon.vue";

export default {
  name: "TheAddLine",

  components: {
    BaseIcon,
  },
};
</script>


<style scoped>
.block__add {
  padding: 20px 25px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  margin-bottom: 25px;
}

.btn {
  gap: 10px;
}
</style>