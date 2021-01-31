<!-- ‘添加指标’页面-->
<template>
  <div class="choose-quest">
    <!-- 标题栏 -->
    <van-nav-bar
      title="被评教师"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell
      v-for="(item, index) in courseInfo"
      :key="index"
      :title="item.name"
      value="未评教"
      size="large"
      :label="item.teacher"
      icon="notes-o"
      @click="intoStuEval"
    />
  </div>
</template>

<script>
import { Dialog } from "vant";
import { getCourse } from "@/api/course/getCourse";

export default {
  name: "",
  props: {},
  data() {
    return {
      courseInfo: [],
      idInfo: this.$store.state.idInfo,
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  created() {
    this.getCourseInfo();
  },
  methods: {
    // 进入学生评教问卷
    intoStuEval(){
      this.$router.push('/stuEval');
    },
    // 获取被评课程信息
    async getCourseInfo() {
      let { academy, classInfo, grade } = this.idInfo;
      let res = await getCourse({ academy, classInfo, grade });
      this.courseInfo = res.data;
      console.log(this.courseInfo);
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='less' scoped>
</style>