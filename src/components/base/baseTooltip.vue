<template>
  <v-tooltip
    v-model="open"
    :attach="attach"
    :close-delay="100"
    :open-delay="100"
    bottom
    :open-on-click="activator === 'click'"
    :open-on-hover="activator === 'hover'"
    content-class="tooltip-content"
    :nudge-right="nudgeRight"
  >
    <template #activator="{ attrs, on }">
      <slot name="activator" v-bind="{ attrs, on }">
        <component
          :is="tag"
          v-click-outside="outsideClick"
          class="activator-text"
          :style="styles"
          v-bind="attrs"
          v-on="on"
        >
          {{ text }}
        </component>
      </slot>
    </template>

    <div
      class="tooltip-content__triangle"
      :class="[`${triangleSide}-side`]"
    ></div>

    <div
      v-if="activator === 'click' && !hideHeader"
      class="d-flex justify-space-between align-center mb-1"
    >
      <div class="tooltip-content__title">
        {{ title }}
      </div>
      <v-btn x-small icon @click="open = false">
        <v-icon class="tooltip-content__icon"> mdi-close </v-icon>
      </v-btn>
    </div>

    <div
      class="tooltip-content__content"
      :style="{ maxWidth: contentMaxWidth }"
    >
      <slot />
    </div>
  </v-tooltip>
</template>

<script>
export default {
  name: "BaseTooltip",

  props: {
    attach: { type: [Object, String], default: undefined },
    text: { type: String, default: "" },
    title: { type: String, default: "" },
    tag: { type: String, default: "span" },
    activator: { type: String, default: "click" },
    nudgeRight: { type: Number, default: 80 },
    width: { type: String, default: "auto" },
    contentMaxWidth: { type: String, default: "auto" },
    maxCharacters: { type: Number, default: null },
    hideHeader: { type: Boolean, default: false },
    triangleSide: { type: String, default: "left" },
  },

  data() {
    return {
      open: false,
    };
  },

  computed: {
    styles() {
      return {
        maxWidth: this.maxCharacters ? `${this.maxCharacters}ch` : this.width,
      };
    },
  },

  methods: {
    outsideClick() {
      if (this.open) this.open = false;
    },
  },
};
</script>

<style scoped lang="scss">
// @import 'assets/styles/scss/variables';

.activator-text {
  // color: $blue !important;
  cursor: pointer;

  //&:hover {
  //  background-color: rgb(79, 143, 255, 0.2);
  //}
}

.tooltip-content {
  background: #ffffff !important;
  box-shadow: -1px -1px 4px #d2ddfa, 1px 1px 4px #a8aebb !important;
  padding: 8px !important;
  min-width: 150px !important;
  max-width: 400px !important;
  opacity: 1 !important;
  pointer-events: auto !important;

  &__triangle {
    width: 25px;
    height: 11px;
    position: absolute;
    top: -11px;
    overflow: hidden;

    &.left-side {
      left: 10px;
    }

    &.center-side {
      right: calc(50% - 12.5px);
    }

    &.right-side {
      right: 10px;
    }

    &:after {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      background: #ffffff;
      top: 10px;
      left: 50%;
      transform: rotate(45deg) translateX(-50%);
      box-shadow: -1px -1px 4px #d2ddfa;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    // color: $textColorblueGray !important;
    text-transform: uppercase;
  }

  &__icon {
    width: 10px;
    height: 10px;
    color: #8eb3de !important;
  }

  &__content {
    color: #31394d !important;
  }
}
</style>
