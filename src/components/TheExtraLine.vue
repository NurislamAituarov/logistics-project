<template>
  <div class="extra_line">
    <div class="d-flex align-center">
      <p
        v-if="saveChange && saveChange === 'change'"
        @click="$emit('on-save-change')"
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
      <v-menu
        location="bottom"
        :close-on-content-click="false"
        v-model="menuOpen"
      >
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

        <v-list v-if="!activeItem" class="setting_list">
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title
              @click="onSelectedSetting(item.title)"
              class="list__item-title"
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>

        <v-list v-else class="setting_list-headers">
          <v-list-item v-for="(item, index) in headers" :key="index">
            <BaseCheckbox
              :label="item.key"
              :value="item.show"
              :disabled="item.key === 'action' || item.key === 'total'"
              @input="onChange($event, item.key)"
            />
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import BaseIcon from "./icons/BaseIcon.vue";
import BaseCheckbox from "./BaseChekbox.vue";

export default {
  name: "TheExtraLine",
  components: {
    BaseCheckbox,
    BaseIcon,
  },
  props: {
    saveChange: { type: [Boolean, String], default: false },
  },
  data() {
    return {
      headers: [],
      items: [{ title: "Отображение столбцов" }, { title: "Порядок столбцов" }],
      itemColumns: [
        {
          name: "Item #1",
          id: 1,
        },
        {
          name: "Item #2",
          id: 2,
        },
        {
          name: "Item #3",
          id: 3,
        },
      ],
      activeItem: "",
      menuOpen: false,
    };
  },

  watch: {
    activeItem() {
      console.log(this.$refs.refCheckbox);
    },
    menuOpen(value) {
      if (value) this.activeItem = "";
    },

    getHeaders: {
      handler(items) {
        this.headers = items;
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters(["getHeaders"]),
  },

  mounted() {
    this.headers = this.getHeaders;
  },

  updated() {},

  methods: {
    ...mapActions(["setChangeDisabled"]),

    onSelectedSetting(value) {
      this.activeItem = value;
    },

    onChange(e, key) {
      this.setChangeDisabled({ show: e.target.checked, key });
    },
  },
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

.list__item-title {
  cursor: pointer;
  &:hover {
    color: #1253a2;
  }
}

.setting_list-headers {
  width: 210px;
}
</style>