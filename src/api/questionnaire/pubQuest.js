// 创建问卷请求模块
import request from '@/utils/request'
// 暂存"未发布问卷"
export const pubQuest =data=>{
    return request({
        method:"POST",
        url:'quest/pubQuest',
        data
    })
}