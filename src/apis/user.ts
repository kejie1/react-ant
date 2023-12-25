/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-25 11:14:03
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-25 11:20:57
 * @Description: 
 */
import { request } from "@/utils";
import {LoginFrom} from '@/types/user'
export const loginAPI = (data:LoginFrom)=>{
    return request({
        url:'/authorizations',
        method:'POST',
        data:data
    })
}
export const getProfileAPI = ()=>{
    return request({
        url:'/user/profile',
        method:'GET',
    })
}