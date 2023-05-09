<template>
  <div class="extra_line">
    <div class="d-flex align-center">
      <p
        v-if="saveChange && saveChange === 'change'"
        @click="onSave"
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

  <v-data-table
    ref="table"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="columns"
    item-value="name"
    class="elevation-1 data__table"
  >
    <template v-slot:item="{ item, index }">
      <tr>
        <td class="d-flex justify-space-around align-center">
          {{ index + 1 }}
          <BaseIcon name="options" color="#a6b7d4" shadow="true" />
        </td>
        <td>
          <div class="wrapper__column tbody__column">
            {{ item.columns.name }}

            <div class="tbody__column-redirect"></div>
          </div>
        </td>
        <td>
          <div class="wrapper__column">
            {{ item.columns.price }}
          </div>
        </td>
        <td>
          <div class="wrapper__column">
            {{ item.columns.quantity }}
          </div>
        </td>
        <td>
          <div class="wrapper__column">
            {{ item.columns.product }}
          </div>
        </td>
        <td>
          <div class="wrapper__column">{{ item.columns.total }}</div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import BaseIcon from "@/components/icons/BaseIcon.vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TheTable",
  components: {
    VDataTable,
    BaseIcon,
  },

  props: {
    saveTemplate: { type: Boolean, default: false },
  },

  data() {
    return {
      itemsPerPage: 5,
      headers: [
        {
          title: "Действие",
          align: "start",
          sortable: false,
          key: "action",
        },
        {
          title: "Наименование еденицы",
          align: "start",
          sortable: false,
          key: "name",
        },
        { title: "Цена", align: "start", sortable: false, key: "quantity" },
        { title: "Кол-во", align: "start", sortable: false, key: "price" },
        {
          title: "Название товара",
          align: "start",
          sortable: false,
          key: "product",
        },
        { title: "Итого", align: "start", sortable: false, key: "total" },
      ],
      columns: [],
      saveChange: false,

      items: [{ title: "Отображение столбцов" }, { title: "Порядок столбцов" }],
      location: "bottom",
    };
  },
  computed: {
    ...mapGetters(["getProducts", "getValue", "getChangeColumns"]),
  },

  watch: {
    getColumns(items) {
      this.columns = items;
    },

    saveTemplate(value) {
      if (value) {
        this.saveTemplateSizeColumn();
      }
    },
  },

  mounted() {
    this.columns = this.getProducts;
    this.updateSizeColumn();
    setTimeout(() => {
      this.getDataTableHTML();
    });
  },

  methods: {
    ...mapActions(["setValue", "setChangeColumns"]),

    saveTemplateSizeColumn() {
      let tables = document.getElementsByTagName("table");
      for (let i = 0; i < tables.length; i++) {
        resizableGrid(tables[i]);
      }
      function resizableGrid(table) {
        let row = table.getElementsByTagName("tr")[0],
          cols = row ? row.children : undefined;
        for (let i = 0; i < cols.length; i++) {
          localStorage.setItem(
            `size_column_${i + 1}`,
            JSON.stringify(cols[i].style.width)
          );
        }
      }
    },

    updateSizeColumn() {
      const column1 = this.getValue("size_column_1");
      const column2 = this.getValue("size_column_2");
      const column3 = this.getValue("size_column_3");
      const column4 = this.getValue("size_column_4");
      const column5 = this.getValue("size_column_5");
      const column6 = this.getValue("size_column_6");

      let tables = document.getElementsByTagName("table");
      for (let i = 0; i < tables.length; i++) {
        resizableGrid(tables[i]);
      }
      function resizableGrid(table) {
        let row = table.getElementsByTagName("tr")[0],
          cols = row ? row.children : undefined;
        for (let i = 0; i < cols.length; i++) {
          if (column1 && i + 1 === 1) cols[i].style.width = `${column1}`;
          if (column2 && i + 1 === 2) cols[i].style.width = `${column2}`;
          if (column3 && i + 1 === 3) cols[i].style.width = `${column3}`;
          if (column4 && i + 1 === 4) cols[i].style.width = `${column4}`;
          if (column5 && i + 1 === 5) cols[i].style.width = `${column5}`;
          if (column6 && i + 1 === 6) cols[i].style.width = `${column6}`;
        }
      }
    },

    getDataTableHTML() {
      let tables = document.getElementsByTagName("table");
      const thisCopy = this;
      for (let i = 0; i < tables.length; i++) {
        resizableGrid(tables[i]);
      }

      function resizableGrid(table) {
        let row = table.getElementsByTagName("tr")[0],
          cols = row ? row.children : undefined;
        if (!cols) return;

        [...row.children].forEach((el, i) => {
          el.style.borderRight = "1px solid rgb(0, 0, 0, 0.12)";
          el.style.borderLeft = "none";
          if (i === [...row.children].length - 1) {
            el.style.borderRadius = "0 10px 0 0";
            el.style.borderRight = "none";
          }
          if (i === 0) {
            el.style.borderRadius = "10px 0 0 0";
          }
        });

        table.style.overflow = "hidden";

        let tableHeight = 54;

        for (let i = 0; i < cols.length; i++) {
          let div = createDiv(tableHeight);
          cols[i].appendChild(div);
          cols[i].style.position = "relative";
          setListeners(div);
        }

        function setListeners(div) {
          let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

          div.addEventListener("mousedown", function (e) {
            curCol = e.target.parentElement;
            nxtCol = curCol.nextElementSibling;
            pageX = e.pageX;

            let padding = paddingDiff(curCol);

            curColWidth = curCol.offsetWidth - padding;
            if (nxtCol) nxtColWidth = nxtCol.offsetWidth - padding;
          });

          div.addEventListener("mouseover", function (e) {
            e.target.style.borderRight = "2px solid grey";
          });

          div.addEventListener("mouseout", function (e) {
            e.target.style.borderRight = "";
          });

          document.addEventListener("mousemove", function (e) {
            if (curCol) {
              thisCopy.saveChange = "change";
              let diffX = e.pageX - pageX;
              if (nxtCol) nxtCol.style.width = nxtColWidth - diffX + "px";
              curCol.style.width = curColWidth + diffX + "px";
            }
          });

          document.addEventListener("mouseup", function () {
            curCol = undefined;
            nxtCol = undefined;
            pageX = undefined;
            nxtColWidth = undefined;
            curColWidth = undefined;
          });
        }

        function createDiv(height) {
          let div = document.createElement("div");
          div.style.top = 0;
          div.style.right = 0;
          div.style.width = "5px";
          div.style.position = "absolute";
          div.style.cursor = "col-resize";
          div.style.userSelect = "none";
          div.style.height = height + "px";
          return div;
        }

        function paddingDiff(col) {
          if (getStyleVal(col, "box-sizing") == "border-box") {
            return 0;
          }

          let padLeft = getStyleVal(col, "padding-left");
          let padRight = getStyleVal(col, "padding-right");
          return parseInt(padLeft) + parseInt(padRight);
        }

        function getStyleVal(elm, css) {
          return window.getComputedStyle(elm, null).getPropertyValue(css);
        }
      }
    },

    onSave() {
      this.saveChange = "pending";
      this.$emit("on-save");
      setTimeout(() => {
        this.saveChange = false;
      }, 500);
    },
  },
};
</script>


<style scoped lang="scss">
.data__table {
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border-radius: 0 0 10px 10px;
  border: 1px solid rgb(0, 0, 0, 0.12) !important;
}

td {
  border: none !important;
}
.v-data-table ::v-deep th {
  font-family: MyriadPro;
  font-size: 16px !important;
  font-weight: 600 !important;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: black !important;
}

.wrapper__column {
  position: relative;
  padding: 10px 15px;
  border: 1px solid#cccccc;
  border-radius: 5px;
}

.tbody__column {
  font-family: MyriadPro;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  overflow: hidden;
  padding-right: 25px;
  color: black;
}

.tbody__column-redirect {
  position: absolute;
  top: 0;
  right: 0;
  width: 21px;
  height: 100%;
  background-color: #cccccc;
}
.tbody__column-redirect:hover {
  cursor: pointer;
}

.btn_setting {
  cursor: pointer;
  width: fit-content;
}

.setting_list {
  width: max-content !important;
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
</style>