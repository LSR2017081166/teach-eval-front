<!-- 显示每题得分情况的柱形图页面-->
<template>
  <div class="detailChart2">
    <!-- 标题栏 -->
    <van-nav-bar
      :title="questName"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 选择题的tab标签 -->
    <van-tabs v-model="active" color="#588ded">
      <van-tab
        v-for="(item, index) in result"
        :key="index"
        :title="'第' + (index + 1) + '题'"
      >
        <!-- 题目 -->
        <van-field v-model="result[index].title" label="题目" readonly />
        <div
          :id="'myChart' + index"
          :style="{ width: '100%', height: '300px' }"
        ></div>
        <div class="tagCon">
          <van-tag color="#588ded">得分：{{ item.average.toFixed(2) }}</van-tag>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      // 四个选项的内容
      option: [1, 2, 3, 2],
      items: this.$store.state.questions,
      active: 0,
      questName: "",
      result: [],
      questions: [],
      sectorData: [],
    };
  },
  components: {},
  computed: {},
  updated() {
    this.getOption();
    this.initEcharts();
  },
  created() {
    this.questName = this.$store.state.questRes.questName;
    this.result = this.$store.state.questRes.choiceRes;
    this.dataIndex = this.$route.params.dataIndex;
    this.active = this.dataIndex;
    this.getOption();
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    // 获取选项值
    getOption() {
      let a = this.items;
      for (let i = 0; i < a.length; i++) {
        if (a[i].title === this.result[this.active].title) {
          this.option.splice(
            0,
            4,
            a[i].optionA,
            a[i].optionB,
            a[i].optionC,
            a[i].optionD
          );
        }
      }
      console.log(this.option);
    },
    // 点击返回s
    onClickLeft() {
      this.$router.go(-1);
    },
    initEcharts() {
      let item = this.result[this.active];
      // 新建一个promise对象
      let newPromise = new Promise((resolve) => {
        resolve();
      });
      //然后异步执行echarts的初始化函数
      newPromise.then((active) => {
        //	此dom为echarts图标展示dom
        let myChart = this.$echarts.init(
          document.getElementById("myChart" + this.active)
        );
        console.log("myChart" + this.active);
        let option = {
          // title: {
          //     text: '选项占比',
          //     // subtext: '纯属虚构',
          //     left: 'bottom'
          // },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "50%",
              center: ["50%", "60%"],
              label: {
                //饼图图形上的文本标签
                normal: {
                  show: true,
                  position: "outer", //标签的位置
                  textStyle: {
                    fontWeight: 300,
                    fontSize: 16, //文字的字体大小
                  },
                  formatter: "{d}%",
                },
              },
              data: [
                { value: item.perA * 100, name: this.option[0] },
                { value: item.perB * 100, name: this.option[1] },
                { value: item.perC * 100, name: this.option[2] },
                { value: item.perD * 100, name: this.option[3] },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        myChart.setOption(option);
      });
    },
  },
};
</script>
<style lang='less' scoped>
.tagCon{
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  background-color: #efefef;
.van-tag {
   border-radius: 10px;
   font-size: 15px;
   margin-top: 10px;
}
}
.detailChart2 {
  .van-cell {
    border-bottom: 1px solid rgba(0, 0, 0, 0.267);
    border-top: 1px solid rgba(0, 0, 0, 0.267);
    margin-top: 5px;
  }
  background-color: #fff;
  position: relative;
  // .van-tag {
  //   position: absolute;
  //   left: 50%;
  //   margin-left: -50px;
  //   margin-top: 20px;
  //   height: 30px;
  //   font-size: 15px;
  //   border-radius: 10px;
  //   text-align: center;
  // }
}
#myChart {
  margin-left: 10px;
}
</style>