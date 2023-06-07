<template>
  <td class="column-first mb-2">
    <BaseIcon
      class="combined-shape rowHandle mr-1"
      name="dragV2"
      width="20"
      height="20"
      color="#A6B7D4"
    />
    {{ index + 1 }}

    <TheOptions
      class="ml-1"
      :idLine="columns[index].id"
      @delete-line="onDeleteLine"
      @open-dialog-window="$emit('open-dialog-window')"
    />
  </td>

  <td
    v-for="header of showUpdateHeaders.filter((el, i) => i !== 0)"
    :key="header.key"
  >
    <div
      class="wrapper__column mb-2"
      :class="{ tbody__column: header.key === 'name' }"
    >
      <TextTruncate
        :text="
          header.key !== 'total'
            ? item.columns[header['key']]
            : calculateTotal(columns[index].id)
        "
        :maxSymbols="50"
      />
      <div
        v-if="header.key === 'name'"
        class="tbody__column-redirect"
        @click="$emit('open-my-load-page', columns[index].id)"
      >
        <p class="right-arrow_2"></p>
      </div>
    </div>
  </td>
</template>


<script>
import TheOptions from "../TheOptions.vue";
import TextTruncate from "../base/global/TextTruncate.vue";
import BaseIcon from "../icons/BaseIcon.vue";

export default {
  name: "TheTableColumnsTh",
  components: { BaseIcon, TheOptions, TextTruncate },
  props: {
    item: { type: Object, default: () => {} },
    index: { type: [Number, String], default: "" },
    columns: { type: Array, default: () => [] },
    showUpdateHeaders: { type: Array, default: () => [] },
  },

  emits: ["delete-line", "open-dialog-window", "open-my-load-page"],

  methods: {
    calculateTotal(id) {
      const { price, quantity } = this.columns.filter((el) => el.id === id)[0];

      return price * quantity;
    },

    onDeleteLine(id) {
      this.$emit("delete-line", id);
    },
  },
};
</script>



<style scoped lang="scss">
td {
  border: none !important;
}

.column-first {
  position: relative;
  .rowHandle {
    float: left;
  }

  .text-center {
    float: right;
    position: absolute;
    left: 50%;
    top: 50%;
    right: 32px;
    transform: translate(0%, -50%);
  }
}

.wrapper__column {
  position: relative;
  padding: 10px 15px;
  border: 1px solid#cccccc;
  border-radius: 5px;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
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

.combined-shape {
  cursor: pointer;
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