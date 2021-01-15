<template>
  <div class="addIndex">
    <!-- 标题栏 -->
    <van-nav-bar
      title="创建问卷"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="other-pay" size="23" @click="showPopup1" />
      </template>
    </van-nav-bar>
    <!-- 问卷名称单元格 -->
    <van-cell title="2020-2021学年第1学期评教问卷" value="10/10" />
    <!-- 题目表单 -->
    <div class="formArea">
      <!-- 题目 -->
      <van-field v-model="value" placeholder="请输入题目" />
      <!-- 请输入文本 -->
      <van-field v-model="value" placeholder="请输入文本" class="textArea" />
    </div>
    <!-- 其他信息部分 -->
    <div class="otherInfo">
      <!-- 分割线 -->
      <div class="divider"></div>
      <!-- 可编辑分数 -->
      <van-tag color="#588ded">可编辑分数: 90 / 100</van-tag>
      <!-- 清空按钮 -->
      <van-button plain color="#588ded">清空</van-button>
      <!-- 底部导航 -->
      <van-nav-bar left-text="上一题">
        <template #right>
          <van-icon name="add-o" size="25" />
        </template>
      </van-nav-bar>
    </div>
        <!-- 菜单弹出层 -->
    <van-popup v-model="show1" position="bottom" :style="{ height: '30%' }">
      <div class="menuItem">
        <van-grid direction="horizontal" :column-num="1">
          <van-grid-item icon="coupon" text="题目概览" @click="showPopup2"/>
          <van-grid-item icon="add" text="加入简答"  to='/add-index2'/>
          <van-grid-item icon="notes-o" text="暂存问卷" />
        </van-grid>
      </div>
    </van-popup>
    <!-- 题目概览弹出层 -->
    <van-popup v-model="show2" position="bottom" :style="{ height: '30%' }">
      <div class="menuItem">
        <van-grid :border="false" :column-num="5">
          <van-grid-item v-for="value in 10" :key="value">
            <p class="num"><span>{{value}}</span></p><p>10</p>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      // 菜单弹出层
      show1: false,
      // 题目概览弹出层
      show2: false,
    };
  },
  components: {},
  computed: {},
  methods: {
    // 点击返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 菜单弹出层
    showPopup1() {
      this.show1 = true;
    },
    // 题目概览弹出层
    showPopup2() {
      this.show2 = true;
    },
  },
};
</script>
<style lang='less' scoped>
.menuItem{
  font-size: 20px;
  padding-top: 10px;
}
.num{
  width: 30px;
  height: 30px;
  background-color: #588ded;
  border-radius: 50%;
  text-align:center;
  margin-bottom: 6px;
  span{
    line-height: 30px;
  }
}
.textArea {
  margin-top: 10px;
  height: 200px;
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
</style>