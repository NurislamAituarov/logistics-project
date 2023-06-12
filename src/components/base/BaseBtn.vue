<template>
  <v-btn
    :block="block"
    :elevation="0"
    :plain="plain"
    :icon="icon"
    :width="width"
    :height="height"
    :loading="loading"
    :disabled="disabled"
    class="base-button base-btn"
    :class="[color, textColor ? `text-${textColor}` : '']"
  >
    <slot />
  </v-btn>
</template>
  
<script>
export default {
  name: "BaseBtn",
  props: {
    block: { type: Boolean, default: false },
    color: { type: String, default: "unset" },
    textColor: { type: String, default: "unset" },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    icon: { type: Boolean, default: false },
    width: { type: [Number, String], default: undefined },
    height: { type: [Number, String], default: undefined },
  },
};
</script>
  
<style scoped lang="scss">
.base-btn {
  &.lightblue {
    background-color: #f2f5f9 !important;
    border-color: #f2f5f9 !important;
  }
  &.blue {
    background-color: #2f73ea !important;
    border-color: #2f73ea !important;
    color: #ffffff !important;
  }
  &.blue-1 {
    background-color: #e1eeff !important;
    border-color: #e1eeff !important;
  }
  &.red {
    background-color: rgba(225, 0, 0, 0.7) !important;
    border-color: rgba(225, 0, 0, 0.7) !important;
    color: #ffffff !important;
  }
  &.gray {
    background-color: rgb(108, 117, 125) !important;
    border-color: rgb(108, 117, 125) !important;
    color: #ffffff !important;
  }

  &.darkBlue {
    background-color: #1253a2 !important;
    border-color: #1253a2 !important;
    color: #ffffff !important;
  }
  &.text {
    &-lightgray {
      color: #7f8da7;
    }
    &-blue-1 {
      color: #2f73ea;
    }
  }
}
</style>