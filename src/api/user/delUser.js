// 删除教师请求模块
import request from '@/utils/request'
// 删除教师信息
export const delTea =data=>{
    return request({
        method:"POST",
        url:'user/delTea',
        data
    })
}
// 删除学生信息
export const delStu =data=>{
    return request({
        method:"POST",
        url:'user/delStu',
        data
    })
}