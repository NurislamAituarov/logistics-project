<template>
  <div class="block__add">
    <BaseBtn color="black" :height="35" @click="$emit('add-load')">
      <BaseIcon name="plus" width="13px" color="white" />
      Добавить строку
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