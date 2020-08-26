<template>
  <div id="not-found">
    <button class="back radius-small btn" @click="$router.push('/')">返回主页</button>
    <img src="../assets/images/404.png" class="error" alt="404 Not Found" />
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

#not-found {
  display: flex;
  flex-flow: column;

  .error {
    width: 100%;
    height: 100%;
  }

  .radius-small {
    height: 50px;
    background-color: map-get($colors, "primary");
    font-size: 1.2rem;
    font-weight: 600;
    color: map-get($colors, "white");
    letter-spacing: 5px;
  }
}
</style>