<template>
  <div v-if="preparedText.length > +currentMaxSymbols">
    <v-tooltip :text="preparedText" location="bottom">
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          {{ preparedText.slice(0, +currentMaxSymbols) }}...
        </div>
      </template>
    </v-tooltip>
  </div>
  <span v-else ref="activator">
    {{ preparedText }}
  </span>
</template>

<script>
export default {
  name: "TextTruncate",

  components: {},

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
