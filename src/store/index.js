import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 问卷
    questionnaire:JSON.parse(window.localStorage.getItem('questionnaire'))
  },
  mutations: {
    // 问卷
      // 设置问卷名称和期限
    setQuest(state,data){
      state.questionnaire=data
      // 为了防止页面刷新数据丢失，还需要把数据放到本地存储中，这里仅仅是为了持久化数据
      window.localStorage.setItem('questionnaire',JSON.stringify(state.questionnaire))
    }
  },
  actions: {
  },
  modules: {
  }
})
