<template>
  <div>欢迎管理员：{{username}}</div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    this.username = this.$route.query.username
  },
};
</script>

<style>
</style>