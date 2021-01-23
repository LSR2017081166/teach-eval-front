// 创建问卷信息请求模块
import request from '@/utils/request'
// 获取所有指定名称问卷的题目信息
export const getQuestions =data=>{
    return request({
        method:"POST",
        url:'quest/getQuestions',
        data
    })
}