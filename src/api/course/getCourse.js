// 课程相关请求模块
import request from '@/utils/request'
// 通过班级获取被评课程（学生点击问卷后出现的页面显示的课程）
export const getCourse1 =data=>{
    return request({
        method:"POST",
        url:'course/getCourse1',
        data
    })
}
// 通过教师名获取被评课程（学生点击问卷后出现的页面显示的课程）
export const getCourse2 =data=>{
    return request({
        method:"POST",
        url:'course/getCourse2',
        data
    })
}
// 通过一系列信息查询课程下的所有学生评教结果
export const getRes =data=>{
    return request({
        method:"POST",
        url:'course/getRes',
        data
    })
}