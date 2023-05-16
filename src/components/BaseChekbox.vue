<template>
  <v-checkbox
    :input-value="value"
    :true-value="true"
    :false-value="false"
    :label="label"
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
  },
};
</script>