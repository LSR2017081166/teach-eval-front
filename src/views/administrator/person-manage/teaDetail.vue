<template>
  <div class="teaDtail">
    <!-- 标题栏 -->
    <van-nav-bar
      title="人员管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- 头像区域 -->
    <div class="portrait">
      <van-icon name="user-o" />
    </div>
    <!-- 教师信息表单 -->
    <van-form @submit="onSubmit">
      <div class="vanForm1">
        <van-field
          v-model="teaInfo.name"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="teaInfo.jobNum"
          name="工号"
          label="工号"
          placeholder="请输入工号"
          :rules="[{ required: true, message: '请填写工号' }]"
        />
        <van-field
          v-model="teaInfo.gender"
          name="性别"
          label="性别"
          placeholder="请输入性别"
          :rules="[{ required: true, message: '请填写性别' }]"
        />
        <van-field
          v-model="teaInfo.age"
          name="年龄"
          label="年龄"
          placeholder="请输入年龄"
          :rules="[{ required: true, message: '请填写年龄' }]"
        />
        <van-field
          v-model="teaInfo.title"
          name="职称"
          label="职称"
          placeholder="请输入职称"
          :rules="[{ required: true, message: '请填写职称' }]"
        />
        <van-field
          v-model="teaInfo.academy"
          name="学院"
          label="学院"
          placeholder="请输入学院"
          :rules="[{ required: true, message: '请填写学院' }]"
        />
        <van-field
          v-model="teaInfo.password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div>
      <div style="margin: 16px">
        <div class="button">
          <van-button plain type="info" @click="delTea1">删除</van-button>
          <van-button type="info" @click="modifyTea1">修改</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import { modifyTea } from "@/api/user/modify";
import { delTea } from "@/api/user/delUser";
import { Dialog } from "vant";
import { Toast } from "vant";

export default {
  name: "",
  props: {},
  data() {
    return {
      teaInfo: {},
      username: "",
      password: "",
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  created() {
    this.teaInfo = this.$route.params.teaInfo[0];
    console.log(this.teaInfo);
  },
  methods: {
    // 删除教师信息
    delTea1() {
      Dialog.confirm({
        title: "提示",
        message: "确认删除？",
      })
        .then(async () => {
          let res = await delTea(this.teaInfo);
          Toast.success("删除成功！");
        })
        .catch(() => {
          Toast.fail("删除失败！");
        });
    },
    // 修改教师信息后点击提交
    async modifyTea1() {
      Dialog.confirm({
        title: "提示",
        message: "确认修改？",
      })
        .then(async () => {
          let res = await modifyTea(this.teaInfo);
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
.teaDtail {
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