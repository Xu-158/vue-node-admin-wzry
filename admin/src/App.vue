<template>
  <div id="app">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
html,body{
  padding: 0;
  margin: 0;
}
</style>