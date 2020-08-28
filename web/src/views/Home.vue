<template>
  <div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="index" v-for="(banner,index) in banners">
          <a :href="banner.url">
            <img class="w-100" :src="banner.image" />
          </a>
        </div>
      </div>
      <div class="swiper-pagination pagination-home text-right px-3 py-1"></div>
    </div>
    <!--  -->
    <div class="nav-icons mt-2 bg-white text-center pt-3 text-dark-1">
      <div class="nav-icons-sub" :class="{'down':showIconTotal}">
        <div class="nav-item mb-3" v-for="(item,index) in iconName" :key="item">
          <a href="https://pvp.qq.com/m/m201706/coming/index.htm">
            <i class="sprite sprite-news"></i>
          </a>
          <div class="py-2">{{iconName[index]}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm" @click="showIconTotal = !showIconTotal">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>{{showIconTotal?"展开":"收起"}}</span>
      </div>
    </div>
    <!--  -->
    <m-list-card title="新闻资讯" iconClass="cc-menu-circle" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="pb-3 fs-lg d-flex news-list"
          v-for="(news,index) in category.newsList"
          :key="index"
        >
          <span
            class="text-info fs-sm"
            :class="calcNewsClass(news.categoryName)"
          >{{news.categoryName}}</span>
          <span class="px-1">|</span>
          <span class="flex-1 text-dark text-ellipsis">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">&nbsp;{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card title="英雄列表" iconClass="card-hero" :categories="heroesCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap text-center">
          <router-link
            tag="div"
            :to="`heroes/${hero._id}`"
            class="hero-item pb-3 fs-lg px-1"
            v-for="(hero,index) in category.heroList"
            :key="index"
          >
            <img :src="hero.avatar" alt />
            <div class="fs-sm">{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import { getHomeAds, getNews, getHeroCate } from "../api/index";
export default {
  name: "carrousel",
  components: {},
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home",
        },
        loop: true,
        autoplay: true, //可设置数值来指定播放速度
        speed: 400, // 切换图片速度
      },
      banners: [],
      newsCats: [],
      heroesCats: [],
      heroList: [],
      iconName: [
        "爆料站",
        "故事站",
        "周边商城",
        "体验服",
        "新人专区",
        "荣耀-传承",
        "王者营地",
        "公众号",
        "版本介绍",
        "对局环境",
        "无限王者团",
        "创意互动营",
      ],
      showIconTotal: true,
    };
  },
  mounted() {
    this.getBanner();
    this.getNewsCats();
    this.getHeroesCats();
  },
  methods: {
    async getNewsCats() {
      const res = await getNews();
      this.newsCats = res.data;
    },
    async getHeroesCats() {
      const res = await getHeroCate();
      this.heroesCats = res.data;
    },
    async getBanner() {
      const res = await getHomeAds();
      res.data.map((item) => {
        this.banners.push({
          image: item.image,
          url: item.url,
        });
      });
    },
  },
  computed: {
    calcNewsClass() {
      return function (categoryName) {
        let className = "";
        switch (categoryName) {
          case "新闻":
            className = "news-cate-one";
            break;
          case "公告":
            className = "news-cate-two";
            break;
          case "活动":
            className = "news-cate-three";
            break;
          case "赛事":
            className = "news-cate-four";
            break;
          default:
            categoryName = "news-cate-one";
        }
        return className;
      };
    },
  },
  filters: {
    date(val) {
      const list = val.split("-");
      return list[1] + "/" + list[2].toString().slice(0, 2);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  .nav-icons-sub {
    display: flex;
    flex-wrap: wrap;
    .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;
      &:nth-child(4n) {
        border-right: none;
      }
    }
  }
  .down {
    flex-wrap: nowrap;
    overflow: auto;
    white-space: nowrap;
    .nav-item {
      width: 25%;
      padding: 0 1.5625rem;
      border-right: 1px solid $border-color;
      &:nth-child(4n) {
        border-right: 1px solid $border-color;
      }
    }
  }
}
.hero-item {
  width: 20%;
  margin-bottom: -0.6154rem;
  img {
    width: 100%;
  }
}

.news-list {
  .text-info {
    color: rgba(255, 4, 4, 0.671);
    display: inline-block;
    border: 1px solid;
    border-radius: 5px;
    padding: 1px 2px;
    font-size: 10px;
    &.news-cate-one {
      border-color: rgba(0, 0, 255, 0.678);
      color: rgba(0, 0, 255, 0.678);
    }
    &.news-cate-two {
      border-color: rgba(255, 176, 6, 0.767);
      color: rgba(255, 218, 6, 0.801);
    }
    &.news-cate-three {
      border-color: rgba(6, 255, 60, 0.767);
      color: rgba(6, 255, 60, 0.767);
    }
    &.news-cate-four {
      border-color: rgba(6, 72, 255, 0.767);
      color:  rgba(6, 72, 255, 0.767);
    }
  }
}
</style>