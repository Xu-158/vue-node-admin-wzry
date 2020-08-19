<template>
  <div class="hero-page" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/images/logo.png" alt height="30" />
      <div class="px-2">王者荣耀</div>
      <div class="flex-1">攻略站</div>
      <router-link tag="div" to="/" class="fs-xs">
        更多英雄
        <strong class="m-1">&gt;</strong>
      </router-link>
    </div>
    <div class="header d-flex jc-end flex-column" :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="my-1 fs-sm">{{model.categories.map(v=>v.name).join('/')}}</div>
        <div class="d-flex fs-sm">
          <div class="scores d-flex ai-center flex-1" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.difficult}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.difficult}}</span>
          </div>
          <router-link to="/" tag="div" class="text-grey fs-xs">皮肤：2&nbsp;&gt;</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
  },
  data() {
    return {
      model: {}
    };
  },
  created() {
    this.getHeroInfo();
  },
  methods: {
    async getHeroInfo() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
    }
  }
};
</script>

<style lang="scss">
.hero-page {
  .topbar {
    position: sticky;
    top: 0px;
    z-index: 999;
  }
  .header {
    height: 30vh;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info{
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
    .scores{
      .badge{
        margin: 0 0.3rem;
        display: inline-block;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        font-size: 0.7692rem;
        border: 0.5px solid white;
      }
    }
  }
}
</style>
