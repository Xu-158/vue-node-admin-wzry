<template>
  <div class="article-page" v-if="model">
    <div class="d-flex px-2 py-3 fs-xl title text-info ai-center">
      <strong class="mr-2 fs-xl" @click='back'>&lt;</strong>
      <strong class="flex-1 text-ellipsis">{{model.title}}</strong>
      <div class="text-grey fs-xxs">{{model.createdAt | date}}</div>
    </div>
    <div v-html="model.content" class="px-4 fs-xl body"></div>
    <div class="px-3 py-3 footer">
      <div class="iconfont icon-menu">
        <span class="ml-2 text-info fs-lg">相关资讯</span>
      </div>
      <div class="mt-2">
        <router-link
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
          class="w-100 fs-lg text-ellipsis py-1"
        >
          <strong>{{item.title}}</strong>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  props: {
    id: { type: String }
  },
  created() {
    this.getAtricleInfo();
  },
  methods: {
    async getAtricleInfo() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.model = res.data;
    },
    back(){
      console.log('back');
      this.$router.go(-1)
    }
  },
  watch:{
    // router-link点击不会跳转解决
    //（1） id:'getAtricleInfo' 简写
    // id(){
    //   this.getAtricleInfo()
    // }
    // (2) 在Main.vue <router-view :key="$route.path"></router-view>
  },
  filters:{
    date(val){
      return String(val).slice(0,10)
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.article-page {
  .title {
    border-bottom: 1px solid $border-color;
  }
  .body {
    img {
      width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
  .footer {
    border-top: 0.3846rem solid $border-color;
  }
}
</style>