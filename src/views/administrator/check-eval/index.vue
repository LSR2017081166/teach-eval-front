<template>
  <div class="results">
    <!-- 标题栏 -->
    <van-nav-bar title="评教结果"></van-nav-bar>
          <!-- 请选择学期 -->
      <!-- <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="value"
        label="问卷期限"
        placeholder="点击选择学期"
        @click="showPicker = true"
      /> -->
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="time"
          @cancel="showPicker = false"
        />
      </van-popup>
    <!-- 所有评教问卷结果 -->
    <div class="questItem" @click="intoQuestRes(item.name)" v-for="(item,index) in pubQuest" :key='index'>
      <!-- 问卷名称 -->
      <div class="name">{{item.name}}</div>
      <!-- 分割线 -->
      <div class="divider"></div>
      <van-count-down :time="time" format="07 天 05 时 23 分 33 秒" />
      <div class="section">12-27 08:00 ~ 01-16 08:00</div>
    </div>
  </div>
</template>

<script>
import {getPubInfo} from "@/api/questionnaire/getQuestInfo";

export default {
  name: "",
  props: {},
  data() {
    return {
      time:0,
      // 已发布问卷信息
      pubQuest:[],
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
  created(){
    this.getPubInfo1()
  },
  methods: {
    // 进入选择不同老师和课程的问卷结果页
    intoQuestRes(questName){
                  this.$router.push({
        path:'/questRes',
        name:'questRes',
        params:{
          questName
        }
      });
    },
    // 得到已发布问卷信息
        // 得到已发布问卷信息
    async getPubInfo1(){
      let res=await getPubInfo()
      this.pubQuest=res.data
    }
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
.section {
  color: #666;
  font-size: 20px;
}
.van-count-down {
  background-color: #588ded;
  color: #fff;
  padding: 3px;
  border-radius: 5px;
}
.divider {
  margin-bottom: 5px;
  width: 100%;
  height: 1px;
  background-color: #666;
}
.van-contact-card {
  margin-top: 10px;
}
.questItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
  height: 13
  0px;
  background-color: #fff;
  border: 3px solid #588ded;
  border-radius: 10px;
  .name {
    color: #588ded;
    font-size: 20px;
  }
  .num {
    color: #666;
    font-size: 20px;
  }
}
</style>