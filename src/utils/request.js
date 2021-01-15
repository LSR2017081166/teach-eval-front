// 请求模块
import axios from 'axios'

const request =axios.create({
    baseURL:"http://localhost:3000/"
})

// 请求拦截器

// 响应拦截器

// 导出
export default request