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
      <van-button plain color="#588ded">清空</van-button>
      <!-- 底部导航 -->
      <van-nav-bar left-text="上一题" @click-left="lastQuestion">
      </van-nav-bar>
    </div>
    <!-- 菜单弹出层 -->
    <van-popup v-model="show1" position="bottom" :style="{ height: '30%' }">
      <div class="menuItem">
        <van-grid direction="horizontal" :column-num="1">
          <van-grid-item icon="coupon" text="题目概览" @click="showPopup2" />
          <van-grid-item
            icon="add"
            text="加入简答"
            to="/add-index2"
            @click="addSub"
          />
          <van-grid-item icon="notes-o" text="暂存问卷" />
        </van-grid>
      </div>
    </van-popup>
    <!-- 题目概览弹出层 -->
    <van-popup v-model="show2" position="bottom" :style="{ height: '30%' }">
      <div class="menuItem">
        <van-grid :border="false" :column-num="5">
          <van-grid-item v-for="value in 10" :key="value">
            <p class="num">
              <span>{{ value }}</span>
            </p>
            <p>10</p>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "",
  props: {},
  data() {
    return {
      // 菜单弹出层
      show1: false,
      // 题目概览弹出层
      show2: false,
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
    // 计算题目位置(例如 1/10)
    subNum: function () {
      let a = this.questionnaire.subjects.length;
      let b = this.questionnaire.jQuizs.length;
      // 分母
      this.jQuiz.questionKey = a + b + 1;
      let den = this.jQuiz.questionKey;

      // 分子
      let numer = this.jQuiz.questionKey;
      return numer + "/" + den;
    },
  },
  methods: {
    // 上一题
    lastQuestion(){
      // 判断上一道题型
      let a=this.jQuiz.questionKey
      let b=this.questionnaire.jQuizs.length
      if(b===0){//说明进入了add-index2页面却没有添加任何简答题
        this.$router.push('/add-index')
      }
    },
    // 重置清空
    reset() {
      this.jQuiz = {
        questionKey: this.jQuiz.questionKey + 1,
        title: ""
      };
      // this.formKey = +new Date();
    },
    // 点击‘加入简答’
    addSub() {
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
      // 清空题目，进入下一题
      this.reset();
    },
    // 菜单弹出层
    showPopup1() {
      this.show1 = true;
    },
    // 题目概览弹出层
    showPopup2() {
      this.show2 = true;
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