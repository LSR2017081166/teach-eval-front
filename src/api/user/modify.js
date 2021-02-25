// 修改用户信息请求模块
import request from '@/utils/request'
// 修改教师信息
export const modifyTea =data=>{
    return request({
        method:"POST",
        url:'user/modifyTea',
        data
    })
}
// 修改学生信息
export const modifyStu =data=>{
    return request({
        method:"POST",
        url:'user/modifyStu',
        data
    })
}