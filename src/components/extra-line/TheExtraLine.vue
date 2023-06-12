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

        <TheExtraLineMenuColumnDisplay
          :headers="headers"
          :activeItem="activeItem"
        />

        <TheExtraLineMenuColumnOrder
          :showUpdateHeaders="showUpdateHeaders"
          :activeItem="activeItem"
        />
      </v-menu>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import BaseIcon from "../icons/BaseIcon.vue";
import { changeSortHeaders } from "@/lib/helpers";
import TheExtraLineMenuColumnDisplay from "./TheExtraLineMenuColumnDisplay.vue";
import TheExtraLineMenuColumnOrder from "./TheExtraLineMenuColumnOrder.vue";

export default {
  name: "TheExtraLine",
  components: {
    BaseIcon,
    TheExtraLineMenuColumnDisplay,
    TheExtraLineMenuColumnOrder,
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
        this.headers = items;
      },
      deep: true,
    },

    activeItem(value) {
      if (value === "Порядок столбцов") {
        this.showUpdateHeaders = this.getValue("new_order_headers_cut");

        setTimeout(() => {
          const element = document.querySelector(".setting_list-headers");
          this.changeSortHeaders(element, this, "Порядок");
        });
      }
    },

    showUpdateHeaders: {
      handler(headers) {
        if (this.activeItem === "Порядок столбцов") {
          this.setValue({
            name: "new_order_headers_cut",
            value: headers,
          });
        }
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
    ...mapActions(["setValue"]),

    onSelectedSetting(value) {
      this.animActive = value;
      setTimeout(() => {
        this.activeItem = value;
        this.animActive = null;
      }, 300);
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

.anim__icon {
  transition: 0.5s;
  transform: translateX(8px);
}

.anim__icon-setting {
  transition: 1s;
  transform: rotateZ(360deg);
}
</style>