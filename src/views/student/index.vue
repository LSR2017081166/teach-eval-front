<template>
  <div class="student-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to='/student'>评教</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to='/s-person-info'>个人信息</van-tabbar-item>
    </van-tabbar>
    <!-- /底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: "StudentIndex",
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