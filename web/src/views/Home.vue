<template>
  <div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="banner" v-for="banner in banners">
          <img class="w-100" :src="banner" />
        </div>
      </div>
      <div class="swiper-pagination pagination-home text-right px-3 py-1"></div>
    </div>
    <!--  -->
    <div class="nav-icons mt-3 bg-white text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="item in 10" :key="item">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!--  -->
    <i class="iconfont fs-lg">&#xe672;</i>
    <i class="iconfont fs-lg">&#xe615;</i>
    <i class="iconfont fs-lg">&#xe61f;</i>
    <i class="iconfont fs-lg">&#xe64a;</i>
    <i class="iconfont fs-lg">&#xe620;</i>
    <i class="iconfont fs-lg">&#xe650;</i>
  </div>
</template>

<script>
export default {
  name: "carrousel",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        loop: true,
        autoplay: true, //可设置数值来指定播放速度
        speed: 400 // 切换图片速度
      },
      banners: [
        "http://ossweb-img.qq.com/upload/adw/image/20200814/b2a7065b6bc93bea491bcc73b3f1a2e2.jpeg",
        "http://ossweb-img.qq.com/upload/adw/image/20200812/435cedc1f712e00802619029951a5d91.jpeg"
      ]
    };
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.pagination-home {
  border-radius: 10px;
  .swiper-pagination-bullet {
    opacity: 1;
    background-color: white;
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>