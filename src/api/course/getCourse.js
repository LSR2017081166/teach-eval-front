// 课程相关请求模块
import request from '@/utils/request'
// 获取被评课程（学生点击问卷后出现的页面显示的课程）
export const getCourse =data=>{
    return request({
        method:"POST",
        url:'course/getCourse',
        data
    })
}