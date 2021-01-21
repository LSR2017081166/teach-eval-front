// 创建问卷请求模块
import request from '@/utils/request'
// 暂存"未发布问卷"
export const createQuest =data=>{
    return request({
        method:"POST",
        url:'quest/createQuest',
        data
    })
}