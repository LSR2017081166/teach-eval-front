import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 问卷
    questionnaire: JSON.parse(window.localStorage.getItem('questionnaire')),
    // 用户身份信息
    idInfo: JSON.parse(window.localStorage.getItem('idInfo')),
    // 登录用户作为这个班的学生，获取这个班下所有待评课程
    courses: JSON.parse(window.localStorage.getItem('courses')),
    // 问卷得分结果
    questRes: JSON.parse(window.localStorage.getItem('questRes')),
    // 问卷选项
    questions: JSON.parse(window.localStorage.getItem('questions')),
    // 教师互评问卷结果
    teaQuest: JSON.parse(window.localStorage.getItem('teaQuest'))
  },
  mutations: {
    // 存入问卷名称，评教人工号，被评教人学院和姓名,以及问卷结果
    setTeaQuest(state, data) {
      state.teaQuest = data
      // 为了防止页面刷新数据丢失，还需要把数据放到本地存储中，这里仅仅是为了持久化数据
      window.localStorage.setItem('teaQuest', JSON.stringify(state.teaQuest))
    },
    // 设置问卷名称和期限
    setQuest(state, data) {
      state.questionnaire = data
      // 为了防止页面刷新数据丢失，还需要把数据放到本地存储中，这里仅仅是为了持久化数据
      window.localStorage.setItem('questionnaire', JSON.stringify(state.questionnaire))
    },
    // 设置登录用户的账号和密码
    setIdInfo(state, data) {
      state.idInfo = data
      window.localStorage.setItem('idInfo', JSON.stringify(state.idInfo))
    },
    // 登录用户作为这个班的学生，获取这个班下所有待评课程
    setCourses(state, data) {
      state.courses = data
      window.localStorage.setItem('courses', JSON.stringify(state.courses))
    },
    // 展示图表信息时，将问卷结果存入vuex
    setQuestRes(state, data) {
      state.questRes = data
      window.localStorage.setItem('questRes', JSON.stringify(state.questRes))
    },
    // 展示图表信息时，将问卷每道题的选项存入vuex
    setQuestions(state, data) {
      state.questions = data
      window.localStorage.setItem('questions', JSON.stringify(state.questions))
    }
  },
  actions: {
  },
  modules: {
  }
})
