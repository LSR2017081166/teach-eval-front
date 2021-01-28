<!-- 点击“编辑题目”页面的简答题，展示该试卷的简答题-->
<template>
  <div class="jQuiz">
        <!-- 标题栏 -->
    <van-nav-bar
      :title="jQuizs[0].questName"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- tab标签 -->
    <van-tabs v-model="active" color="#588ded">
      <van-tab
        v-for="value in jQuizs.length"
        :key="value"
        :title="'第' + value + '题'"
      >
        <!-- 题目表单 -->
        <div class="formArea">
          <!-- 题目 -->
          <!-- 请输入文本 -->
          <van-field
            v-model="jQuizs[value - 1].title"
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
    />
      <question-edit
        :quest="quest"
        :jQuizs="jQuizs"
        @close="show = false"
        @update-active="onUpdateActive"
        @add-select="addSelect"
      />
  </div>
</template>

<script>
import { Dialog } from "vant";
import QuestionEdit from "@/components/question-edit";

export default {
  name: "",
  props: {},
  data() {
    return {
      show:false,
      // active指向需要
      point: "1",
      // 问卷对象
      questionnaire: this.$store.state.questionnaire,
      jQuizs: [],
      active: 0,
      // // 判断是否加入新题，0为否，1为是
      // newQuestion:'0'
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  created() {
        this.jQuizs = this.questionnaire.jQuizs;
    // 判断是否是“添加新题的操作”
    if(this.$route.params.newQuestion){
      this.active=this.jQuizs.length
      this.jQuizs.push({
        questName:this.jQuizs[0].questName,
        title:''
      })
      console.log(this.jQuizs);
      return;
    }
    this.active = this.$route.params.value;

    console.log(this.jQuizs);
  },
  methods: {
    // 重置清空
    reset() {
      // this.jQuizs[this.active] = {
      //   title: "",
      // };
      // this.formKey = +new Date();
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    }
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