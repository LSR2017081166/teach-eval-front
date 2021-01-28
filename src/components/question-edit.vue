<template>
  <div class="question-edit">
    <van-cell center :border="false">
      <!-- <div slot="title">{{ quest[0].questName }}</div> -->
      <div slot="title">选择题</div>
      <van-button
        type="info"
        plain
        round
        size="mini"
        @click="isEdit1 = !isEdit1"
        >{{ isEdit1 ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :icon="isEdit1 ? 'clear' : ''"
        :class="{ active: index === active1 }"
        v-for="(value, index) in quest.length"
        :key="index"
        :text="'第' + (index + 1) + '题'"
        @click="onUserChannelClick1(index)"
      />
      <van-grid-item icon="add-o" class="grid-item1" @click="addQuest1" />
    </van-grid>
    <!-- 简答题 -->
    <van-cell center :border="false">
      <!-- <div slot="title">{{ quest[0].questName }}</div> -->
      <div slot="title">简答题</div>
      <van-button
        type="info"
        plain
        round
        size="mini"
        @click="isEdit2 = !isEdit2"
        >{{ isEdit2 ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :icon="isEdit2 ? 'clear' : ''"
        :class="{ active: index === active2 }"
        v-for="(value, index) in jQuizs.length"
        :key="index"
        :text="'第' + (index + 1) + '题'"
        @click="onUserChannelClick2(index)"
      />
      <van-grid-item icon="add-o" class="grid-item1" @click="addQuest2" />
    </van-grid>
    <van-button class='submitButton' icon="add-square" type="info" size="large" round @click="tempSave">暂存</van-button>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    quest: {
      type: Array,
      required: true,
    },
    jQuizs: {
      type: Array,
      required: true,
    },
    active1: {
      type: Number,
      required: true,
    },
    active2: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isEdit1: false, //控制编辑的显示状态
      isEdit2: false,
    };
  },
  components: {},
  computed: {},
  methods: {
    // 点击暂存
    tempSave(){
      this.$emit("temp-save");
    },
    // 点击加号，添加选择题
    addQuest1() {
      this.$emit("add-select");
      this.$emit("close");
    },
    // 选择题：点击题号，进入对应题目
    onUserChannelClick1(index) {
      if (this.isEdit1) {
        //如果删除的是当前激活频道之前的频道
        if (index <= this.active1) {
          //更新激活频道的索引
          this.$emit("update-active1", this.active1);
        }
        //编辑状态，删除频道
        this.quest.splice(index, 1);
        console.log("删除");
      } else {
        //非编辑状态，切换频道
        // 切换题目
        this.$emit("update-active1", index + 1);
        // 发送给父组件，让其关闭弹出层
        this.$emit("close");
      }
    },
    // 简答题：点击题号，进入对应题目
    onUserChannelClick2(index) {
      if (this.isEdit2) {
        //如果删除的是当前激活频道之前的频道
        if (index <= this.active2) {
          //更新激活频道的索引
          this.$emit("update-active2", this.active2);
        }
        //编辑状态，删除频道
        this.jQuizs.splice(index, 1);
        console.log("删除");
      } else {
        //非编辑状态，切换频道
        // 切换题目
        this.$emit("update-active2", index + 1);
        // 发送给父组件，让其关闭弹出层
        this.$emit("close");
      }
    },
    addQuest2() {
      this.$emit("add-jQuiz");
      this.$emit("close");
    },
  },
};
</script>
<style lang='less' scoped>
.submitButton{
  margin-top: 30px;
  height: 35px;
}
.active {
  /deep/ .van-grid-item__text {
    color: #588ded !important;
  }
}
.question-edit {
  padding-top: 54px;
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
}
.question-edit {
  padding-top: 54px;
  .grid-item1 {
    width: 80px;
    height: 43px;
  }
}
</style>