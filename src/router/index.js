import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/administrator',
    component: () => import('@/views/administrator/'),
    children: [
      {
        path: '',//默认子路由
        name: 'index-manage',
        component: () => import('@/views/administrator/index-manage/')
      },
      {
        path: '/check-eval',
        name: 'check-eval',
        component: () => import('@/views/administrator/check-eval/')
      }, {
        path: '/person-manage',
        name: 'person-manage',
        component: () => import('@/views/administrator/person-manage/')
      }
    ]
  },
  {
    path: '/student',
    component: () => import('@/views/student/'),
    children: [
      {
        path: '',//默认子路由
        name: 's-teach-eval',
        component: () => import('@/views/student/s-teach-eval/')
      },
      {
        path: '/s-person-info',
        name: 's-person-info',
        component: () => import('@/views/student/s-person-info/')
      }
    ]
  },
  {
    path: '/teacher',
    component: () => import('@/views/teacher/'),
    children: [
      {
        path: '',//默认子路由
        name: 't-teach-eval',
        component: () => import('@/views/teacher/t-teach-eval/')
      },
      {
        path: '/t-check-eval',
        name: 't-check-eval',
        component: () => import('@/views/teacher/t-check-eval/')
      }, {
        path: '/t-person-info',
        name: 't-person-info',
        component: () => import('@/views/teacher/t-person-info/')
      }
    ]
  },
  // 创建问卷---输入问卷信息
  {
    path: '/input-quest-info',
    name: 'input-quest-info',
    component: () => import('@/views/administrator/index-manage/input-quest-info.vue')
  },
  // 开关评教
  {
    path: '/switch',
    name: 'switch',
    component: () => import('@/views/administrator/index-manage/switch.vue')
  },
  // 发布评教结果
  {
    path: '/pub-res',
    name: 'pub-res',
    component: () => import('@/views/administrator/index-manage/pub-res.vue')
  },
  // 选择问卷页面
  {
    path: '/choose-quest',
    name: 'choose-quest',
    component: () => import('@/views/administrator/index-manage/choose-quest.vue')
  },
  // 添加指标页面
  {
    path: '/addition',
    name: 'addition',
    component: () => import('@/views/administrator/index-manage/addition.vue')
  },
  // 展示简答题页面
  {
    path: '/jQuiz',
    name: 'jQuiz',
    component: () => import('@/views/administrator/index-manage/jQuiz.vue')
  },
  // 创建问卷页面
  {
    path: '/createQuest',
    name: 'createQuest',
    component: () => import('@/views/administrator/index-manage/createQuest.vue')
  },
  // 创建问卷页面
  {
    path: '/stuEval',
    name: 'stuEval',
    component: () => import('@/views/student/s-teach-eval/stuEval.vue')
  },
  // 创建问卷页面
  {
    path: '/teaCourse',
    name: 'teaCourse',
    component: () => import('@/views/student/s-teach-eval/teaCourse.vue')
  },
  // 进入选择不同老师和课程的问卷结果页
  {
    path: '/questRes',
    name: 'questRes',
    component: () => import('@/views/administrator/check-eval/questRes.vue')
  },
  // 显示每题得分情况的柱形图页
  {
    path: '/detailChart1',
    name: 'detailChart1',
    component: () => import('@/views/administrator/check-eval/detailChart1.vue'),
  },
  // 显示每题得分情况的扇形图页
  {
    path: '/detailChart2',
    name: 'detailChart2',
    component: () => import('@/views/administrator/check-eval/detailChart2.vue')
  },
  // 显示每道简答题的结果
  {
    path: '/jQuizRes',
    name: 'jQuizRes',
    component: () => import('@/views/administrator/check-eval/jQuizRes.vue')
  },
  // 点击特定老师信息条后进入详情修改页
  {
    path: '/teaDetail',
    name: 'teaDetail',
    component: () => import('@/views/administrator/person-manage/teaDetail.vue')
  },
  // 点击特定学生信息条后进入详情修改页
  {
    path: '/stuDetail',
    name: 'stuDetail',
    component: () => import('@/views/administrator/person-manage/stuDetail.vue')
  },
  // 添加用户页面
  {
    path: '/addUser',
    name: 'addUser',
    component: () => import('@/views/administrator/person-manage/addUser.vue')
  },
  // 教师进入选择被评教师界面
  {
    path: '/selectTea',
    name: 'selectTea',
    component: () => import('@/views/teacher/t-teach-eval/selectTea.vue')
  },
  // 教师开始为指定教师评教
  {
    path: '/teaEval',
    name: 'teaEval',
    component: () => import('@/views/teacher/t-teach-eval/teaEval.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
