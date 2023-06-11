<template>
  <v-list
    v-if="activeItem === 'Отображение столбцов'"
    class="setting_list-headers"
  >
    <v-list-item v-for="(item, index) in headers" :key="index">
      <BaseCheckbox
        :label="item.title"
        :value="item.show"
        :disabled="item.key === 'action' || item.key === 'total'"
        @input="onChange($event, item.key, index)"
      />
    </v-list-item>
  </v-list>
</template>


<script>
import { mapActions } from "vuex";
import BaseCheckbox from "../base/BaseCheckbox.vue";

export default {
  name: "TheExtraLineMenuColumnDisplay",
  components: { BaseCheckbox },
  props: {
    activeItem: { type: String, default: "" },
    headers: { type: Array, default: () => [] },
  },

  methods: {
    ...mapActions(["setChangeDisabled"]),

    onChange(e, key, index) {
      this.setChangeDisabled({ show: e.target.checked, key, index });
    },
  },
};
</script>