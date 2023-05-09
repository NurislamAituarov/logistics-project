<template>
  <div class="d-flex align-center" :class="{ container__icon: shadow }">
    <svg
      class="icon"
      :class="settingHover"
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
  props: ["name", "color", "shadow", "width", "height"],

  data() {
    return {
      path: icons[this.name],
      fill: icons[this.color],
    };
  },

  computed: {
    settingHover() {
      if (this.name === "setting") return "setting_hover";

      return "";
    },
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
</style>