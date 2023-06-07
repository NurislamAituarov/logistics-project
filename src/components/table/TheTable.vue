<template>
  <TheExtraLine
    v-if="getScreenWidth"
    :save-change="saveChange"
    @on-save-change="onSaveChange"
    @save-change-active="saveChange = 'change'"
  />

  <v-data-table
    v-if="getScreenWidth"
    ref="table"
    :headers="showUpdateHeaders"
    :items="columns"
    :items-per-page="itemsPerPage"
    :pagination="pagination"
    :height="tableHeight"
    select-all
    hide-default-footer
    fixed-header
    item-value="name"
    class="elevation-1 data__table"
  >
    <template v-slot:headers="{ headers }">
      <tr id="sort_key">
        <TheTableHeadersTh :headers="headers" :pagination="pagination" />
      </tr>
    </template>

    <template v-slot:item="{ item, index }">
      <tr :key="columnsKey">
        <TheTableColumnsTh
          :item="item"
          :index="index"
          :columns="columns"
          :showUpdateHeaders="showUpdateHeaders"
          @delete-line="deleteLine"
          @open-dialog-window="$emit('open-dialog-window')"
          @open-my-load-page="openMyLoadPage"
        />
      </tr>
    </template>
  </v-data-table>

  <TheTableMobile
    v-else
    :headers="showUpdateHeaders"
    :items="columns"
    @delete-line="deleteLine"
    @open-my-load-page="openMyLoadPage"
    @open-dialog-window="$emit('open-dialog-window')"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { VDataTable } from "vuetify/labs/VDataTable";

import TheExtraLine from "../TheExtraLine.vue";
import TheTableMobile from "./TheTableMobile.vue";
import TheTableHeadersTh from "./TheHeaders.vue";
import TheTableColumnsTh from "./TheColumns.vue";
import {
  saveTemplateSizeColumn,
  getDataTableHTML,
  changeSortColumns,
  changeSortHeaders,
} from "@/lib/helpers";

export default {
  name: "TheTable",
  components: {
    VDataTable,
    TheExtraLine,
    TheTableMobile,
    TheTableHeadersTh,
    TheTableColumnsTh,
  },

  props: {
    saveTemplate: { type: Boolean, default: false },
  },

  data() {
    return {
      itemsPerPage: 25,
      headers: [],
      columns: [],
      saveChange: false,

      pagination: {
        sortBy: "name",
      },
      selected: [],

      newOrderHeaders: [],
      newOrderLines: [],

      columnsKey: 0,
      hideColumns: [],
      showUpdateHeaders: [],

      width: 0,
    };
  },

  emits: ["on-save", "open-dialog-window"],

  computed: {
    ...mapGetters([
      "getHeaders",
      "getHeaderActive",
      "getProducts",
      "getValue",
      "getChangeColumns",
    ]),

    tableHeight() {
      const screenHeight = window.innerHeight;
      return `${screenHeight - 400}px`; // Set the table height to 60% of the screen height
    },

    getScreenWidth() {
      return this.width > 678;
    },
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
      handler(oldValue, newValue) {
        this.newOrderHeaders = oldValue;

        newValue.forEach((el) => {
          if (!el.show && !this.hideColumns.includes(el.key)) {
            this.hideColumns.push(el.key);
          }

          if (el.show && this.hideColumns.includes(el.key)) {
            this.hideColumns = [];
          }
        });
        this.getDataTableHTML(this);
      },
      deep: true,
    },

    getHeaderActive(item) {
      if (item.show) {
        this.showUpdateHeaders = this.showUpdateHeaders.filter(
          (el) => el.key !== item.key
        );
        this.showUpdateHeaders.splice(item.index, 0, item);
      } else {
        this.showUpdateHeaders = this.showUpdateHeaders.filter(
          (el) => el.key !== item.key
        );
      }
    },

    columns: {
      handler(newValue) {
        if (newValue) {
          this.columnsKey += 1;
          this.newOrderLines = newValue;
        }
      },
      deep: true,
    },
  },

  created() {
    this.updateWidth();
  },

  mounted() {
    this.columns = this.getProducts;
    this.headers = this.getHeaders;
    this.showUpdateHeaders =
      this.getValue("new_order_headers_cut") || this.getHeaders;
    setTimeout(() => {
      this.updateSizeColumn();
      this.getDataTableHTML(this);
    });
    if (this.getScreenWidth) {
      let table = document.querySelector("table tbody");
      const element = document.getElementById("sort_key");

      this.changeSortColumns(table);
      this.changeSortHeaders(element);
    }
  },

  unmounted() {
    console.log("unmount");
  },

  updated() {
    console.log("update");
  },

  methods: {
    ...mapActions(["setValue", "setChangeColumns", "deletedLine"]),

    onDragEnd(event) {
      this.headers = event.list;
    },

    saveTemplateSizeColumn,

    updateSizeColumn() {
      const columnValues = {
        action: this.getValue("size_column_action"),
        name: this.getValue("size_column_name"),
        price: this.getValue("size_column_price"),
        quantity: this.getValue("size_column_quantity"),
        product: this.getValue("size_column_product"),
        total: this.getValue("size_column_total"),
        newCol: this.getValue("size_column_newCol"),
      };

      const tables = document.getElementsByTagName("table");

      Array.from(tables).forEach((table) => {
        resizableGrid(table);
      });

      function resizableGrid(table) {
        const row = table.querySelector("tr");
        const cols = row ? Array.from(row.children) : [];

        cols.forEach((col) => {
          const orderName = col.getAttribute("data-order");
          const columnValue = columnValues[orderName];

          if (columnValue) {
            col.style.width = `${columnValue}`;
          }
        });
      }
    },

    getDataTableHTML,
    changeSortColumns,
    changeSortHeaders,

    onSaveChange() {
      this.saveChange = "pending";
      this.$emit("on-save");
      this.setNewOrderHeaders(this.newOrderHeaders);
      this.setNewOrderLines(this.newOrderLines);

      setTimeout(() => {
        this.saveChange = false;
      }, 500);
    },

    setNewOrderHeaders(newValue) {
      this.setValue({ name: "new_order_headers", value: newValue });
      this.setValue({
        name: "new_order_headers_cut",
        value: this.showUpdateHeaders,
      });
    },
    setNewOrderLines(newValue) {
      this.setValue({ name: "new_order_lines", value: newValue });
    },

    openMyLoadPage(name) {
      this.$router.push(`/my-load/:${name}`);
    },

    async deleteLine(id) {
      await this.deletedLine(id);
      this.setNewOrderHeaders(this.newOrderHeaders);
      this.setNewOrderLines(this.newOrderLines);
    },

    updateWidth() {
      this.width = window.innerWidth;
    },
  },
};
</script>


<style scoped lang="scss">
.data__table {
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border-radius: 0 0 10px 10px;
  border: 1px solid rgb(0, 0, 0, 0.12) !important;
  padding-bottom: 30px;
}

.v-data-table ::v-deep {
  table {
    overflow: visible !important;
    thead {
      position: sticky;
      top: 0;
      z-index: 100;
      th {
        font-family: MyriadPro;
        font-size: 16px !important;
        font-weight: 600 !important;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: black !important;
        background: white;

        .headerHandle {
          // width: max-content;
          cursor: move;
          height: 80%;
          display: flex;
          align-items: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    tbody {
      position: relative;
      top: 20px;
    }
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

.v-table--fixed-header
  > .v-table__wrapper
  > table
  > thead
  > tr
  > .sortable-ghost_header {
  border: 2px dashed #a6b7d4 !important;
  border-bottom: 2px dashed #a6b7d4 !important;
}

.v-data-table ::v-deep .v-data-table-footer {
  display: none;
}
</style>