<!-- ‘添加指标’页面-->
<template>
  <div class="personManage">
    <van-sticky>
      <!-- 标题栏 -->
      <van-nav-bar title="人员管理">
        <template #right>
          <van-icon
            name="add-o"
            size="18"
            @click="addUser"
          /> </template></van-nav-bar
    ></van-sticky>

    <!-- “教师/学生”的tab标签 -->
    <van-tabs v-model="active" color="#588ded">
      <van-tab v-for="(item, index) in arr1" :key="index" :title="item">
        <!-- 老师的级联选择 -->
        <div class="teaSection" v-if="item === '教师'">
          <van-field
            v-model="fieldValue1"
            is-link
            readonly
            label="教师"
            placeholder="请选择学院及教师"
            @click="show1 = true"
          />
          <van-popup v-model="show1" round position="bottom">
            <van-cascader
              active-color="#588ded"
              title="请选择学院及教师"
              :options="options1"
              @close="show1 = false"
              @finish="onFinish1"
            />
          </van-popup>
          <!-- 展示搜索老师后的结果 -->
          <van-cell
            v-for="(item, index) in teaInfo"
            :key="index"
            :title="item.name"
            :value="'工号-' + item.jobNum"
            size="large"
            :label="'职称:' + item.title"
            icon="user-o"
            @click="intoTeaDetail"
          />
        </div>
        <!-- 学生的级联选择 -->
        <div class="stuSection" v-if="item === '学生'">
          <van-field
            v-model="fieldValue2"
            is-link
            readonly
            label="学生"
            placeholder="请选择学院及班级"
            @click="show2 = true"
          />
          <van-popup v-model="show2" round position="bottom">
            <van-cascader
              active-color="#588ded"
              title="请选择学院及班级"
              :options="options2"
              @close="show2 = false"
              @finish="onFinish2"
            />
          </van-popup>
          <!-- 展示搜索学生后的结果 -->
          <van-cell
            v-for="(item, index) in stuInfo"
            :key="index"
            :title="item.name"
            :value="'学号-' + item.sno"
            size="large"
            :label="'性别:' + item.gender"
            icon="user-o"
            @click="intoStuDetail(item)"
          />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import { getAllTeachers, getTeacher } from "@/api/user/getTeachers";
import { getAllStudents, getStudents } from "@/api/user/getStudents";
import { getCourse2 } from "@/api/course/getCourse";
import { getRes } from "@/api/result/getRes";

export default {
  name: "",
  props: {},
  data() {
    return {
      // 所有老师,以工号排序
      allTeachers: [],
      active: 0,
      arr1: ["教师", "学生"],
      // a是储存学院，教师姓名的数组
      arr: [],
      // 得到对应的教师
      teaInfo: [],
      // 得到指定班级的学生
      stuInfo: [],
      // 所有学院下的教师信息
      teacher: [],
      show1: false,
      show2: false,
      fieldValue1: "",
      fieldValue2: "",
      // 选项列表，children 代表子选项，支持多级嵌套
      // 教师选项
      options1: [],
      // 学生选项
      options2: [],
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
    this.getAllStudents1();
  },
  methods: {
    addUser() {
      this.$router.push({
        path: "/addUser",
        name: "addUser",
        params: {
          active: this.active
        },
      });
    },
    // 点击指定班级的结果条，进入该学生的信息修改界面
    intoStuDetail(item) {
      this.$router.push({
        path: "/stuDetail",
        name: "stuDetail",
        params: {
          stuInfo: item,
        },
      });
    },
    // 点击指定老师的结果条，进入该老师的信息修改界面
    intoTeaDetail() {
      this.$router.push({
        path: "/teaDetail",
        name: "teaDetail",
        params: {
          teaInfo: this.teaInfo,
        },
      });
    },
    // 得到所有学院下的教师信息
    async getAllTeachers1() {
      const res = await getAllTeachers();
      let a = res.data;
      // 将所有学院下的所有老师放入options1中展示级联数据
      for (let i = 0; i < a.length; i++) {
        this.options1.push({
          text: a[i]._id.academy,
          value: i,
          children: [],
        });
        let b = a[i].details;
        for (let j = 0; j < b.length; j++) {
          this.options1[i].children.push({ text: b[j].name, value: j });
        }
      }
    },
    // 得到所有学院，所有年级，班级下的所有学生
    async getAllStudents1() {
      const res = await getAllStudents();
      let data = res.data;
      console.log(data);
      // 一级嵌套：学院
      for (let i = 0; i < data[0].length; i++) {
        this.options2.push({
          text: data[0][i]._id.academy,
          value: i,
          children: [],
        });
        // 二级嵌套：年级
        for (let j = 0; j < data[1].length; j++) {
          this.options2[i].children.push({
            text: data[1][j]._id.grade,
            value: j,
            children: [],
          });
          // 三级嵌套：班级
          for (let k = 0; k < data[2].length; k++) {
            if (
              data[0][i]._id.academy === data[2][k]._id.academy &&
              data[1][j]._id.grade === data[2][k]._id.grade
            ) {
              this.options2[i].children[j].children.push({
                text: data[2][k]._id.classInfo,
                value: k,
              });
            }
          }
        }
      }
    },
    // 返回教师信息
    async onFinish1({ selectedOptions }) {
      this.show1 = false;
      this.fieldValue1 = selectedOptions.map((option) => option.text).join("/");
      // b是储存学院，教师姓名的对象，准备发送给后端
      this.arr = this.fieldValue1.split("/");
      let b = {
        academy: this.arr[0],
        teaName: this.arr[1],
      };
      let res = await getTeacher(b);
      this.teaInfo = res.data;
    },
    // 返回学生信息
    async onFinish2({ selectedOptions }) {
      this.show2 = false;
      this.fieldValue2 = selectedOptions.map((option) => option.text).join("/");
      // // b是储存学院，班级的对象，准备发送给后端
      this.arr = this.fieldValue2.split("/");
      let b = {
        academy: this.arr[0],
        grade: this.arr[1],
        classInfo: this.arr[2],
      };
      let res = await getStudents(b);
      this.stuInfo = res.data;
      console.log(this.stuInfo);
    },
  },
};
</script>
<style lang='less' scoped>
.personManage {
  margin-bottom: 60px;
}
.van-cell {
  margin-top: 10px;
}
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