// 问卷相关请求模块
import request from '@/utils/request'
// 创建"未发布问卷"
export const createUnpub =data=>{
    return request({
        method:"POST",
        url:'quest/createUnpub',
        data
    })
}