<template>
  <div class="results">
    <!-- 标题栏 -->
    <van-nav-bar title="评教结果"></van-nav-bar>
          <!-- 请选择学期 -->
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="value"
        label="问卷期限"
        placeholder="点击选择学期"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="time"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    <!-- 所有评教问卷结果 -->
    <van-button plain type="info" size="large" v-for="value in 10" :key="value"
      >2020-2021学年第1学期调查问卷结果</van-button
    >
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      show1: false,
      show2: false,
      message: "",
      value: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false,
    };
  },
  components: {},
  computed: {},
  methods: {
  }
};
</script>
<style lang='less' scoped>
.results {
  .van-button {
    margin-top: 20px;
    border-radius: 10px;
  }
}
</style>