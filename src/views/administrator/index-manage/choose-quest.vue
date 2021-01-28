<!-- 点击‘添加指标’，‘修改指标’，‘删除指标’后展示暂存的问卷列表 -->
<template>
  <div class="choose-quest">
    <!-- 标题栏 -->
    <van-nav-bar title="暂存问卷" left-text="返回"
      left-arrow
      @click-left="onClickLeft"> </van-nav-bar>
    <van-grid direction="horizontal" :column-num="1">
      <van-grid-item icon="notes-o" v-for="(item,index) in allQuest" :key='index' :text="item.name" @click="intoQuest(item.name,item.score,item.publish,item.section)"/>
    </van-grid>
  </div>
</template>

<script>
import { Dialog } from "vant";
import {getQuestInfo} from "@/api/questionnaire/getQuestInfo";
export default {
  name: "",
  props: {},
  data() {
    return {
      // 所有问卷信息
      allQuest:[]
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  created(){
    this.getQuestInfo1()
  },
  methods: {
    // 进入问卷
    async intoQuest(name,score,publish,section){
      this.$router.push({
        path:'/addition',
        name:'addition',
        params:{
          questName:name,
          editScore:score,
          publish,
          section
        }
      });
    },
    // 获取全部（暂存和已发布）问卷信息
    async getQuestInfo1(){
      const res = await getQuestInfo();
     this.allQuest = res.data;
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    }
  },
};
</script>
<style lang='less' scoped>
.van-grid-item{
  margin-bottom: 5px;
}
</style>