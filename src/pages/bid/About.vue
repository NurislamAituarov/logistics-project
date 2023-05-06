<template>
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
import { mapGetters } from "vuex";
export default {
  name: "TheBid",
  components: {
    VDataTable,
    BaseIcon,
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
    };
  },
  computed: {
    ...mapGetters(["getProducts"]),
  },

  watch: {
    getColumns(items) {
      this.columns = items;
    },
  },

  mounted() {
    this.columns = this.getProducts;
    setTimeout(() => {
      this.getDataTableHTML();
    });
  },

  methods: {
    getDataTableHTML() {
      let tables = document.getElementsByTagName("table");
      for (let i = 0; i < tables.length; i++) {
        resizableGrid(tables[i]);
      }

      function resizableGrid(table) {
        let row = table.getElementsByTagName("tr")[0],
          cols = row ? row.children : undefined;
        if (!cols) return;

        [...row.children].forEach((el, i) => {
          el.style.border = "1px solid #cccccc";
          el.style.borderLeft = "none";
          if (i === [...row.children].length - 1) {
            el.style.borderRight = "none";
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
  },
};
</script>


<style scoped lang="scss">
.data__table {
  width: calc(100% - 300px);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border-radius: 10px;

  .v-table .v-table__wrapper > table > thead > tr > th,
  th {
    border: 1px solid grey !important;
    border-left: 0px !important;
  }
}

.v-table--fixed-header
  > .v-table__wrapper
  > table
  > thead
  > tr
  > th:nth-child(1),
th:nth-child(1) {
  border: 1px solid grey !important;
}

td {
  border: none !important;
}

.wrapper__column {
  position: relative;
  padding: 10px 15px;
  border: 1px solid#cccccc;
  border-radius: 5px;
  /* box-shadow: 0 5px 20px 0 black; */
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
</style>