<!-- 点击‘添加指标’，‘修改指标’，‘删除指标’后展示暂存的问卷列表 -->
<template>
  <div class="choose-quest">
    <!-- 标题栏 -->
    <van-nav-bar
      title="暂存问卷"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- “教师/学生”的tab标签 -->
    <van-tabs v-model="active" color="#588ded">
      <van-tab v-for="(item, index) in arr" :key="index" :title="item">
        <!-- 学生 -->
        <van-grid direction="horizontal" :column-num="1" v-if="active === 0">
          <van-grid-item
            icon="notes-o"
            v-for="(item, index) in stuQuest"
            :key="index"
            :text="item.name"
            @click="
              intoQuest(item.name, item.score, item.publish, item.section)
            "
          />
        </van-grid>
        <!-- 老师 -->
        <van-grid direction="horizontal" :column-num="1" v-if="active === 1">
          <van-grid-item
            icon="notes-o"
            v-for="(item, index) in teaQuest"
            :key="index"
            :text="item.name"
            @click="
              intoQuest(item.name, item.score, item.publish, item.section)
            "
          />
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { getQuestInfo } from "@/api/questionnaire/getQuestInfo";
export default {
  name: "",
  props: {},
  data() {
    return {
      active: 0,
      // 教师问卷信息
      teaQuest: [],
      // 学生问卷信息
      stuQuest: [],
      arr: ["学生", "教师"],
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  created() {
    this.getQuestInfo1();
  },
  methods: {
    // 进入问卷
    async intoQuest(name, score, publish, section) {
      this.$router.push({
        path: "/addition",
        name: "addition",
        params: {
          questName: name,
          editScore: score,
          publish,
          section,
        },
      });
    },
    // 获取全部（暂存和已发布）问卷信息
    async getQuestInfo1() {
      const res = await getQuestInfo();
      let a = res.data;
      for (let i = 0; i < a.length; i++) {
        if (a[i].questType === "1") {
          this.stuQuest.push(a[i]);
        } else if (a[i].questType === "2") {
          this.teaQuest.push(a[i]);
        }
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
.van-grid-item {
  margin-top: 5px;
}
</style>