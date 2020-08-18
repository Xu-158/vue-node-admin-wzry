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

    <m-list-card title="新闻资讯" iconClass="cc-menu-circle" :categories="newsCats">
      <template #items="{category}">
        <div class="pb-3 fs-lg d-flex" v-for="(news,index) in category.newsList" :key="index">
          <span class="text-info fs-sm">[{{news.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 text-dark text-ellipsis">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">&nbsp;{{news.createdAt | date}}</span>
        </div>
      </template>
    </m-list-card>

    <m-list-card title="英雄列表" iconClass="card-hero" :categories="heroesCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap text-center">
          <div class="hero-item pb-3 fs-lg px-1" v-for="(hero,index) in category.heroList" :key="index">
            <img :src="hero.avatar" alt />
            <div class="fs-sm">{{hero.name}}</div>
          </div>
        </div>
      </template>
    </m-list-card>
    <!-- 
    <m-card title="英雄列表" iconClass="card-hero"></m-card>

    <m-card title="精彩视频" iconClass="video"></m-card>

    <m-card title="精彩视频" iconClass="menu"></m-card>
    <m-card title="精彩视频" iconClass="tag"></m-card>
    <m-card title="精彩视频" iconClass="icon-test"></m-card>-->
  </div>
</template>

<script>
export default {
  name: "carrousel",
  components: {},
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
      ],
      newsCats: [],
      heroesCats: []
    };
  },
  methods: {
    async getNewsCats() {
      const res = await this.$http.get("/news/list");
      this.newsCats = res.data;
    },
    async getHeroesCats() {
      const res = await this.$http.get("/heroes/list");
      this.heroesCats = res.data;
    }
  },
  created() {
    this.getNewsCats();
    this.getHeroesCats();
  },
  filters: {
    date(val) {
      const list = val.split("-");
      return list[1] + "/" + list[2].toString().slice(0, 2);
    }
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
.hero-item{
  width: 20%;
  margin-bottom: -0.6154rem;
  img{
    width: 100%;
  }
}
</style>