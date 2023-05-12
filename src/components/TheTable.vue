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

  <v-data-table
    ref="table"
    :headers="headers"
    :items="columns"
    :items-per-page="itemsPerPage"
    :pagination="pagination"
    select-all
    hide-default-footer
    height="400"
    fixed-header
    item-value="name"
    class="elevation-1 data__table"
  >
    <template v-slot:headers="{ headers }">
      <tr id="sort_key">
        <th
          v-for="header of headers.flat()"
          :key="header.title"
          :class="[
            'column sortable',
            pagination.descending ? 'desc' : 'asc',
            header.key === pagination.sortBy ? 'active' : '',
            header.key === 'action' ? 'column_action' : '',
          ]"
        >
          {{ header.title }}
        </th>
      </tr>
    </template>

    <template v-slot:item="{ item, index }">
      <tr>
        <td class="d-flex justify-space-between align-center">
          <BaseIcon
            class="combined-shape rowHandle"
            name="dragV2"
            width="20"
            height="20"
            color="#A6B7D4"
          />
          {{ index + 1 }}
          <BaseIcon name="options" color="#a6b7d4" shadow="true" />
        </td>
        <td>
          <div
            class="wrapper__column"
            :class="{ tbody__column: headers[1].key === 'name' }"
          >
            <!-- {{ item.columns.name }} -->
            {{ item.columns[headers[1]["key"]] }}
            <div
              v-if="headers[1].key === 'name'"
              class="tbody__column-redirect"
            >
              <p class="right-arrow_2"></p>
            </div>
          </div>
        </td>
        <td>
          <div class="wrapper__column">
            <!-- {{ item.columns.price }} -->
            {{ item.columns[headers[2]["key"]] }}
            <div
              v-if="headers[2].key === 'name'"
              class="tbody__column-redirect"
            ></div>
          </div>
        </td>
        <td>
          <div class="wrapper__column">
            <!-- {{ item.columns.quantity }} -->
            {{ item.columns[headers[3]["key"]] }}
            <div
              v-if="headers[3].key === 'name'"
              class="tbody__column-redirect"
            ></div>
          </div>
        </td>
        <td>
          <div class="wrapper__column">
            <!-- {{ item.columns.product }} -->
            {{ item.columns[headers[4]["key"]] }}
            <div
              v-if="headers[4].key === 'name'"
              class="tbody__column-redirect"
            ></div>
          </div>
        </td>
        <td>
          <div class="wrapper__column">
            <!-- {{ item.columns.total }}  -->
            {{ item.columns[headers[5]["key"]] }}
            <div
              v-if="headers[5].key === 'name'"
              class="tbody__column-redirect"
            ></div>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Sortable from "sortablejs";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import { VDataTable } from "vuetify/labs/VDataTable";

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
      itemsPerPage: 25,
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
        { title: "Цена", align: "start", sortable: false, key: "price" },
        { title: "Кол-во", align: "start", sortable: false, key: "quantity" },
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

      pagination: {
        sortBy: "name",
      },
      selected: [],

      newOrderHeaders: [],
    };
  },
  computed: {
    ...mapGetters([
      "getHeaders",
      "getProducts",
      "getValue",
      "getChangeColumns",
    ]),
  },

  watch: {
    getProducts: {
      handler(newValue) {
        this.columns = newValue;
        this.itemsPerPage = newValue.length;
      },
      deep: true,
    },

    saveTemplate(value) {
      if (value) {
        this.saveTemplateSizeColumn();
      }
    },

    getHeaders(items) {
      this.headers = items;
    },

    headers: {
      handler(newValue) {
        this.newOrderHeaders = newValue;
      },
      deep: true,
    },

    // columns: {
    //   handler(newValue) {
    //     this.columns = newValue;
    //   },
    //   deep: true,
    // },
  },

  mounted() {
    this.columns = this.getProducts;
    this.headers = this.getValue("new_order_headers") || this.getHeaders;

    this.updateSizeColumn();
    setTimeout(() => {
      this.getDataTableHTML();
    });

    let table = document.querySelector("table tbody");
    const _self = this;
    Sortable.create(table, {
      handle: ".rowHandle",
      onEnd({ newIndex, oldIndex }) {
        // const rowSelected = _self.columns.splice(oldIndex, 1)[0];
        // _self.columns.splice(newIndex, 0, rowSelected);
        console.log(oldIndex, newIndex, _self.columns);
      },
      ghostClass: "sortable-ghost",
    });

    // Sort Columns

    this.$nextTick(() => {
      const element = document.getElementById("sort_key");

      const _self = this;
      Sortable.create(element, {
        onEnd({ newIndex, oldIndex }) {
          const headerSelected = _self.headers.splice(oldIndex, 1)[0];
          _self.headers.splice(newIndex, 0, headerSelected);
          _self.saveChange = "change";
        },
      });
    });
  },

  updated() {
    console.log("update");
  },

  methods: {
    ...mapActions(["setValue", "setChangeColumns"]),
    onDragEnd(event) {
      this.headers = event.list;
    },

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
            el.style.pointerEvents = "none";
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
      this.setNewOrderHeaders(this.newOrderHeaders);
      setTimeout(() => {
        this.saveChange = false;
      }, 500);
    },

    setNewOrderHeaders(newValue) {
      this.setValue({ name: "new_order_headers", value: newValue });
    },
    // Sort Columns
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

  &:not(:first-child) {
  }
}

.v-data-table ::v-deep {
  th {
    font-family: MyriadPro;
    font-size: 16px !important;
    font-weight: 600 !important;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: black !important;
    cursor: move;
  }
}
.v-data-table ::v-deep .v-table__wrapper {
  &::-webkit-scrollbar {
    width: 5px;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a6b7d4;
    border-radius: 5px;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  .right-arrow_2 {
    border: 5px solid transparent;
    display: inline-flex;
    border-left: 5px solid gray;
    border-right: none;
  }
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

.sortable-ghost {
  border: 1px dashed red !important;
  background: red;
  // display: none;
}

.combined-shape {
  cursor: pointer;
}

.v-data-table ::v-deep .v-data-table-footer {
  display: none;
}

.column_action {
  pointer-events: none;
}
</style>