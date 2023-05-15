<template>
  <h1>Name {{ name }}</h1>
</template>

<script>
export default {
  name: "MyLoad",
  data() {
    return {
      name: "",
    };
  },

  watch: {},

  created() {
    this.name = this.$route.params.key;
  },
};
</script>