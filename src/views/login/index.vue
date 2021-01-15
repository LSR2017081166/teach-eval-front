<template>
  <div class="login-container">
    <img src="@/assets/校徽.jpg" alt="" />
    <h1>评教系统</h1>
    <div class="formArea">
      <van-form @submit="onLogin">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
// import {login} from '@/api/user'
export default {
  name: "LoginIndex",
  props: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {},
  computed: {},
  methods: {
    async login1(){
      const {data}=await login()
      console.log(data);
    },
    onLogin() {
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      if (this.username.length === 10 && this.password === "123") {
        this.$router.push("/student");
        Toast.success("登录成功！");
      } else if (this.username.length === 8 && this.password === "123") {
        this.$router.push("/teacher");
        Toast.success("登录成功！");
      } else if (this.username.length === 6 && this.password === "123") {
        this.$router.push("/administrator");
        Toast.success("登录成功！");
      } else {
        Toast.success("登录失败，账号或密码错误！");
      }
    },
  },
};
</script>
<style lang='less' scoped>
.login-container {
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #588ded;
  display: flex;
  align-items: center;
  img {
    width: 180px;
    height: 180px;
    margin-top: 20px;
  }
  h1 {
    color: white;
    font-size: 40px;
    margin: 10px;
  }
}
.formArea {
  background: #fff;
  margin-top: 10px;
  border-radius: 10px;
}
.van-form {
  margin-top: 10px;
  .van-cell {
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .van-button {
    background-color: #fff;
    color: #588ded;
  }
}
</style>