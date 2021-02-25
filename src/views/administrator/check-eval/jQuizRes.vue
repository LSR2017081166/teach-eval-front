<template>
  <div class="jQuizRes">
    <!-- 标题栏 -->
    <van-nav-bar
      title="简答题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- 简答题的tab标签 -->
    <van-tabs v-model="active" color="#588ded">
      <van-tab
        v-for="(item, index) in result"
        :key="index"
        :title="'第' + (index + 1) + '题'"
      >
        <!-- 题目表单 -->
        <div class="formArea">
          <!-- forKey的存在是为了在点“清空”时更新表单，消除验证规则 -->
          <van-form>
            <!-- 题目 -->
            <!-- 请输入文本 -->
            <van-field autosize v-model="item[0].title" readonly />
          </van-form>
        </div>
        <!-- 展示同一简答题的所有回答 -->
        <!-- <Field

          :title="'回答'+(index2+1)"
          icon="location-o"
          :value="item2.answer"
        /> -->
        <van-cell-group>
          <van-field
            autosize
            type="textarea"
            v-for="(item2, index2) in item"
            :key="index2"
            v-model="item2.answer"
            :label="'回答' + (index2 + 1)"
          />
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      active: 0,
      jQuizRes: [],
      result: [],
    };
  },
  components: {},
  computed: {},
  created() {
    this.jQuizRes = this.$store.state.questRes.jQuizRes;
    this.classify();
  },
  methods: {
    //   将简答题的同一题号结果放入同一数组中
    classify() {
      for (let i = 0; i < this.jQuizRes.length; i++) {
        for (let j = 0; j < this.jQuizRes[i].length; j++) {
          if (!this.result[j]) {
            this.result.push([]);
          }
          this.result[j].push(this.jQuizRes[i][j]);
        }
      }
      console.log(this.result);
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='less' scoped>
.divider {
  width: 100%;
  height: 2px;
  background-color: #588ded;
}
.van-cell {
  border-top: 1px solid #666;
}
</style>