<!-- ‘添加指标’页面-->
<template>
  <div class="addition">
    <!-- 标题栏 -->
    <van-nav-bar
      :title="questName"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <van-field
      v-model="fieldValue"
      is-link
      readonly
      label="教师"
      placeholder="请选择学院及教师"
      @click="show = true"
    />
    <van-popup v-model="show" round position="bottom">
      <van-cascader
        active-color="#588ded"
        v-model="cascaderValue"
        title="请选择学院及教师"
        :options="options"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
    <!-- 展示该老师下的课程 -->
    <!-- <van-cell
      v-for="(item, index) in courseInfo"
      :key="index"
      :title="item.name"
      value="未结束"
      size="large"
      :label="item.grade + '级 - ' + item.classInfo"
      icon="notes-o"
      @click="intoStuEval(item.name, item.grade, item.classInfo)"
    /> -->
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import { getAllTeachers } from "@/api/user/getTeachers";
import { getCourse2 } from "@/api/course/getCourse";
import { getRes } from "@/api/result/getRes";

export default {
  name: "",
  props: {},
  data() {
    return {
      // a是储存学院，教师姓名的数组
      arr: [],
      // 得到对应的课程
      courseInfo: [],
      // 所有学院下的教师信息
      teacher: [],
      show: false,
      fieldValue: "",
      cascaderValue: "",
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
      active: 0,
      questName: "",
      grades: ["2017", "2018", "2019", "2020"],
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  created() {
    this.questName = this.$route.params.questName;
    this.getAllTeachers1();
  },
  methods: {
    // 进入课程下一页
    async intoStuEval(course, grade, classInfo) {
      // 将学院名称，年级，教师姓名，问卷名称，课程名称，班级发给后端，后端返回所有已评结果
      let c = {
        academy: this.arr[0],
        grade,
        teacher: this.arr[1],
        questName: this.questName,
        course,
        classInfo,
      };
      let res = await getRes(c);
      let { jQuizRes } = res.data.pop();
      // 更新vuex中的问卷得分结果信息
      let a = {
        // 问卷名称
        questName: this.questName,
        // 课程名称
        course,
        // 选择题得分结果
        choiceRes: res.data,
        // 简答题结果
        jQuizRes,
      };
      console.log(a);
      this.$store.commit("setQuestRes", a);
      this.$router.push("/detailChart1");
    },
    // 得到所有学院下的教师信息
    async getAllTeachers1() {
      const res = await getAllTeachers();
      let a = res.data;
      // 将所有学院下的所有老师放入options中展示级联数据
      for (let i = 0; i < a.length; i++) {
        this.options.push({
          text: a[i]._id.academy,
          value: i,
          children: [],
        });
        let b = a[i].details;
        for (let j = 0; j < b.length; j++) {
          this.options[i].children.push({ text: b[j].name, value: j });
        }
      }
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
    async onFinish({ selectedOptions }) {
      this.show = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join("/");
      // b是储存学院，教师姓名的对象，准备发送给后端
      this.arr = this.fieldValue.split("/");
      // 确认为该教师评教？
      Dialog.confirm({
        title: "提示",
        message: "确认为---" + this.arr[0] + "/" + this.arr[1] + "---评教吗",
      }).then(async () => {
        // 将问卷名称，评教人工号，被评教人学院和姓名存入vuex
        let a = {
          questName: this.questName,
          academy: this.arr[0],
          teaName: this.arr[1],
          jobNum: this.$store.state.idInfo.jobNum,
        };
        this.$store.commit("setTeaQuest", a);
        this.$router.push("/teaEval");
      });
    },
  },
};
</script>
<style lang='less' scoped>
.van-nav-bar__left {
  p {
    color: #588ded;
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
.wap-nav-wrap {
  position: fixed;
  right: 0;
  width: 33px;
  height: 43px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  .van-icon {
    font-size: 24px;
  }
  &:before {
    content: "";
    width: 1px;
    height: 43px;
    background: ur1("./line.png") no-repeat;
    background-size: contain;
    position: absolute;
    left: 0;
    top: 0;
  }
}
.wap-nav-placeholder {
  width: 33px;
  flex-shrink: 0;
}
</style>