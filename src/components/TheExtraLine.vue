<template>
  <div class="extra_line">
    <div class="d-flex align-center">
      <p
        v-if="saveChange && saveChange === 'change'"
        @click="$emit('on-save')"
        class="btn-save_template mr-5"
      >
        Сохранить изменение
      </p>
      <p
        v-if="saveChange && saveChange === 'pending'"
        class="btn-save_template mr-5"
      >
        Сохранено
      </p>
      <v-menu :location="location">
        <template v-slot:activator="{ props }">
          <BaseIcon
            class="btn_setting"
            name="setting"
            width="16"
            height="16"
            color="#a6b7d4"
            :activator="props"
            v-bind="props"
          />
        </template>

        <v-list class="setting_list">
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>


<script>
import BaseIcon from "./icons/BaseIcon.vue";

export default {
  name: "TheExtraLine",
  props: {
    saveChange: { type: Boolean || String, default: false },
  },
  data() {
    return {
      items: [{ title: "Отображение столбцов" }, { title: "Порядок столбцов" }],
      location: "bottom",
    };
  },
  components: { BaseIcon },
};
</script>


<style scoped lang="scss">
.extra_line {
  width: 100%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px 10px 0 0;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 15px;
}
.btn-save_template {
  cursor: pointer;
  &:hover {
    color: #1253a2;
    transition: 0.3s;
  }
}

.btn_setting {
  cursor: pointer;
  width: fit-content;
}
</style>