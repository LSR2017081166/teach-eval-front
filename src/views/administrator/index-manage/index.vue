<template>
  <div class="">
    <!-- 标题栏 -->
    <van-nav-bar title="评教系统"> </van-nav-bar>
    <!-- 菜单选项 -->
    <div class="container">
      <van-grid :column-num="3" :gutter="10">
        <van-grid-item @click="intoQuestInfo"
          ><van-icon name="orders-o" color="#d4237a" />
          <p>创建问卷</p></van-grid-item
        >
        <van-grid-item
          ><van-icon name="add-o" color="#23d763" />
          <p>添加指标</p></van-grid-item
        >
        <van-grid-item
          ><van-icon name="edit" color="#ef7f3c" />
          <p>修改指标</p></van-grid-item
        >
        <van-grid-item
          ><van-icon name="close" color="#428ee4" />
          <p>删除指标</p></van-grid-item
        >
        <van-grid-item @click="intoSwitch"
          ><van-icon name="bulb-o" color="#f1665c" />
          <p>开关评教</p></van-grid-item
        >
        <van-grid-item @click="intoResults"
          ><van-icon name="certificate" color="#38c9e5" />
          <p>发布结果</p></van-grid-item
        >
      </van-grid>
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
      // 是否有问卷生成（用于判断是否生成提示框）
      show: false,
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  methods: {
    // 发布评教结果
    intoResults(){
      this.showDialog()
      this.$router.push('/pub-res')
    },
    showDialog() {
      // 这里判断是否有问卷生成？？？？？？
      if (this.show === false)
        Dialog.confirm({
          title: "提示",
          message: "暂无问卷生成",
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
    },
    // 进入创建问卷
    intoQuestInfo() {
      this.$router.push('/input-quest-info')
    },
    // 进入"开关评教"
    intoSwitch(){
      this.showDialog()
      this.$router.push('/switch')
    }
  },
};
</script>
<style lang='less' scoped>
.van-grid-item {
  border-radius: 5px;
}
.van-grid {
  margin-top: 20px;
}
.van-grid-item__content {
  p {
    margin-top: 5px;
    font-size: 15px;
    color: #666666;
  }
}
</style>