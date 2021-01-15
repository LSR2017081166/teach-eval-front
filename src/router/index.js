import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:()=> import('@/views/login/')
  },
  {
    path:'/administrator',
    component:()=> import('@/views/administrator/'),
    children:[
      {
        path:'',//默认子路由
        name:'index-manage',
        component:()=>import('@/views/administrator/index-manage/')
      },
      {
        path:'/check-eval',
        name:'check-eval',
        component:()=>import('@/views/administrator/check-eval/')
      },      {
        path:'/person-manage',
        name:'person-manage',
        component:()=>import('@/views/administrator/person-manage/')
      }
    ]
  },
  {
    path:'/student',
    component:()=> import('@/views/student/'),
    children:[
      {
        path:'',//默认子路由
        name:'s-teach-eval',
        component:()=>import('@/views/student/s-teach-eval/')
      },
      {
        path:'/s-person-info',
        name:'s-person-info',
        component:()=>import('@/views/student/s-person-info/')
      }
    ]
  },
  {
    path:'/teacher',
    component:()=> import('@/views/teacher/'),
    children:[
      {
        path:'',//默认子路由
        name:'t-teach-eval',
        component:()=>import('@/views/teacher/t-teach-eval/')
      },
      {
        path:'/t-check-eval',
        name:'t-check-eval',
        component:()=>import('@/views/teacher/t-check-eval/')
      },      {
        path:'/t-person-info',
        name:'t-person-info',
        component:()=>import('@/views/teacher/t-person-info/')
      }
    ]
  },
  // 创建问卷---输入问卷信息
  {
    path:'/input-quest-info',
    name:'input-quest-info',
    component:()=>import('@/views/administrator/index-manage/input-quest-info.vue')
  },
  // 创建问卷---增加选择题
  {
    path:'/add-index',
    name:'add-index',
    component:()=>import('@/views/administrator/index-manage/add-index.vue')
  },
  // 创建问卷---增加简答题
  {
    path:'/add-index2',
    name:'add-index2',
    component:()=>import('@/views/administrator/index-manage/add-index2.vue')
  },
  // 开关评教
  {
    path:'/switch',
    name:'switch',
    component:()=>import('@/views/administrator/index-manage/switch.vue')
  },
  // 发布评教结果
  {
    path:'/pub-res',
    name:'pub-res',
    component:()=>import('@/views/administrator/index-manage/pub-res.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
