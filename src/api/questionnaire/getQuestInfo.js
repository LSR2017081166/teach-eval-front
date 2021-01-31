// 创建问卷信息请求模块
import request from '@/utils/request'
// 获取所有（暂存和已发布）问卷信息
export const getQuestInfo =()=>{
    return request({
        method:"GET",
        url:'quest/getQuestInfo'
    })
}
// 获取已发布问卷信息
export const getPubInfo =()=>{
    return request({
        method:"GET",
        url:'quest/getPubInfo'
    })
}