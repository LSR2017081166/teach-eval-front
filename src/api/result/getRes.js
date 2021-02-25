// 创建问卷请求模块
import request from '@/utils/request'

// 查询所有学生选择题和简答题评教结果
export const getRes =data=>{
    return request({
        method:"POST",
        url:'result/getRes',
        data
    })
}
