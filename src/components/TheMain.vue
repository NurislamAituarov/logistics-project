<template>
  <div class="wrapper d-flex">
    <TheLeftColumn />

    <router-view> </router-view>
  </div>
</template>

<script>
import TheLeftColumn from "./TheLeftColumn.vue";

export default {
  components: {
    TheLeftColumn,
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