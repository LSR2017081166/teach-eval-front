<template>
  <div class="inputQuestInfo">
    <!-- 标题栏 -->
    <van-nav-bar
      title="创建问卷"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- 问卷信息填写 -->
    <div class="addQuestInfo">
      <!-- 请输入问卷名称 -->
      <van-field v-model="questionnaire.name" label="问卷名称" required />
      <!-- 选择问卷填写时间区间 -->
      <van-cell
        title="选择该问卷评教时间区间"
        :value="questionnaire.section"
        @click="show = true"
      />
      <van-calendar
        v-model="show"
        type="range"
        @confirm="onConfirm"
        color="#588ded"
      />
    </div>
    <!-- 底部导航 -->
    <div class="otherInfo">
      <van-nav-bar>
        <template #right>
          <van-icon name="add-o" size="25" @click="intoAddIndex" />
        </template>
      </van-nav-bar>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "",
  props: {},
  data() {
    return {
      date: "",
      show: false,
      // 未发布问卷对象
      questionnaire: {
        // 问卷名称
        name: "",
        // 问卷时间区间
        section: "",
        // 问卷初始题目
        subjects:[],
        // 问卷简答题
        jQuizs:[],
        // 问卷初始可编辑分数
        score:100,
        // 是否发布(0为未发布，1为已发布)
        publish:0
      },
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  methods: {
    // 选择时间区间
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.questionnaire.section = `${this.formatDate(start)} - ${this.formatDate(
        end
      )}`;
    },
    showDialog() {
      // 这里判断是否有问卷生成？？？？？？
      if (this.show === false)
        Dialog.confirm({
          title: "提示",
          message: "暂无问卷生成",
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
    },
    intoAddIndex() {
      // 判断用户是否填写了完整的信息
      if (this.questionnaire.name === "" || this.questionnaire.section === "") {
        Dialog.confirm({
          title: "提示",
          message: "请填写完整的问卷信息",
        });
      } else {
        this.$router.push("/add-index");
        // 将用户填写的“未发布问卷”对象放到Vuex容器中
        this.$store.commit("setQuest", this.questionnaire);
      }
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='less' scoped>
.otherInfo {
  .van-nav-bar {
    background-color: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;
    .van-icon {
      color: #588ded;
    }
  }
}
.addQuestInfo {
  margin-top: 10px;
  .van-cell__title {
    border-right: 1px solid #666;
  }
  .van-field {
    margin-bottom: 10px;
  }
}
</style>