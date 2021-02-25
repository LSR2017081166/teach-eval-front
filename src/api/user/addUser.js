// 添加用户请求模块
import request from '@/utils/request'
// 添加教师信息
export const addTea =data=>{
    return request({
        method:"POST",
        url:'user/addTea',
        data
    })
}
// 添加学生信息
export const addStu =data=>{
    return request({
        method:"POST",
        url:'user/addStu',
        data
    })
}