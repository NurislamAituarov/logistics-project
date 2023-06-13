<template>
  <v-app>
    <v-main>
      <TheMain />
    </v-main>
  </v-app>
</template>

<script>
import TheMain from "./layouts/TheMain.vue";

export default {
  name: "App",

  components: {
    TheMain,
  },
};
</script>
