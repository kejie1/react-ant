/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-25 14:09:34
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-26 14:11:22
 * @Description: 
 */
import { request } from "@/utils";
import {PublishFieldType} from '@/types/article'

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
export const getArticlesAPI = (params:any)=>{
    return request({
        url:'/mp/articles',
        method:'GET',
        params
    })
}
export const deleteArticleAPI = (id:string)=>{
    return request({
        url:`mp/articles/${id}`,
        method:'DELETE',
    })
}
export const getArticleDetailAPI = (id:string)=>{
    return request({
        url:`/mp/articles/${id}`,
        method:'GET',
    })
}
export const updateArticleAPI = (data:PublishFieldType)=>{
    return request({
        url:`/mp/articles/${data.id}`,
        method:'PUT',
        data
    })
}