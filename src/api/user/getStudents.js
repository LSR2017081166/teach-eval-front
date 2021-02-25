// 得到所有学院下的教师信息模块
import request from '@/utils/request'
// 得到所有学院下的教师信息
export const getAllStudents =data=>{
    return request({
        method:"POST",
        url:'user/getAllStudents',
        data
    })
}
// 得到指定班级学生信息
export const getStudents =data=>{
    return request({
        method:"POST",
        url:'user/getStudents',
        data
    })
}

