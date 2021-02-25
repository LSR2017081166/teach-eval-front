<template>
  <div class="stuDtail">
    <!-- 标题栏 -->
    <van-nav-bar
      title="人员管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- 头像区域 -->
    <div class="portrait">
      <van-icon name="user-o" />
    </div>
    <!-- 学生信息表单 -->
    <van-form>
      <div class="vanForm1">
        <van-field
          v-model="stuInfo.name"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="stuInfo.sno"
          name="学号"
          label="学号"
          placeholder="请输入学号"
          :rules="[{ required: true, message: '请填写学号' }]"
        />
        <van-field
          v-model="stuInfo.gender"
          name="性别"
          label="性别"
          placeholder="请输入性别"
          :rules="[{ required: true, message: '请填写性别' }]"
        />
        <van-field
          v-model="stuInfo.age"
          name="年龄"
          label="年龄"
          placeholder="请输入年龄"
          :rules="[{ required: true, message: '请填写年龄' }]"
        />
        <van-field
          v-model="stuInfo.academy"
          name="学院"
          label="学院"
          placeholder="请输入学院"
          :rules="[{ required: true, message: '请填写学院' }]"
        />
        <van-field
          v-model="stuInfo.classInfo"
          name="班级"
          label="班级"
          placeholder="请输入班级"
          :rules="[{ required: true, message: '请填写班级' }]"
        />
        <van-field
          v-model="stuInfo.password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div>
      <div style="margin: 16px">
        <div class="button">
          <van-button plain type="info" @click="delStu1">删除</van-button>
          <van-button type="info" @click="modifyStu1">修改</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import { modifyStu } from "@/api/user/modify";
import { delStu } from "@/api/user/delUser";
import { Dialog } from "vant";
import { Toast } from "vant";

export default {
  name: "",
  props: {},
  data() {
    return {
      stuInfo: {},
      username: "",
      password: "",
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  created() {
    this.stuInfo = this.$route.params.stuInfo;
  },
  methods: {
    // 删除学生信息
    delStu1() {
      Dialog.confirm({
        title: "提示",
        message: "确认删除？",
      })
        .then(async () => {
          let res = await delStu(this.stuInfo);
          Toast.success("删除成功！");
        })
        .catch(() => {
          Toast.fail("删除失败！");
        });
    },
    // 修改学生信息后点击提交
    async modifyStu1() {
      Dialog.confirm({
        title: "提示",
        message: "确认修改？",
      })
        .then(async () => {
          let res = await modifyStu(this.stuInfo);
          Toast.success("修改成功！"); 
        })
        .catch(() => {
          Toast.fail("修改失败！");
        });
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>
<style lang='less' scoped>
.button {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  .van-button {
    width: 100px;
  }
}
.stuDtail {
  background-color: #fff;
}
.portrait {
  width: 100%;
  height: 150px;
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