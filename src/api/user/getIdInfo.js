// 用户相关请求模块
import request from '@/utils/request'
// 登录
export const getIdInfo =data=>{
    return request({
        method:"POST",
        url:'user/getIdInfo',
        data
    })
}