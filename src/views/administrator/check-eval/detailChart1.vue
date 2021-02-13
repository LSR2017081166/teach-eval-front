<!-- 显示每题得分情况的柱形图页面-->
<template>
  <div class="detailChart1">
    <!-- 标题栏 -->
    <van-nav-bar
      :title="questName"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell :value="course" icon="orders-o" />
    <div id="myChart" :style="{ width: '100%', height: '300px' }"></div>
    <van-tag color="#588ded">总分：{{ totalScore }}</van-tag>
  </div>
</template>

<script>
import { getQuestions } from "@/api/questionnaire/getQuestions";

export default {
  name: "",
  props: {},
  data() {
    return {
      // 总分
      totalScore: 0,
      questName: this.$store.state.questName,
      course: "",
      result: [],
      questions: [],
      // 已评教人数
      num: 0,
    };
  },
  components: {},
  computed: {},
  created() {
    this.questName = this.$store.state.questRes.questName;
    this.course = this.$store.state.questRes.course;
    this.result = this.$store.state.questRes.result;
    console.log(this.result);
    this.getQuestions1();
    this.getTotal();
    this.getNum()
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    // 计算有多少人已评教
    getNum() {
      let a = this.result[0];
      console.log(a);
      this.num =
        a.optionA.length +
        a.optionB.length +
        a.optionC.length +
        a.optionD.length;
    },
    // 计算总分
    getTotal() {
      for (let i = 0; i < this.result.length; i++) {
        this.totalScore += this.result[i].average;
      }
      this.totalScore = this.totalScore.toFixed(2);
    },
    // 获取对应问卷的问题
    async getQuestions1() {
      let name = this.questName;
      const res = await getQuestions({ name });
      this.$store.commit("setQuestions", res.data);
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
    drawLine() {
      // 纵坐标的题目名称
      let yAxisDate = [];
      for (let i = 1; i <= this.result.length; i++) {
        yAxisDate.push("第" + i + "题");
      }
      // 每题得分
      let seriesDate = [];
      for (let i = 0; i < this.result.length; i++) {
        seriesDate.push(this.result[i].average);
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表

      myChart.setOption({
        title: { text: "每题得分情况"+"(已评教人数:"+this.num+')', padding: 20, x: "center" },
        tooltip: {},
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: yAxisDate,
          inverse: true,
        },
        series: [
          {
            name: "得分",
            type: "bar",
            data: seriesDate,
            label: {
              show: true,
            },
          },
        ],
        grid: {
          x: 50,
          x2: 50,
          y2: 25,
        },
      });
      // 保存this指向
      const self = this;
      // 点击柱子跳到对应问题结果详情
      myChart.on("click", function (param) {
        //这里根据param填写你的跳转逻辑
        self.$router.push({
          path: "/detailChart2",
          name: "detailChart2",
          params: {
            dataIndex: param.dataIndex,
          },
        });
      });
    },
  },
};
</script>
<style lang='less' scoped>
.detailChart1 {
  .van-cell {
    border-bottom: 1px solid rgba(0, 0, 0, 0.267);
  }
  background-color: #fff;
  position: relative;
  .van-tag {
    position: absolute;
    width: 100px;
    left: 50%;
    margin-left: -50px;
    margin-top: 20px;
    height: 30px;
    font-size: 15px;
    border-radius: 10px;
  }
}
#myChart {
  margin-left: 10px;
}
</style>