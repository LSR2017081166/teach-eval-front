<template>
  <div class="question-edit">
    <van-cell center :border="false">
      <div slot="title">{{ realValue[0].questName }}</div>
      <van-button type="info" plain round size="mini">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="value in quest.length"
        :key="value"
        :text="'第' + value + '题'"
        @click="intoQuest(value)"
      />
      <van-grid-item icon="add-o" class="grid-item" />
    </van-grid>
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
  },
  data() {
    return {
        realValue: this.quest
    };
  },
  components: {},
  computed: {},
    watch: {
    quest:{
       deep: true,
       handler(v) {
          this.realValue = v
       }
    }
  },
  methods: {
    //   点击题号，进入对应题目
    intoQuest(value) {
        console.log(this.quest);
      // 切换题目
      this.$emit("update-active", value);
      // 发送给父组件，让其关闭弹出层
      this.$emit("close");
    },
  },
};
</script>
<style lang='less' scoped>
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
      }
    }
  }
}
</style>