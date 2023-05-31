<template>
  <div class="data__table-wrapper">
    <div
      v-for="(item, index) of columns"
      :key="item.id"
      class="data__table-mobile"
      @click="expandBlock($event, item.id)"
    >
      <span class="header-title">Номер строки</span>
      <div
        ref="refHeaderDrag"
        class="d-flex mt-2"
        :class="{ 'mb-4': activeBlockId == item.id }"
      >
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
        <div v-for="header of headers" :key="header.key" class="mb-2">
          <div>
            <span class="header-title">
              {{ header.title }}
            </span>
            <TheOptions
              v-if="header.key === 'action'"
              :idLine="items[index].id"
              @delete-line="onDeleteLine"
              @open-dialog-window="$emit('open-dialog-window')"
            />
            <div
              v-if="header.key !== 'action'"
              class="wrapper__column"
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
                @click="$emit('open-my-load-page', item.name)"
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
import TheOptions from "./TheOptions.vue";
import BaseIcon from "./icons/BaseIcon.vue";
import { changeSortColumns } from "@/lib/helpers";

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

  emits: ["delete-line", "open-my-load-page", "open-dialog-window"],

  watch: {
    items() {
      this.columns = this.items;
    },
  },

  mounted() {
    let table = document.querySelector(".data__table-wrapper");
    this.changeSortColumns(table);
  },

  methods: {
    calculateTotal(id) {
      const { price, quantity } = this.items.filter((el) => el.id === id)[0];

      return price * quantity;
    },

    changeSortColumns,

    expandBlock(event, id) {
      (this.$refs.refHeaderDrag.includes(event.target) ||
        event.currentTarget === event.target) &&
      id == this.activeBlockId
        ? (this.activeBlockId = null)
        : (this.activeBlockId = id);
    },

    onDeleteLine(id) {
      this.$emit("delete-line", id);
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
  padding-top: 10px;
  width: 100%;
  min-height: 62px;
  margin-bottom: 10px;
}

.wrapper__column {
  position: relative;
  padding: 10px 15px;
  border: 1px solid#cccccc;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 5px;
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

.header-title {
  color: #8f8f8f;
  font-size: 10px;
  line-height: 14px;
}
</style>