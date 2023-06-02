<template>
  <BaseTooltip
    v-if="preparedText.length > +currentMaxSymbols"
    ref="activator"
    :nudge-right="0"
    triangle-side="center"
    activator="hover"
  >
    <template #activator="{ attrs, on }">
      <span v-bind="attrs" v-on="on">
        {{ preparedText.slice(0, +currentMaxSymbols) }}...
      </span>
    </template>

    {{ preparedText }}
  </BaseTooltip>
  <span v-else ref="activator">
    {{ preparedText }}
  </span>
</template>

<script>
import BaseTooltip from "@/components/base/baseTooltip";

export default {
  name: "TextTruncate",

  components: {
    BaseTooltip,
  },

  props: {
    text: { type: [String, Number], default: null },
    maxSymbols: { type: [String, Number], default: 20 },
    autoWidth: { type: Boolean, default: false },
  },

  data() {
    return {
      currentMaxSymbols: this.maxSymbols,
    };
  },

  computed: {
    preparedText() {
      return `${this.text}`;
    },
  },

  mounted() {
    if (this.autoWidth) {
      const requiredNode = this.$refs.activator.$el
        ? this.$refs.activator.$el.parentNode
        : this.$refs.activator.parentNode;

      const fontSize = parseFloat(
        window.getComputedStyle(requiredNode).getPropertyValue("font-size")
      );

      this.currentMaxSymbols = requiredNode.clientWidth / fontSize;
    }
  },
};
</script>
