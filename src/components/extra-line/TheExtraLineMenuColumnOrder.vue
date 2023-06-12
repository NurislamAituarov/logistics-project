<template>
  <v-list v-if="activeItem === 'Порядок столбцов'" class="setting_list-headers">
    <v-list-item
      v-for="header in showUpdateHeaders"
      :key="header.key"
      :class="{
        disable: header.key === 'action' || header.key === 'total',
      }"
    >
      <BaseIcon
        class="combined-shape headerHandle mr-4"
        name="dragV2"
        width="20"
        height="20"
        color="#A6B7D4"
      />
      {{ header.title }}
    </v-list-item>
  </v-list>
</template>

<script>
import BaseIcon from "../icons/BaseIcon.vue";

export default {
  name: "TheExtraLineMenuColumnOrder",
  props: {
    activeItem: { type: String, default: "" },
    showUpdateHeaders: { type: Array, default: () => [] },
  },
  components: { BaseIcon },
};
</script>


<style scoped>
.v-list-item ::v-deep div {
  display: flex;
}
.setting_list-headers {
  width: 210px;
}

.disable {
  opacity: 0.5;
  pointer-events: none;
}
.setting_list-headers::v-deep .sortable-ghost_header {
  transform: scale(0.95) !important;
  opacity: 0.5;
  border: 2px dashed #a6b7d4 !important;
  border-radius: 5px;
}
</style>