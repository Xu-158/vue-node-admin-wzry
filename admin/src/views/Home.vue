<template>
  <div>
    <div id="myChart" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import { fetchEcharts } from "@/api/home";
export default {
  data() {
    return {
      echartsData: [],
    };
  },
  mounted() {
    this.fetchEcharts();
    this.drawEcharts();
  },
  watch: {
    echartsData() {
      this.drawEcharts();
    },
  },
  methods: {
    async fetchEcharts() {
      const res = await fetchEcharts();
      this.echartsData = res.data;
    },
    drawEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      // 绘制图表
      myChart.setOption({
        title: { text: "后台数据一览" },
        tooltip: {},
        xAxis: {
          data: ['装备', '文章', '英雄', '广告位', '管理员']
        },
        yAxis: {},
        series: [
          {
            name: "总数",
            type: "bar",
            data: this.echartsData,
          },
        ],
      });
    },
  },
};
</script>

<style>
</style>