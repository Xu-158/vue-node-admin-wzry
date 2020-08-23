<template>
  <div id="not-found">
    <div class="img-wrap">
      <!-- <img class="not-img" src="../assets/images/error/404_2.gif" alt="404"> -->
    </div>
    <div class="tips-wrap">
      <h1 class="txt-one">OOPS!</h1>
      <h2 class="txt-two">很抱歉，页面它不小心迷路了！</h2>
      <p class="txt-three">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</p>
      <el-button type="primary" round class="btn" @click="$router.push('/home')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound'
  }
</script>

<style lang="stylus" scoped>
</style>