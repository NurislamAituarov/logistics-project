<template>
  <div class="data__table-wrapper">
    <div
      v-for="(item, index) of columns"
      :key="item.id"
      class="data__table-mobile"
      @click="expandBlock(item.id)"
    >
      <span>Номер строки</span>
      <div class="d-flex mt-2" :class="{ 'mb-4': activeBlockId == item.id }">
        <BaseIcon
          class="combined-shape rowHandle"
          name="dragV2"
          width="20"
          height="20"
          color="#A6B7D4"
        />
        {{ index + 1 }}
      </div>
      <template v-if="activeBlockId == item.id">
        <div v-for="header of headers" :key="header.key" class="mb-4">
          <div>
            {{ header.title }}
            <TheOptions
              v-if="header.key === 'action'"
              :idLine="items[index].id"
              @delete-line="deleteLine"
              @open-dialog-window="() => $emit('open-dialog-window')"
            />
            <div
              class="wrapper__column mt-2"
              :class="{ tbody__column: header.key === 'name' }"
            >
              {{
                header.key !== "total"
                  ? item[header["key"]]
                  : calculateTotal(items[index].id)
              }}

              <div
                v-if="header.key === 'name'"
                class="tbody__column-redirect"
                @click="openMyLoadPage(item.name)"
              >
                <p class="right-arrow_2"></p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";

import TheOptions from "./TheOptions.vue";
import BaseIcon from "./icons/BaseIcon.vue";

export default {
  name: "TheTableMobile",
  props: {
    items: { type: Array, default: () => [] },
    headers: { type: Array, default: () => [] },
  },
  components: { BaseIcon, TheOptions },

  data() {
    return {
      columns: this.items,
      activeBlockId: null,
    };
  },

  watch: {
    items() {
      this.columns = this.items;
    },
  },

  mounted() {
    this.changeSortColumns();
  },

  methods: {
    calculateTotal(id) {
      const { price, quantity } = this.items.filter((el) => el.id === id)[0];

      return price * quantity;
    },

    changeSortColumns() {
      let table = document.querySelector(".data__table-wrapper");

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

    expandBlock(id) {
      id == this.activeBlockId
        ? (this.activeBlockId = null)
        : (this.activeBlockId = id);
    },
  },
};
</script>


<style scoped lang="scss">
.data__table-wrapper {
  height: calc(100vh - 300px);
  overflow: scroll;
}

.data__table-mobile {
  box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  border: 1px solid rgb(0, 0, 0, 0.12) !important;
  padding: 15px;
  width: 100%;
  min-height: 62px;
  margin-bottom: 10px;
}

.wrapper__column {
  position: relative;
  padding: 10px 15px;
  border: 1px solid#cccccc;
  border-radius: 5px;
}
</style>