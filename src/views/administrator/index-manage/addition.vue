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
            <van-field
              v-model="quest[value - 1].title"
              label="题目"
              placeholder="请输入题目"
              :rules="[{ required: true }]"
            />
            <!-- 选项 -->
            <div class="vanGroup1">
              <van-field
                v-model="quest[value - 1].optionA"
                label="选项A"
                placeholder="请输入选项"
                :rules="[{ required: true }]"
              />
              <van-field
                v-model="quest[value - 1].optionB"
                label="选项B"
                placeholder="请输入选项"
                :rules="[{ required: true }]"
              />
              <van-field
                v-model="quest[value - 1].optionC"
                label="选项C"
                placeholder="请输入选项"
                :rules="[{ required: true }]"
              />
              <van-field
                v-model="quest[value - 1].optionD"
                label="选项D"
                placeholder="请输入选项"
                :rules="[{ required: true }]"
              />
            </div>
            <!-- 分值 -->
            <div class="vanGroup2">
              <van-field
                v-model.number="quest[value - 1].scoreA"
                placeholder="A分值"
                :rules="[{ validator }]"
              />
              <van-field
                v-model.number="quest[value - 1].scoreB"
                placeholder="A分值"
                :rules="[{ validator }]"
              />
              <van-field
                v-model.number="quest[value - 1].scoreC"
                placeholder="A分值"
                :rules="[{ validator }]"
              />
              <van-field
                v-model.number="quest[value - 1].scoreD"
                placeholder="A分值"
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
              placeholder="请输入简答题"
              :rules="[{ required: true }]"
            />
          </van-form>
        </div>
        <!-- 其他信息部分 -->
        <div class="otherInfo">
          <!-- 分割线 -->
          <div class="divider"></div>
          <!-- 可编辑分数 -->
          <!-- 清空按钮 -->
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
      <question-edit
        :active1="active1"
        :active2="active2"
        :quest="quest"
        :jQuizs="jQuizs"
        @close="show = false"
        @update-active1="onUpdateActive1"
        @update-active2="onUpdateActive2"
        @add-select="addSelect"
        @add-jQuiz="addJQuiz"
        @specification="specification"
        @temp-save="tempSave"
        @publish="pubQuest"
      />
    </van-popup>
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

export default {
  name: "",
  props: {},
  data() {
    return {
      // 判断后来添加的选择题数量
      selectNum: 0,
      // 判断后来添加的简答题数量
      jQuizNum: 0,
      // 判断是选择题还是简答题,0是选择，1是简答
      type: 0,
      // 问卷对象
      questionnaire: {
        // 问卷名称
        name: "",
        // 问卷时间区间
        section: "",
        // 问卷选择题
        subjects: [],
        // 问卷简答题
        jQuizs: [],
        // 问卷初始可编辑分数
        score: 100,
        // 是否发布(0为未发布，1为已发布)
        publish: 0,
        // 编辑中的页面对象
      },
      // 简答题数组
      jQuizs: [],
      // active指向需要
      point: "1",
      questName: "",
      active1: 0,
      active2: 0,
      quest: [],
      show: false,
      // 添加选择题
      addSelect1: [],
      // 添加简答题
      addJQuiz1: [],
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component, QuestionEdit },
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
    this.questName = this.$route.params.questName;
    this.publish = this.$route.params.publish;
    this.section = this.$route.params.section;
    // 选择问卷后设置questionnaire有关的新的信息
    this.questionnaire.name = this.questName;
    this.questionnaire.publish = this.publish;
    this.questionnaire.section = this.section;
    this.getQuest();
  },
  methods: {
    // 发布问卷
    pubQuest() {
      // 检查可编辑分数是否为0
      let name = this.questName;
      if (this.editScore === 0) {
        Dialog.confirm({
          title: "提示",
          message: "发布后无法更改，确认发布吗？",
        })
          .then(async () => {
            let res = await pubQuest({ name });
            if (res.data === "ok") {
              Toast.success("问卷发布成功!");
            }
          })
          .catch(() => {
            Toast.fail("问卷发布失败！");
          });
      } else {
        Toast.fail("所编写题目要求总分为100！");
      }
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /^\d+(?=\.{0,1}\d+$|$)/.test(val);
    },
    // 暂存问卷，删除所有原题后，重新存入数据库
    async tempSave() {
      // 判断问题是否都填写规范
      // 选择题
      for (let i = 0; i < this.quest.length; i++) {
        let a = this.quest[i];
        for (let value in a) {
          if (a[value] === "") {
            Toast.fail("请检查编写题目是否规范！");
            return;
          }
        }
      }
      // 简答题
      for (let j = 0; j < this.jQuizs.length; j++) {
        let b = this.jQuizs[j];
        for (let value in b) {
          if (b[value] === "") {
            Toast.fail("请检查编写题目是否规范！");
            return;
          }
        }
      }
      // 删除该问卷下所有题目
      let name = this.questName;
      this.questionnaire.subjects = this.quest;
      // 更新vuex中的“未发布问卷”
      this.$store.commit("setQuest", this.questionnaire);
      const res1 = await delAllQuests({ name });
      if (res1.data === "ok") {
        await createQuest(this.questionnaire);
        Toast.success("问卷暂存成功!");
      }

      // 加入新的题目
    },
    // 判断上一道题是否符合规范
    specification() {
      if (this.type === 0) {
        for (let value in this.quest) {
          if (this.quest[value] == "") {
            Toast.fail("请检查编写题目是否规范！");
            return;
          }
        }
      }
      if (this.type === 1) {
        for (let value in this.jQuizs) {
          if (this.jQuizs[value] == "") {
            Toast.fail("请检查编写题目是否规范！");
            return;
          }
        }
      }
    },
    // 点击“+”添加选择题
    addSelect() {
      this.selectNum++;
      this.type = 0;
      this.addSelect1.push({
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
      });
      let a = this.addSelect1[this.selectNum - 1];
      this.quest.push(a);
      this.point = "2";
    },
    // 点击“+”添加简答题
    addJQuiz() {
      this.jQuizNum++;
      this.type = 1;
      this.addJQuiz1.push({
        title: "",
      });
      let a = this.addJQuiz1[this.jQuizNum - 1];
      this.jQuizs.push(a);
      this.point = "2";
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
    // 得到该问卷题目信息
    async getQuest() {
      let name = this.questName;
      // 选择问卷后设置questionnaire有关的新的信息
      // 获取选择题
      const res1 = await getQuestions({ name });
      this.quest = res1.data;
      this.questionnaire.subjects = this.quest;
      console.log(this.quest);
      // 获取简答题
      const res2 = await getJQuizs({ name });
      this.jQuizs = res2.data;
      this.questionnaire.jQuizs = this.jQuizs;
      // 存入vuex
      this.$store.commit("setQuest", this.questionnaire);
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='less' scoped>
.van-nav-bar__left {
  p {
    color: #588ded;
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
.wap-nav-placeholder {
  width: 33px;
  flex-shrink: 0;
}
</style>