<template>
  <div class="left__sidebar">
    <img :src="img" alt="" class="mb-10" />

    <v-expansion-panels v-model="panel1" :disabled="disabled" multiple>
      <v-expansion-panel class="expansion__panel">
        <v-expansion-panel-title expand-icon="" collapse-icon=""
          >Panel 1</v-expansion-panel-title
        >
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels v-model="panel2" :disabled="disabled" multiple>
      <v-expansion-panel class="expansion__panel">
        <v-expansion-panel-title expand-icon="" collapse-icon=""
          >Panel 2</v-expansion-panel-title
        >
        <v-expansion-panel-text class="menu__item" @click="openPage('Load')">
          Open Load
        </v-expansion-panel-text>
        <v-expansion-panel-text class="menu__item" @click="openPage('')">
          Some content
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels v-model="panel3" :disabled="disabled" multiple>
      <v-expansion-panel class="expansion__panel">
        <v-expansion-panel-title expand-icon="" collapse-icon=""
          >Panel 3</v-expansion-panel-title
        >
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>


<script>
import img from "../assets/logo-compas.png";

export default {
  name: "TheLeftColumn",
  data() {
    return {
      img,
      panel1: [],
      panel2: [],
      panel3: [],
      disabled: false,
      readonly: false,
    };
  },

  methods: {
    openPage(page) {
      this.$emit("open-page", page);
    },
  },
};
</script>

<style scoped lang="scss">
.left__sidebar {
  width: 229px;
  background: #1c2734;
  padding: 31px 0 10px;
  img {
    display: block;
    margin: 0 auto;
  }
}

.expansion__panel {
  background: none;
  color: white;
}
.menu__item {
  cursor: pointer;
}
</style>