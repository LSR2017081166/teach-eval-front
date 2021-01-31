// 创建问卷信息请求模块
import request from '@/utils/request'
// 获取指定名称问卷的所有选择题
export const getQuestions =data=>{
    return request({
        method:"POST",
        url:'quest/getQuestions',
        data
    })
}