<template>
  <div class="addUser">
    <!-- 标题栏 -->
    <van-nav-bar
      title="添加用户"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- 头像区域 -->
    <div class="portrait">
      <van-icon name="user-o" />
    </div>
    <!-- 教师信息表单 -->
    <van-form v-if="active === 0">
      <div class="vanForm1">
        <van-field
          v-model="userInfo.name"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="userInfo.jobNum"
          name="工号"
          label="工号"
          placeholder="请输入工号"
          :rules="[{ required: true, message: '请填写工号' }]"
        />
        <van-field
          v-model="userInfo.gender"
          name="性别"
          label="性别"
          placeholder="请输入性别"
          :rules="[{ required: true, message: '请填写性别' }]"
        />
        <van-field
          v-model="userInfo.age"
          name="年龄"
          label="年龄"
          placeholder="请输入年龄"
          :rules="[{ required: true, message: '请填写年龄' }]"
        />
        <van-field
          v-model="userInfo.title"
          name="职称"
          label="职称"
          placeholder="请输入职称"
          :rules="[{ required: true, message: '请填写职称' }]"
        />
        <van-field
          v-model="userInfo.academy"
          name="学院"
          label="学院"
          placeholder="请输入学院"
          :rules="[{ required: true, message: '请填写学院' }]"
        />
        <van-field
          v-model="userInfo.password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div>
      <div style="margin: 16px">
        <div class="button">
          <van-button plain type="info" @click="submit1">提交</van-button>
        </div>
      </div>
    </van-form>
    <!-- 学生信息表单 -->
    <van-form v-if="active === 1">
      <div class="vanForm1">
        <van-field
          v-model="userInfo.name"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="userInfo.sno"
          name="学号"
          label="学号"
          placeholder="请输入学号"
          :rules="[{ required: true, message: '请填写学号' }]"
        />
        <van-field
          v-model="userInfo.gender"
          name="性别"
          label="性别"
          placeholder="请输入性别"
          :rules="[{ required: true, message: '请填写性别' }]"
        />
        <van-field
          v-model="userInfo.age"
          name="年龄"
          label="年龄"
          placeholder="请输入年龄"
          :rules="[{ required: true, message: '请填写年龄' }]"
        />
        <van-field
          v-model="userInfo.academy"
          name="学院"
          label="学院"
          placeholder="请输入学院"
          :rules="[{ required: true, message: '请填写学院' }]"
        />
        <van-field
          v-model="userInfo.grade"
          name="年级"
          label="年级"
          placeholder="请输入年级"
          :rules="[{ required: true, message: '请填写年级' }]"
        />
        <van-field
          v-model="userInfo.classInfo"
          name="班级"
          label="班级"
          placeholder="请输入班级"
          :rules="[{ required: true, message: '请填写班级' }]"
        />
        <van-field
          v-model="userInfo.password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div>
      <div style="margin: 13px">
        <div class="button">
          <van-button plain type="info" @click="submit1">提交</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import { addTea, addStu } from "@/api/user/addUser";

export default {
  name: "",
  props: {},
  data() {
    return {
      userInfo: {},
      active: 0,
      grade: "",
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  created() {
    this.active = this.$route.params.active;
    this.grade = this.$route.params.grade;
  },
  methods: {
    // 添加教师信息
    submit1() {
      Dialog.confirm({
        title: "提示",
        message: "确认添加？",
      })
        .then(async () => {
          if (this.active === 0) {
            let res = await addTea(this.userInfo);
          } else {
            console.log(this.grade);
            // this.userInfo.grade=this.grade
            let res = await addStu(this.userInfo);
          }
          Toast.success("添加成功！");
        })
        .catch(() => {
          Toast.fail("添加失败！");
        });
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='less' scoped>
.button {
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  .van-button {
    width: 100px;
  }
}
.addUser {
  height: 100%;
  background-color: #fff;
}
.portrait {
  width: 100%;
  height: 130px;
  background-color: #588ded;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-icon {
    color: #fff;
    font-size: 120px;
  }
}
.vanForm1 {
  border: 2px solid #588ded;
  border-radius: 10px;
  padding: 10px;
}
.van-form {
  padding: 10px;
  .van-cell {
    border-bottom: 1px solid rgb(187, 181, 181);
  }
}
</style>