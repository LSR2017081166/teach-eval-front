import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 问卷
    questionnaire:JSON.parse(window.localStorage.getItem('questionnaire')),
    // 用户身份信息
    idInfo:JSON.parse(window.localStorage.getItem('idInfo')),
    // 登录用户作为这个班的学生，获取这个班下所有待评课程
    courses:JSON.parse(window.localStorage.getItem('courses'))
  },
  mutations: {
      // 设置问卷名称和期限
    setQuest(state,data){
      state.questionnaire=data
      // 为了防止页面刷新数据丢失，还需要把数据放到本地存储中，这里仅仅是为了持久化数据
      window.localStorage.setItem('questionnaire',JSON.stringify(state.questionnaire))
    },
    // 设置登录用户的账号和密码
    setIdInfo(state,data){
      state.idInfo=data
      window.localStorage.setItem('idInfo',JSON.stringify(state.idInfo))
    },
    // 登录用户作为这个班的学生，获取这个班下所有待评课程
    setCourses(state,data){
      state.courses=data
      window.localStorage.setItem('courses',JSON.stringify(state.courses))
    }
  },
  actions: {
  },
  modules: {
  }
})
