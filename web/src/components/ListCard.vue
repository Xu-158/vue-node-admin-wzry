<template>
  <Card :title="title" :iconClass="iconClass">
    <div>
      <div class="nav jc-between pt-3">
        <div
          class="nav-item"
          v-for="(item,index) in categories"
          :class="{active:currentIndex == index}"
          :key="index"
          @click="$refs.list.$swiper.slideTo(index)"
        >
          <div>{{item.name}}</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper ref="list"
        :options="{autoHeight:true}"
        @slide-change="()=> currentIndex = $refs.list.$swiper.realIndex">
          <swiper-slide v-for="(category,index) in categories" :key="index">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  components: {
    Card
  },
  props: {
    title: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  }
};
</script>

<style>
</style>