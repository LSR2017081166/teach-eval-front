<template>
  <div class="inputQuestInfo">
    <!-- 标题栏 -->
    <van-nav-bar
      title="创建问卷"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="other-pay" size="23" />
      </template>
    </van-nav-bar>
    <!-- 问卷信息填写 -->
    <div class="addQuestInfo">
      <!-- 请输入问卷名称 -->
      <van-field v-model="value" label="问卷名称" />
      <!-- 请输入问卷开始时间 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="问卷开始时间"
        placeholder="点击选择开始时间"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <!-- 请输入填写问卷期限 -->
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="value"
        label="问卷期限"
        placeholder="点击选择问卷期限"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="time"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
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
export default {
  name: "",
  props: {},
  data() {
    return {
      value: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false,
    };
  },
  components: {},
  computed: {},
  methods: {
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
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    intoAddIndex() {
      this.$router.push("/add-index");
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