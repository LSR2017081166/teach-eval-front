// 用户相关请求模块
import request from '@/utils/request'
// 登录
export const login =()=>{
    return request({
        method:"GET",
        url:'/login'
    })
}