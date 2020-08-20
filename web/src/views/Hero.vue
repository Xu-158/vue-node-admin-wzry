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
    <div
      class="header d-flex jc-end flex-column"
      :style="{'background-image':`url(${model.banner})`}"
    >
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
    <!--  -->
    <div>
      <div class="px-2 bg-white">
        <div class="nav d-flex pb-1 pt-3 jc-around">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="d-flex bg-white py-3">
              <router-link to="/" tag="button" class="btn btn-lg flex-1 ml-2">
                <i class="iconfont icon-cc-menu-circle"></i>英雄介绍视频
              </router-link>
              <router-link to="/" tag="button" class="btn btn-lg flex-1 mx-2">
                <i class="iconfont icon-video"></i>一图识英雄
              </router-link>
            </div>
            <!-- skill -->
            <div class="skills bg-white py-2">
              <div class="d-flex jc-around px-3 py-2">
                <img
                  v-for="(item,index) in model.skills"
                  :key="item._id"
                  :src="item.icon"
                  alt
                  @click="currentSkillsIndex = index"
                  :class="{skillActive:currentSkillsIndex === index}"
                  class="skills skills-icon"
                />
              </div>
              <div v-if="currentSkill">
                <div class="d-flex px-3 ai-center mt-2">
                  <strong class="pr-3 fs-lg">{{currentSkill.name}}</strong>
                  <span>(冷却值：{{currentSkill.delay}}消耗：{{currentSkill.cost}})</span>
                </div>
                <div class="d-flex px-3 ai-center mt-1">
                  <p>{{currentSkill.description}}</p>
                </div>
              </div>
            </div>
            <!-- skill-end -->
            <card iconClass="cc-menu-circle hero-items" title="出装推荐">
              <div class="fs-lg py-3">顺风出装</div>
              <div class="d-flex jc-between text-center fs-sm">
                <div v-for="item in model.items1" :key="item._id">
                  <img class="item-icon" :src="item.icon" />
                  <div>{{item.name}}</div>
                </div>
              </div>
              <div style="border:0.5px solid #eee" class="mt-3"></div>
              <div class="fs-lg py-3">逆风出装</div>
              <div class="d-flex jc-between text-center fs-sm">
                <div v-for="item in model.items2" :key="item._id">
                  <img class="item-icon" :src="item.icon" />
                  <div>{{item.name}}</div>
                </div>
              </div>
            </card>
            <card plain iconClass="cc-menu-circle" title="使用技巧">
              <p>{{model.usageTips}}</p>
            </card>
            <card plain iconClass="cc-menu-circle" title="对抗技巧">
              <p>{{model.battleTips}}</p>
            </card>
            <card plain iconClass="cc-menu-circle" title="团战思路">
              <p>{{model.teamTips}}</p>
            </card>
            <card plain iconClass="cc-menu-circle" title="英雄关系">
              <div class="fs-lg py-2">最佳搭档</div>
              <div v-for="item in model.partners" :key="item._id" class="d-flex my-2">
                <img class="mb-2" :src="item.hero.avatar" height="50px" alt />
                <div class style="height:50px">{{item.description}}</div>
              </div>
              <div style="border:0.5px solid #eee" class="mt-3"></div>
            </card>
            <div></div>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
export default {
  props: {
    id: { type: String }
  },
  data() {
    return {
      model: {},
      currentSkillsIndex: 0
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
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillsIndex];
    }
  },
  components: {
    Card
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.hero-page {
  .topbar {
    position: sticky;
    top: 0px;
    z-index: 999;
  }
  .header {
    height: 30vh;
    background: #fff no-repeat top center;
    background-size: 100% 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
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

  .nav {
    border-bottom: 1px solid $border-color;
  }
  .skills {
    .skills-icon {
      width: 60px;
      height: 60px;
      border: 3px solid map-get($colors, "white");
      border-radius: 50%;
      &.skillActive {
        border-color: map-get($colors, "primary");
      }
    }
  }
  .item-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>
