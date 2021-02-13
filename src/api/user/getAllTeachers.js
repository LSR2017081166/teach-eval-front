// 得到所有学院下的教师信息模块
import request from '@/utils/request'
// 得到所有学院下的教师信息
export const getAllTeachers =data=>{
    return request({
        method:"POST",
        url:'user/getAllTeachers',
        data
    })
}