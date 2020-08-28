<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="content">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
          <img src="../assets/images/logo.png" alt height="30" />
          <div class="pl-2 flex-1">
            <div class="text-white fs-md">王者荣耀</div>
            <div class="text-grey-1 fs-xs">团队成就更多</div>
          </div>
          <button class="btn bg-primary">立即下载</button>
        </div>
        <div class="bg-primary py-2">
          <div class="nav nav-inverse jc-around">
            <div v-for="(item,index) in menuItem" :key="item.name" @click="activeMenuItemIndex = index">
              <div class="nav-item" :class="{'active':index===activeMenuItemIndex}">
                <router-link class="nav-link" :to="item.path" tag="div">{{item.name}}</router-link>
              </div>
            </div>
          </div>
        </div>

        <router-view :key="$route.path"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMenuItemIndex: 0,
      menuItem: [
        { name: "首页", path: "/" },
        { name: "攻略中心", path: "/aaa" },
        { name: "赛事中心", path: "/bbb" },
      ],
    };
  },
};
</script>

<style lang="scss">
.outer-container,
.content {
  width: 100vw;
  height: 100vh;
}
.outer-container {
  position: relative;
  overflow: hidden;
}
.inner-container {
  position: absolute;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

/* for Chrome */
.inner-container::-webkit-scrollbar {
  display: none;
}

.topbar {
  position: sticky;
  top: 0px;
  z-index: 999;
}
</style>
