<template>
  <div class="inputQuestInfo">
    <!-- 标题栏 -->
    <van-nav-bar
      title="创建问卷"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- 问卷信息填写 -->
    <div class="addQuestInfo">
      <!-- 请输入问卷名称 -->
      <van-field v-model="quest.name" label="问卷名称" />
      <!-- 选择问卷填写时间区间 -->
      <van-cell
        title="选择该问卷评教时间区间"
        :value="quest.section"
        @click="show = true"
      />
      <van-calendar
        v-model="show"
        type="range"
        @confirm="onConfirm"
        color="#588ded"
      />
    </div>
    <!-- 底部导航 -->
    <div class="otherInfo">
      <van-nav-bar>
        <template #right>
          <van-icon name="add-o" size="25" @click="intoAddIndex" />
        </template>
      </van-nav-bar>
    </div>
  </div>
</template>

<script>
import { createUnpub } from "@/api/quest";
import { Dialog } from "vant";
export default {
  name: "",
  props: {},
  data() {
    return {
      date: "",
      show: false,
      quest: {
        name: "",
        section: "",
      },
    };
  },
  components: { [Dialog.Component.name]: Dialog.Component },
  computed: {},
  methods: {
    // 选择时间区间
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.quest.section = `${this.formatDate(start)} - ${this.formatDate(
        end
      )}`;
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
    intoAddIndex() {
      Dialog.confirm({
        title: "提示",
        message: "确定创建该问卷吗?",
      })
        .then(async() => {
          const data=await createUnpub(this.quest)
          console.log(data);
          this.$router.push("/add-index");
        })
        .catch(() => {
          Toast.fail("创建问卷失败");
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
.otherInfo {
  .van-nav-bar {
    background-color: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;
    .van-icon {
      color: #588ded;
    }
  }
}
.addQuestInfo {
  margin-top: 10px;
  .van-cell__title {
    border-right: 1px solid #666;
  }
  .van-field {
    margin-bottom: 10px;
  }
}
</style>