<template>
  <div class="data__table-wrapper">
    <div
      v-for="(item, index) of items"
      :key="item.id"
      class="data__table-mobile"
    >
      <span>Номер строки</span>
      <div class="d-flex mt-2 mb-4">
        <BaseIcon
          class="combined-shape rowHandle"
          name="dragV2"
          width="20"
          height="20"
          color="#A6B7D4"
        />
        {{ index + 1 }}
      </div>
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
    </div>
  </div>
</template>

<script>
import TheOptions from "./TheOptions.vue";
import BaseIcon from "./icons/BaseIcon.vue";

export default {
  name: "TheTableMobile",
  props: {
    items: { type: Array, default: () => [] },
    headers: { type: Array, default: () => [] },
  },
  components: { BaseIcon, TheOptions },

  methods: {
    calculateTotal(id) {
      const { price, quantity } = this.items.filter((el) => el.id === id)[0];

      return price * quantity;
    },
  },
};
</script>


<style scoped lang="scss">
.data__table-wrapper {
  height: 100vh;
  overflow: scroll;
}

.data__table-mobile {
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  border: 1px solid rgb(0, 0, 0, 0.12) !important;
  padding: 15px;
  width: 100%;
  min-height: 200px;
  margin-bottom: 25px;
}

.wrapper__column {
  position: relative;
  padding: 10px 15px;
  border: 1px solid#cccccc;
  border-radius: 5px;
}
</style>