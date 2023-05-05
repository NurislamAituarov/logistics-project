<template>
  <v-table
    ref="table"
    theme="dark"
    fixed-header
    height="600"
    class="data__table"
  >
    <thead>
      <tr>
        <th v-for="item in headers" :key="item.text" class="text-left">
          {{ item.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in columns" :key="item.name">
        <td class="d-flex justify-space-around align-center">
          {{ index + 1 }}
          <BaseIcon name="options" color="#a6b7d4" shadow="true" />
        </td>
        <td>
          <div class="wrapper__column tbody__column">
            {{ item.name }}

            <div class="tbody__column-redirect"></div>
          </div>
        </td>
        <td>
          <div class="wrapper__column">
            {{ item.price }}
          </div>
        </td>
        <td>
          <div class="wrapper__column">
            {{ item.quantity }}
          </div>
        </td>
        <td>
          <div class="wrapper__column">
            {{ item.product }}
          </div>
        </td>
        <td>
          <div class="wrapper__column">{{ item.total }}</div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>


<script>
import { mapGetters } from "vuex";
import BaseIcon from "./icons/BaseIcon.vue";

export default {
  name: "TheTable",

  components: {
    BaseIcon,
  },

  data() {
    return {
      headers: [
        { text: "Действие", sortable: false, value: "action" },
        { text: "Наименование еденицы", sortable: false, value: "name" },
        { text: "Цена", sortable: false, value: "price" },
        { text: "Кол-во", sortable: false, value: "quantity" },
        { text: "Название товара", sortable: false, value: "product" },
        { text: "Итого", sortable: false, value: "total" },
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


<style scoped>
.data__table {
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border-radius: 10px;
}
.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th,
th {
  border: 1px solid grey !important;
  border-left: 0px !important;
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
  box-shadow: 0 5px 20px 0 black;
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