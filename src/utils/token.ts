/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-21 16:27:11
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-21 16:28:43
 * @Description: 
 */
const TOKEN_KEY = 'token'
export const setToken = (token:string)=>{
    localStorage.setItem(TOKEN_KEY,token)
}
export const getToken = ()=>{
   return localStorage.getItem(TOKEN_KEY)
}
export const removeToken = ()=>{
    localStorage.removeItem(TOKEN_KEY)
}