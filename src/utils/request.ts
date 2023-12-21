/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-21 13:35:04
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-21 13:40:45
 * @Description: axios封装
 */
// axios封装
import axios from 'axios'

const request = axios.create({
    baseURL: 'localhost',
    timeout: 1000 * 5
})
// 请求拦截器
request.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(response=>{
    return response.data
},(error)=>{
    return Promise.reject(error)
})

export {request}