<!-- ‘添加指标’页面-->
<template>
  <div class="addition">
    <!-- 标题栏 -->
    <van-nav-bar
      :title="questName"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- 选择题的tab标签 -->
    <van-tabs v-if="type === 0" v-model="active1" color="#588ded">
      <van-tab
        v-for="value in quest.length"
        :key="value"
        :title="'第' + value + '题'"
      >
        <!-- 题目表单 -->
        <div class="formArea">
          <van-form>
            <!-- 题目 -->
            <van-field v-model="quest[value - 1].title" label="题目" readonly />
            <!-- 选项 -->
            <div class="vanGroup1">
              <van-field
                :class="{ selected: result1[value - 1].option === 'A' }"
                v-model="quest[value - 1].optionA"
                :label="'A' + '(' + quest[value - 1].scoreA + '分)'"
                readonly
                @click="getScoreA('A', quest[value - 1].scoreA, value - 1)"
              />
              <van-field
                :class="{ selected: result1[value - 1].option === 'B' }"
                v-model="quest[value - 1].optionB"
                :label="'B' + '(' + quest[value - 1].scoreB + '分)'"
                readonly
                @click="getScoreB('B', quest[value - 1].scoreB, value - 1)"
              />
              <van-field
                :class="{ selected: result1[value - 1].option === 'C' }"
                v-model="quest[value - 1].optionC"
                :label="'C' + '(' + quest[value - 1].scoreC + '分)'"
                readonly
                @click="getScoreC('C', quest[value - 1].scoreC, value - 1)"
              />
              <van-field
                :class="{ selected: result1[value - 1].option === 'D' }"
                v-model="quest[value - 1].optionD"
                :label="'D' + '(' + quest[value - 1].scoreD + '分)'"
                readonly
                @click="getScoreD('D', quest[value - 1].scoreD, value - 1)"
              />
            </div>
          </van-form>
        </div>
        <!-- 分割线 -->
        <div class="divider"></div>
        <div class="button">
          <van-button plain type="info" @click="subResult">提交</van-button>
        </div>
      </van-tab>
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" @click="show = true" class="wap-nav-wrap">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 简答题的tab标签 -->
    <van-tabs v-if="type === 1" v-model="active2" color="#588ded">
      <van-tab
        v-for="value in jQuizs.length"
        :key="value"
        :title="'第' + value + '题'"
      >
        <!-- 题目表单 -->
        <div class="formArea">
          <!-- forKey的存在是为了在点“清空”时更新表单，消除验证规则 -->
          <van-form>
            <!-- 题目 -->
            <van-field v-model="jQuizs[value - 1].title" autosize readonly />
            <div class="divider"></div>
            <!-- 请输入答案 -->
            <van-field
              v-model="result2[value - 1]"
              rows="5"
              autosize
              type="textarea"
              placeholder="请作答"
            />
          </van-form>
        </div>
        <!-- 分割线 -->
        <div class="divider"></div>
        <div class="button">
          <van-button plain type="info" @click="subResult">提交</van-button>
        </div>
      </van-tab>
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" @click="show = true" class="wap-nav-wrap">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      get-container="body"
    >
      <preview
        :active1="active1"
        :active2="active2"
        :quest="quest"
        :jQuizs="jQuizs"
        @close="show = false"
        @update-active1="onUpdateActive1"
        @update-active2="onUpdateActive2"
      />
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { getQuestions } from "@/api/questionnaire/getQuestions";
import Preview from "@/components/preview";
import { Toast } from "vant";
import { saveResult } from "@/api/result/saveResult";

export default {
  name: "",
  props: {},
  data() {
    return {
      questName: "",
      // 该学生信息
      idInfo: this.$store.state.idInfo,
      // 简答题结果
      result2: [],
      // 选择的被评课程名称
      project: "",
      // 选择题结果
      result1: [],
      // 选中项
      option: "",
      // 选中项得分
      score: 0,
      // 判断是选择题还是简答题,0是选择，1是简答
      type: 0,
      // 简答题数组
      jQuizs: [],
      // active指向需要
      point: "1",
      questName: "",
      active1: 0,
      active2: 0,
      // 选择题数组
      quest: [],
      show: false,
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component, Preview },
  computed: {
    // 计算可编辑分数
    editScore: function () {
      let b = 0;
      for (let i = 0; i < this.quest.length; i++) {
        let a = this.quest[i];
        b = b + a.scoreA + a.scoreB + a.scoreC + a.scoreD;
        if (100 - b < 0) {
          Toast.fail("请检查编写题目是否规范！");
          return;
        }
      }
      return 100 - b;
    },
  },
  updated() {
    if (this.point === "2") {
      if (this.type === 0) this.onUpdateActive1(this.quest.length);
      if (this.type === 1) this.onUpdateActive2(this.jQuizs.length);
    }
  },
  created() {
    // 根据问卷名称查找对应问卷
    this.questName = this.$store.state.teaQuest.questName;
    this.getQuestions1();
    // this.jQuizs = a[1];
    // 在页面一开始创建就将问卷结果集填满空答案，防止样式报错
    // for (let i = 0; i < this.quest.length; i++) {
    //   this.result1.push({ title: "", option: "", score: 0 });
    // }
  },
  methods: {
    // 获取对应问卷的问题
    async getQuestions1() {
      let name = this.questName;
      
      const res = await getQuestions({ name });
      this.quest = res.data;
    },
    // 提交学生评教结果
    // async subResult() {
    //   // 将简答题题目和对应答案合并
    //   for (let i = 0; i < this.result2.length; i++) {
    //     this.jQuizs[i].answer = this.result2[i];
    //   }
    //   console.log(this.jQuizs);
    //   // 判断是否有选择题目未作答
    //   for (let i = 0; i < this.result1.length; i++) {
    //     if (this.result1[i].option === "") {
    //       Toast.fail("请检查选择题是否作答完毕！");
    //       return;
    //     }
    //   }
    //   // 判断是否有简答题目未作答
    //   for (let i = 0; i < this.jQuizs.length; i++) {
    //     if (this.jQuizs[i].answer === "" || !this.jQuizs[i].answer) {
    //       Toast.fail("请检查简答题是否作答完毕！");
    //       return;
    //     }
    //   }
    //   Dialog.confirm({
    //     title: "提示",
    //     message: "提交后无法更改，确认提交吗？",
    //   })
    //     .then(async () => {
    //       // 存入选择题choiceRes和简答题jQuizRes结果表
    //       let a = {
    //         questName: this.questName,
    //         project: this.project,
    //         result1: this.result1,
    //         sno: this.idInfo.sno,
    //         jQuizs: this.jQuizs,
    //       };
    //       let res = await saveResult(a);
    //       if (res.data.data) {
    //         Toast.success("问卷提交成功！");
    //       }
    //     })
    //     .catch(() => {
    //       Toast.fail("提交问卷失败！");
    //     });
    // },
    // 点击选项，得到选中选项和对应分值
    getScoreA(option, score, value) {
      let title = this.quest[value].title;
      this.result1.splice(value, 1, { option, score, title });
    },
    getScoreB(option, score, value) {
      let title = this.quest[value].title;
      this.result1.splice(value, 1, { option, score, title });
    },
    getScoreC(option, score, value) {
      let title = this.quest[value].title;
      this.result1.splice(value, 1, { option, score, title });
    },
    getScoreD(option, score, value) {
      let title = this.quest[value].title;
      this.result1.splice(value, 1, { option, score, title });
    },
    //点击了选择题题号
    onUpdateActive1(value) {
      this.type = 0;
      this.active1 = value - 1;
      this.point = "1";
    },
    //点击了简答题题号
    onUpdateActive2(value) {
      this.type = 1;
      this.active2 = value - 1;
      this.point = "1";
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='less' scoped>
// 选中选项后的样式

.van-field__label {
  color: #fff;
}
.button {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  .van-button {
    width: 100px;
  }
}
.van-nav-bar__left {
  p {
    color: #588ded;
  }
}
.divider {
  margin-top: 25px;
  width: 100%;
  height: 1px;
  background-color: #588ded;
}
.formArea {
  margin-top: 10px;
}
.van-cell__value {
  position: absolute;
  right: 10px;
}
.vanGroup1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  .van-cell {
    border-radius: 10px;
    padding-left: 10px;
    margin-bottom: 10px;
    width: 95%;
  }
  .questArea {
    width: 90%;
  }
  .selected {
    background-color: #588ced3b;
  }
}

.wap-nav-wrap {
  position: fixed;
  right: 0;
  width: 33px;
  height: 43px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  .van-icon {
    font-size: 24px;
  }
  &:before {
    content: "";
    width: 1px;
    height: 43px;
    background: ur1("./line.png") no-repeat;
    background-size: contain;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>