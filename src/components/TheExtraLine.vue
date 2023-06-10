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
            :class="{
              btn_setting: true,
              'anim__icon-setting': menuOpen,
            }"
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
            <v-icon
              :color="animActive !== item.title ? 'grey darken-3' : '#1253a2'"
              :class="{ anim__icon: animActive === item.title }"
            >
              mdi-chevron-right</v-icon
            >
          </v-list-item>
        </v-list>

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

        <v-list
          v-if="activeItem === 'Порядок столбцов'"
          class="setting_list-headers"
        >
          <v-list-item v-for="header in showUpdateHeaders" :key="header.key">
            <BaseIcon
              :class="{
                disable: header.key === 'action' || header.key === 'total',
              }"
              class="combined-shape headerHandle mr-4"
              name="dragV2"
              width="20"
              height="20"
              color="#A6B7D4"
            />
            {{ header.title }}
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import BaseIcon from "./icons/BaseIcon.vue";
import BaseCheckbox from "./base/BaseChekbox.vue";
import { changeSortHeaders } from "@/lib/helpers";

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
      showUpdateHeaders: [],
      headers: [],
      items: [{ title: "Отображение столбцов" }, { title: "Порядок столбцов" }],
      activeItem: "",
      animActive: null,
      menuOpen: false,
    };
  },

  watch: {
    menuOpen(value) {
      if (value) this.activeItem = "";
    },

    getHeaders: {
      handler(items) {
        this.$emit("save-change-active");
        this.showUpdateHeaders = items;
      },
      deep: true,
    },

    activeItem(value) {
      if (value === "Порядок столбцов") {
        setTimeout(() => {
          const element = document.querySelector(".setting_list-headers");
          this.changeSortHeaders(element, this, "Порядок");
        });
      }
    },

    showUpdateHeaders: {
      handler(headers) {
        this.setValue({
          name: "new_order_headers_cut",
          value: headers,
        });
      },

      deep: true,
    },
  },

  computed: {
    ...mapGetters(["getHeaders", "getValue"]),
  },

  mounted() {
    this.headers = this.getHeaders;
    this.showUpdateHeaders =
      this.getValue("new_order_headers_cut") || this.getHeaders;
  },

  updated() {},

  methods: {
    ...mapActions(["setChangeDisabled", "setValue"]),

    onSelectedSetting(value) {
      this.animActive = value;
      setTimeout(() => {
        this.activeItem = value;
        this.animActive = null;
      }, 300);
    },

    onChange(e, key, index) {
      this.setChangeDisabled({ show: e.target.checked, key, index });
    },

    changeSortHeaders,
  },
};
</script>






<style scoped lang="scss">
.v-list-item ::v-deep div {
  display: flex;
}

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
  transition: 1s;
  transform: rotateZ(180deg);
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

.anim__icon {
  transition: 0.5s;
  transform: translateX(8px);
}

.anim__icon-setting {
  transition: 1s;
  transform: rotateZ(360deg);
}

.disable {
  opacity: 0.5;
  pointer-events: none;
}
</style>