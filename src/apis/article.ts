/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-25 14:09:34
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-25 18:27:32
 * @Description: 
 */
import { request } from "@/utils";

export const getChannelListAPI = ()=>{
    return request({
        url:'/channels',
        method:'GET',
    })
}

export const createArticleAPI = (data:any)=>{
    return request({
        url:'/mp/articles',
        method:'POST',
        data
    })
}

export const getArticles = (data:any)=>{
    return request({
        url:'/channels',
        method:'GET',
        data
    })
}