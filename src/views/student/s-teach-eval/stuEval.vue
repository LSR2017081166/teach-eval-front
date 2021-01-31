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
          <!-- forKey的存在是为了在点“清空”时更新表单，消除验证规则 -->
          <van-form>
            <!-- 题目 -->
            <!-- <van-field v-model="quest[value - 1].title" label="题目" /> -->
            <van-field v-model="quest[value - 1].title" label="题目" readonly />
            <!-- 选项 -->
            <div class="vanGroup1">
              <van-field
                :class="{ selectedA: selectedA }"
                v-model="quest[value - 1].optionA"
                :label="'A' + '(' + quest[value - 1].scoreA + '分)'"
                readonly
                @click="getScoreA('A', quest[value - 1].scoreA)"
              />
              <van-field
                :class="{ selectedB: selectedB }"
                v-model="quest[value - 1].optionB"
                :label="'B' + '(' + quest[value - 1].scoreB + '分)'"
                readonly
                @click="getScoreB('B', quest[value - 1].scoreB)"
              />
              <van-field
                :class="{ selectedC: selectedC }"
                v-model="quest[value - 1].optionC"
                :label="'C' + '(' + quest[value - 1].scoreC + '分)'"
                readonly
                @click="getScoreC('C', quest[value - 1].scoreC)"
              />
              <van-field
                :class="{ selectedD: selectedD }"
                v-model="quest[value - 1].optionD"
                :label="'D' + '(' + quest[value - 1].scoreD + '分)'"
                readonly
                @click="getScoreD('D', quest[value - 1].scoreD)"
              />
            </div>
          </van-form>
        </div>
        <!-- 分割线 -->
        <div class="divider"></div>
        <div class="button">
          <van-button plain type="info">暂存</van-button>
          <van-button type="info">提交</van-button>
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
            <!-- 请输入文本 -->
            <van-field
              v-model="jQuizs[value - 1].title"
              rows="5"
              autosize
              type="textarea"
            />
          </van-form>
        </div>
        <!-- 分割线 -->
        <div class="divider"></div>
        <div class="button">
          <van-button plain type="info">暂存</van-button>
          <van-button type="info">提交</van-button>
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

export default {
  name: "",
  props: {},
  data() {
    return {
      // 
      // 选中项样式
      selectedA: false,
      selectedB: false,
      selectedC: false,
      selectedD: false,
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
    // 从vuex中取出该问卷的信息和题目集
    let a = this.$store.state.questionnaire;
    this.questName = a[0][0].questName;
    this.quest = a[0];
    this.jQuizs = a[1];
  },
  methods: {
    // 点击选项，得到选中选项和对应分值
    getScoreA(option, score) {
      this.selectedA = true;
      this.selectedB = false;
      this.selectedC = false;
      this.selectedD = false;
      console.log(option, score);
    },
    getScoreB(option, score) {
      this.selectedB = true;
      this.selectedA = false;
      this.selectedC = false;
      this.selectedD = false;
      console.log(option, score);
    },
    getScoreC(option, score) {
      this.selectedC = true;
      this.selectedB = false;
      this.selectedA = false;
      this.selectedD = false;
      console.log(option, score);
    },
    getScoreD(option, score) {
      this.selectedD = true;
      this.selectedB = false;
      this.selectedC = false;
      this.selectedA = false;
      console.log(option, score);
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
  .selectedA {
    background-color: #588ced3b;
  }
  .selectedB {
    background-color: #588ced3b;
  }
  .selectedC {
    background-color: #588ced3b;
  }
  .selectedD {
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