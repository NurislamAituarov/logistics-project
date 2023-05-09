<template>
  <div class="d-flex align-center" :class="{ container__icon: shadow }">
    <svg
      class="icon"
      :class="classSetting"
      :width="width || 3"
      :height="height || 13"
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
  props: ["name", "color", "shadow", "width", "height", "activator"],

  data() {
    return {
      path: icons[this.name],
      fill: icons[this.color],
      classSetting: "",
    };
  },

  watch: {
    activator(value) {
      if (value["aria-expanded"] === "true") {
        this.classSetting = "setting_active";
      } else {
        this.classSetting = "";
      }
    },
  },

  mounted() {
    if (this.name === "setting") this.classSetting = "setting_hover";
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

.setting_hover:hover {
  fill: #1253a2;
  transition: 0.3s;
}
.setting_active {
  fill: #1253a2;
  transition: 0.3s;
}
</style>