<template>
  <div class="addIndex">
    <!-- 标题栏 -->
    <van-nav-bar title="创建问卷">
      <template #right>
        <van-icon name="other-pay" size="23" @click="showPopup1" />
      </template>
    </van-nav-bar>
    <!-- 问卷名称单元格 -->
    <van-cell :title="questionnaire.name" :value="subNum" />
    <!-- 题目表单 -->
    <div class="formArea">
      <!-- 题目 -->
      <!-- 请输入文本 -->
      <van-field
        v-model="jQuiz.title"
        rows="5"
        autosize
        type="textarea"
        placeholder="请输入简答题"
      />
    </div>
    <!-- 其他信息部分 -->
    <div class="otherInfo">
      <!-- 分割线 -->
      <div class="divider"></div>
      <!-- 清空按钮 -->
      <van-button plain color="#588ded" @click="reset">清空</van-button>
    </div>
    <!-- 菜单弹出层 -->
    <van-popup v-model="show1" position="bottom" :style="{ height: '10%' }">
      <div class="menuItem">
        <van-grid direction="horizontal" :column-num="1">
          <van-grid-item icon="notes-o" text="暂存问卷" @click="tempQuest" />
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import { createQuest } from "@/api/questionnaire/createQuest";

export default {
  name: "",
  props: {},
  data() {
    return {
      // 分母
      den: 0,
      // 菜单弹出层
      show1: false,
      jQuiz: {
        title: "",
        questionKey: 0,
      },
      // 问卷对象
      questionnaire: this.$store.state.questionnaire,
    };
  },
  components: {},
  computed: {
    // 返回“题目概览”的每道题分值
    questScore: function () {
      let a = [];
      let b = this.questionnaire.subjects;
      for (let i = 0; i < b.length; i++) {
        a.push(b[i].scoreA + b[i].scoreB + b[i].scoreC + b[i].scoreD);
      }
      console.log(a);
      return a;
    },
    // 计算题目位置(例如 1/10)
    subNum: function () {
      let a = this.questionnaire.subjects.length;
      let b = this.questionnaire.jQuizs.length;
      // 分母
      this.jQuiz.questionKey = a + b + 1;
      this.den = this.jQuiz.questionKey;

      // 分子
      let numer = this.jQuiz.questionKey;
      return numer + "/" + this.den;
    },
  },
  methods: {
    // 重置清空
    reset() {
      this.jQuiz = {
        questionKey: this.jQuiz.questionKey + 1,
        title: "",
      };
      // this.formKey = +new Date();
    },
    // 点击‘暂存问卷’
    async tempQuest() {
      // 隐蔽弹出层
      this.show1 = false;
      // 这里判断用户编写题目是否规范
      for (let value in this.jQuiz) {
        if (this.jQuiz[value] == "") {
          Toast.fail("请检查编写题目是否规范！");
          return;
        }
      }
      // 将刚刚编写的一道题存入vuex中
      this.questionnaire.jQuizs.push(this.jQuiz);
      // 更新vuex中的问卷
      this.$store.commit("setQuest", this.questionnaire);
      this.$router.push("/administrator");
      Toast.success("暂存问卷成功！");
      const res = await createQuest(this.questionnaire);
    },
    // 菜单弹出层
    showPopup1() {
      this.show1 = true;
    },
  },
};
</script>
<style lang='less' scoped>
.menuItem {
  font-size: 20px;
  padding-top: 10px;
}
.num {
  width: 30px;
  height: 30px;
  background-color: #588ded;
  border-radius: 50%;
  text-align: center;
  margin-bottom: 6px;
  span {
    line-height: 30px;
  }
}
.otherInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-tag {
    margin-top: 20px;
    height: 30px;
    font-size: 15px;
    border-radius: 10px;
  }
  .van-button {
    margin-top: 10px;
    height: 35px;
  }
  .van-nav-bar {
    background-color: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;
    .van-icon {
      color: #588ded;
    }
  }
  .van-nav-bar__content {
    height: 20px;
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
}
.vanGroup2 {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  .van-cell {
    width: 23%;
    border-radius: 5px;
  }
}
</style>