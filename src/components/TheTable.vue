<template>
  <TheExtraLine
    v-if="width > 678"
    :save-change="saveChange"
    @on-save-change="onSaveChange"
    @save-change-active="saveChange = 'change'"
  />

  <v-data-table
    v-if="width > 678"
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
        <th
          v-for="header of headers.flat()"
          :key="header.key"
          :class="[
            'column sortable',
            pagination.descending ? 'desc' : 'asc',
            header.key === pagination.sortBy ? 'active' : '',
            header.key === 'action' ? 'column_action' : '',
          ]"
          :data-order="header.key"
        >
          <div class="headerHandle">{{ header.title }}</div>
        </th>
      </tr>
    </template>

    <template v-slot:item="{ item, index }">
      <tr :key="columnsKey">
        <td class="d-flex justify-space-between align-center">
          <BaseIcon
            class="combined-shape rowHandle"
            name="dragV2"
            width="20"
            height="20"
            color="#A6B7D4"
          />
          {{ index + 1 }}

          <TheOptions
            :idLine="columns[index].id"
            @delete-line="deleteLine"
            @open-dialog-window="() => $emit('open-dialog-window')"
          />
        </td>

        <td
          v-for="header of showUpdateHeaders.filter((el, i) => i !== 0)"
          :key="header.key"
        >
          <div
            class="wrapper__column"
            :class="{ tbody__column: header.key === 'name' }"
          >
            {{
              header.key !== "total"
                ? item.columns[header["key"]]
                : calculateTotal(columns[index].id)
            }}

            <div
              v-if="header.key === 'name'"
              class="tbody__column-redirect"
              @click="openMyLoadPage(item.columns.name)"
            >
              <p class="right-arrow_2"></p>
            </div>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>

  <TheTableMobile v-else :headers="showUpdateHeaders" :items="columns" />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Sortable from "sortablejs";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import TheExtraLine from "./TheExtraLine.vue";
import TheOptions from "./TheOptions.vue";
import { saveTemplateSizeColumn, getDataTableHTML } from "@/lib/helpers";
import TheTableMobile from "./TheTableMobile.vue";

export default {
  name: "TheTable",
  components: {
    VDataTable,
    BaseIcon,
    TheExtraLine,
    TheOptions,
    TheTableMobile,
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

  mounted() {
    this.updateWidth();
    this.columns = this.getProducts;
    this.headers = this.getHeaders;
    this.showUpdateHeaders =
      this.getValue("new_order_headers_cut") || this.getHeaders;
    setTimeout(() => {
      this.updateSizeColumn();
      this.getDataTableHTML(this);
    });
    // this.changeSortColumns();
    // this.changeSortHeaders();
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

    changeSortHeaders() {
      this.$nextTick(() => {
        const element = document.getElementById("sort_key");

        const _self = this;
        Sortable.create(element, {
          handle: ".headerHandle",
          onEnd({ newIndex, oldIndex }) {
            const headerSelected = _self.showUpdateHeaders.splice(
              oldIndex,
              1
            )[0];
            _self.showUpdateHeaders.splice(newIndex, 0, headerSelected);
            _self.saveChange = "change";
          },
          ghostClass: "sortable-ghost_header",
        });
      });
    },
    changeSortColumns() {
      let table = document.querySelector("table tbody");
      const _self = this;
      Sortable.create(table, {
        handle: ".rowHandle",
        onEnd({ newIndex, oldIndex }) {
          const rowSelected = _self.columns.splice(oldIndex, 1)[0];
          _self.columns.splice(newIndex, 0, rowSelected);
          _self.saveChange = "change";
        },
        ghostClass: "sortable-ghost",
      });
    },

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

    calculateTotal(id) {
      const { price, quantity } = this.columns.filter((el) => el.id === id)[0];

      return price * quantity;
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

td {
  border: none !important;
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
          // line-height: 46px;
          cursor: move;
          height: 80%;
          cursor: move;
          display: flex;
          align-items: center;
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
  background-color: #f6f5f3;
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

.setting_list {
  width: max-content !important;
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

.combined-shape {
  cursor: pointer;
}

.v-data-table ::v-deep .v-data-table-footer {
  display: none;
}

.column_action {
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>