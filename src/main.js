import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Divider } from 'vant';

// 加载重置样式
import './styles/reset.less'

// 加载Vant组件库
import Vant from 'vant'

// 加载Vant组件库样式
import 'vant/lib/index.css'

// 自动设置REM基准值(html标签字体大小)
import 'amfe-flexible'
// 加载全局样式
import './styles/index.less'
// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 全局注册Vant中的组件
Vue.use(Vant)
Vue.use(Divider);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
