<template>
  <div class="switch">
    <!-- 标题栏 -->
    <van-nav-bar
      title="开关评教"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- 问卷 -->
    <van-button plain type="info" size="large"
      >2020-2021学年第1学期调查问卷</van-button
    >
    <div class="buttonArea">
      <van-button plain type="info" @click="deleteButton">删除</van-button>
      <van-button type="info" @click="releaseButton">发布</van-button>
    </div>
  </div>
</template>

<script>
import { createApp } from "vue";
import { Dialog } from "vant";
export default {
  name: "",
  props: {},
  data() {
    return {
      show1: false,
      show2: false,
      message:""
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  methods: {
    // 点击删除
    deleteButton() {
      this.message="删除后不可找回，确认删除？"
      this.showDialog()
    },
    // 点击发布
    releaseButton() {
      this.message="发布后不可更改，确认发布？"
      this.showDialog()
    },
    // 点击‘+’，用户编写题目不规范
    showDialog() {
      // 这里判断用户编写题目是否规范
      if (this.show2 === false)
        Dialog.confirm({
          title: "提示",
          message: this.message,
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 是否显示遮罩层
    showPopup() {
      this.show1 = true;
    },
  },
};
</script>
<style lang='less' scoped>
.switch {
  .van-button {
    margin-top: 150px;
    border-radius: 10px;
  }
  .buttonArea {
    display: flex;
    justify-content: center;
    .van-button {
      margin: 40px;
      width: 80px;
    }
  }
}
</style>