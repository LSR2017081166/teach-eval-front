import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 未发布的问卷
    unPub:JSON.parse(window.localStorage.getItem('unPub'))
  },
  mutations: {
    // 未发布的问卷
      // 设置还未发布问卷名称和期限
    setUnPub(state,data){
      state.unPub.name=data.name
      state.unPub.section=data.section
      // 为了防止页面刷新数据丢失，还需要把数据放到本地存储中，这里仅仅是为了持久化数据
      window.localStorage.setItem('unPub',JSON.stringify(state.unPub))
    }
  },
  actions: {
  },
  modules: {
  }
})
