<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/images/logo.png" alt height="30" />
      <div class="pl-2 flex-1">
        <div class="text-white fs-md">王者荣耀</div>
        <div class="text-grey-1 fs-xs">团队成就更多</div>
      </div>
      <button class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary py-3">
      <div class="nav d-flex jc-around text-white">
        <div class="nav-item active">
          <router-link class="nav-link" to="/" tag="div">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/" tag="div">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/" tag="div">赛事中心</router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.nav {
  .nav-item {
    border-bottom: 3px solid transparent;
    padding-bottom: 0.2rem;
    &.active {
      border-bottom: 3px solid white;
    }
  }
}
</style>
