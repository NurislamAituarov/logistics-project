<template>
  <v-checkbox
    v-model="checked"
    :input-value="value"
    :true-value="true"
    :false-value="false"
    :label="label"
    :disabled="disabled"
    color="#1253a2"
    hide-details
    off-icon="$iconCheckbox"
    on-icon="$iconCheckboxActive"
    @change="$emit('input', $event)"
  />
</template>
  
<script>
export default {
  name: "BaseCheckbox",

  props: {
    value: { type: Boolean, default: false },
    label: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
  },

  data() {
    return {
      checked: false,
    };
  },

  watch: {
    valueChanged(value) {
      this.checked = value;
    },
  },

  mounted() {
    this.checked = this.value;
  },
};
</script>