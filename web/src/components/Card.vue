<template>
  <div>
    <div class="card bg-white my-3 p-3" :class="{'pb-1':plain}">
      <div class="card-header d-flex ai-center">
        <i v-if="!plain" class="iconfont fs-lg" :class="`icon-${iconClass}`"></i>
        <strong class="fs-xl flex-1 ml-1">{{title}}</strong>
        <i v-if="!plain" class="sprite sprite-ellipsis mt-1"></i>
      </div>
      <div class="px-4 w-100 pt-3" style="border-bottom:0.0385rem solid #d4d9de"></div>
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "新闻资讯",
      type: String,
      required: true
    },
    iconClass: {
      required: true,
      type: String,
    },
    plain:{
      type:Boolean
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.card {
  border-top:0.5px solid $border-color ;
  border-bottom:0.5px solid $border-color ;
  .iconfont{
    font-size: 1.2308rem;
  }
}
</style>