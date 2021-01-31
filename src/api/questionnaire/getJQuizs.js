// 创建问卷信息请求模块
import request from '@/utils/request'
// 获取指定名称问卷的所有简答题
export const getJQuizs =data=>{
    return request({
        method:"POST",
        url:'quest/getJQuizs',
        data
    })
}