<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to='/administrator'>指标管理</van-tabbar-item>
      <van-tabbar-item icon="search" to='/check-eval'>查看评教</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to='/person-manage'>人员管理</van-tabbar-item>
    </van-tabbar>
    <!-- /底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: "AdministratorIndex",
  props: {},
  data() {
    return {
        active:0
    };
  },
  components: {},
  computed: {},
  methods: {},
};
</script>
<style lang='less' scoped>
</style>