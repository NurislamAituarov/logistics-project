<template>
  <div :class="{ container__icon: shadow }">
    <svg
      class="icon"
      width="3px"
      height="13px"
      viewBox="0 0 3 13"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      v-html="path"
      :fill="color"
    ></svg>
  </div>
</template>

<script>
import icons from "./icons";

export default {
  props: ["name", "color", "shadow"],

  data() {
    return {
      path: icons[this.name],
      fill: icons[this.color],
    };
  },
};
</script>

<style scoped>
.container__icon {
  width: 22px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.container__icon:hover {
  background-color: #a6b7d4;
  cursor: pointer;

  transition: 0.3s;
}

.container__icon:hover > .icon {
  fill: black;
}
</style>