<template>
  <div>===={{username}}====</div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    getParams()
  },
  methods:{
    getParams() {
      this.username = $route.params.username
    },
  },
};
</script>

<style>
</style>