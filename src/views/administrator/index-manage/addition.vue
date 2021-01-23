<!-- ‘添加指标’页面-->
<template>
  <div class="choose-quest">
    <!-- 标题栏 -->
    <van-nav-bar :title="questName"> </van-nav-bar>
    <!-- tab标签 -->
    <van-tabs v-model="active" color="#588ded">
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
            <van-field v-model="quest[value - 1].title" label="题目" />
            <!-- 选项 -->
            <div class="vanGroup1">
              <van-field v-model="quest[value - 1].optionA" label="选项A" />
              <van-field v-model="quest[value - 1].optionB" label="选项B" />
              <van-field v-model="quest[value - 1].optionC" label="选项C" />
              <van-field v-model="quest[value - 1].optionD" label="选项D" />
            </div>
            <!-- 分值 -->
            <div class="vanGroup2">
              <van-field v-model.number="quest[value - 1].scoreA" />
              <van-field v-model.number="quest[value - 1].scoreB" />
              <van-field v-model.number="quest[value - 1].scoreC" />
              <van-field v-model.number="quest[value - 1].scoreD" />
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
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      get-container="body"
    >
    <question-edit :quest='quest' @close='show=false' @update-active='onUpdateActive'/>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { getQuestions } from "@/api/questionnaire/getQuestions";
import QuestionEdit from '@/components/question-edit';
export default {
  name: "",
  props: {},
  data() {
    return {
      questName: "",
      active: 1,
      quest: [],
      editScore: 0,
      show: true,
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component ,QuestionEdit},
  computed: {},
  created() {
    this.questName = this.$route.params.questName;
    this.editScore = this.$route.params.editScore;
    this.getQuest();
  },
  methods: {
    onUpdateActive(value){
      this.active=value-1
    },
    // 得到该问卷题目信息
    async getQuest() {
      let name = this.questName;
      const res = await getQuestions({ name });
      this.quest = res.data;
      console.log(this.quest);
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