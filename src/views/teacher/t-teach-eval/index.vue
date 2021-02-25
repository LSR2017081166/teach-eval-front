<template>
  <div class="">
    <!-- 标题栏 -->
    <van-nav-bar title="教师互评"> </van-nav-bar>
    <!-- 点击进入教师选择被评教师页面 -->
    <div
      class="questItem"
      v-for="(item, index) in teaQuest"
      :key="index"
      @click="teaEval(item.name)"
    >
      <!-- 问卷名称 -->
      <div class="name">{{ item.name }}</div>
      <!-- 分割线 -->
      <div class="divider"></div>
      <div class="num">被评: 3 人 已评: 0 人</div>
      <van-count-down :time="time" format="07 天 05 时 23 分 33 秒" />
      <div class="section">12-27 08:00 ~ 01-16 08:00</div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { getQuestions } from "@/api/questionnaire/getQuestions";
import { getJQuizs } from "@/api/questionnaire/getJQuizs";
import { delAllQuests } from "@/api/questionnaire/delAllQuests";
import QuestionEdit from "@/components/question-edit";
import { Toast } from "vant";
import { createQuest } from "@/api/questionnaire/createQuest";
import { pubQuest } from "@/api/questionnaire/pubQuest";
import { getPubInfo } from "@/api/questionnaire/getQuestInfo";
export default {
  name: "TeachEval",
  props: {},
  data() {
    return {
      time: 0,
      // 查询已发布问卷作为教师即将填写的问卷
      teaQuest: [],
    };
  },
  components: {},
  computed: {},
  created() {
    this.getPubInfo1();
  },
  methods: {
    // 得到已发布问卷信息
    async getPubInfo1() {
      let res = await getPubInfo();
      let a = res.data;
      for (let i = 0; i < a.length; i++) {
        if (a[i].questType === "2") {
          this.teaQuest.push(a[i]);
        }
      }
    },
    async teaEval(questName) {
      this.$router.push({
        path: "/selectTea",
        name: "selectTea",
        params: {
          questName
        },
      });
    },
  },
};
</script>
<style lang='less' scoped>
.section {
  color: #666;
  font-size: 20px;
}
.van-count-down {
  background-color: #588ded;
  color: #fff;
  padding: 3px;
  border-radius: 5px;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: #666;
}
.van-contact-card {
  margin-top: 10px;
}
.questItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
  height: 13 0px;
  background-color: #fff;
  border: 3px solid #588ded;
  border-radius: 10px;
  .name {
    color: #588ded;
    font-size: 20px;
  }
  .num {
    color: #666;
    font-size: 20px;
  }
}
</style>