<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="banner" v-for="banner in banners">
        <img class="w-100" :src="banner" />
      </div>
    </div>
    <div class="swiper-pagination pagination-home text-right px-3 py-1"></div>
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
</style>