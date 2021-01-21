<template>
  <div class="addIndex">
    <!-- 标题栏 -->
    <van-nav-bar
      title="创建问卷"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="other-pay" size="23" @click="showPopup" />
      </template>
    </van-nav-bar>
    <!-- 问卷名称单元格 -->
    <van-cell :title="questionnaire.name" :value="subNum" />
    <!-- 题目表单 -->
    <div class="formArea">
      <!-- forKey的存在是为了在点“清空”时更新表单，消除验证规则 -->
      <van-form :key="formKey">
        <!-- 题目 -->
        <van-field
          v-model="subject.title"
          label="题目"
          placeholder="请输入题目"
          :rules="[{ required: true }]"
        />
        <!-- 选项 -->
        <div class="vanGroup1">
          <van-field
            v-model="subject.optionA"
            label="选项A"
            placeholder="请输入选项"
            :rules="[{ required: true }]"
          />
          <van-field
            v-model="subject.optionB"
            label="选项B"
            placeholder="请输入选项"
            :rules="[{ required: true }]"
          />
          <van-field
            v-model="subject.optionC"
            label="选项C"
            placeholder="请输入选项"
            :rules="[{ required: true }]"
          />
          <van-field
            v-model="subject.optionD"
            label="选项D"
            placeholder="请输入选项"
            :rules="[{ required: true }]"
          />
        </div>
        <!-- 分值 -->
        <div class="vanGroup2">
          <van-field
            v-model.number="subject.scoreA"
            placeholder="A分值"
            :rules="[{ validator }]"
          />
          <van-field
            v-model.number="subject.scoreB"
            placeholder="B分值"
            :rules="[{ validator }]"
          />
          <van-field
            v-model.number="subject.scoreC"
            placeholder="C分值"
            :rules="[{ validator }]"
          />
          <van-field
            v-model.number="subject.scoreD"
            placeholder="D分值"
            :rules="[{ validator }]"
          />
        </div>
      </van-form>
    </div>
    <!-- 其他信息部分 -->
    <div class="otherInfo">
      <!-- 分割线 -->
      <div class="divider"></div>
      <!-- 可编辑分数 -->
      <van-tag color="#588ded">可编辑分数: {{ editScore }} / 100</van-tag>
      <!-- 清空按钮 -->
      <van-button plain color="#588ded" @click="reset">清空</van-button>
      <!-- 保存按钮 -->
      <van-button color="#588ded" @click="reset">保存</van-button>
      <!-- 底部导航 -->
      <van-nav-bar left-text="上一题" @click-right="addSub">
        <template #right>
          <van-icon name="add-o" size="25" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 菜单弹出层 -->
    <van-popup v-model="show1" position="bottom" :style="{ height: '30%' }">
      <div class="menuItem">
        <van-grid direction="horizontal" :column-num="1">
          <van-grid-item icon="coupon" text="题目概览" />
          <van-grid-item
            icon="add"
            text="加入简答"
            to="/add-index2"
            @click="addJQuiz"
          />
          <van-grid-item icon="notes-o" text="暂存问卷" @click="tempQuest" />
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { createApp } from "vue";
import { Dialog } from "vant";
import { Toast } from "vant";
import { createQuest } from "@/api/questionnaire/createQuest";
export default {
  name: "",
  props: {},
  data() {
    return {
      // 可编辑分数
      editScore1: 0,
      formKey: 0,
      show1: false,
      show2: false,
      // 问卷对象
      questionnaire: this.$store.state.questionnaire,
      // 题目信息
      subject: {
        // 题号
        subKey: 0,
        title: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        scoreA: "",
        scoreB: "",
        scoreC: "",
        scoreD: "",
      },
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  mounted() {
    // 问卷的题目数+1
    this.subject.subKey++;
  },
  computed: {
    // 计算可编辑分数
    editScore: function () {
      let score =
        this.questionnaire.score -
        (this.subject.scoreA +
          this.subject.scoreB +
          this.subject.scoreC +
          this.subject.scoreD);
      if (score >= 0) {
        this.editScore1 = score;
        return score;
      } else {
        Toast.fail("可编辑分数不足！");
        return;
      }
    },
    // 计算题目位置(例如 1/10)
    subNum: function () {
      // 分母
      let den = this.questionnaire.subjects.length + 1;
      // 分子
      let numer = this.subject.subKey;
      return numer + "/" + den;
    },
  },
  methods: {
    // 添加简答题
    addJQuiz() {},
    // 暂存问卷
    async tempQuest() {
      const res = await createQuest(this.questionnaire);
      console.log(res);
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /^\d+(?=\.{0,1}\d+$|$)/.test(val);
    },
    // 重置清空
    reset() {
      this.subject = {
        subKey: this.subject.subKey + 1,
        title: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        scoreA: "",
        scoreB: "",
        scoreC: "",
        scoreD: "",
      };
      this.formKey = +new Date();
    },
    // 点击‘+’
    addSub() {
      // 这里判断用户编写题目是否规范
      for (let value in this.subject) {
        if (this.subject[value] == "") {
          Toast.fail("请检查编写题目是否规范！");
          return;
        }
      }
      // 将刚刚编写的一道题存入vuex中
      this.questionnaire.subjects.push(this.subject);
      // 更新可编辑分数
      this.questionnaire.score = this.editScore1;
      // 更新vuex中的“未发布问卷”
      this.$store.commit("setQuest", this.questionnaire);
      // 清空题目，进入下一题
      this.reset();
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 是否显示遮罩层
    showPopup() {
      this.show1 = true;
    },
  },
};
</script>
<style lang='less' scoped>
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