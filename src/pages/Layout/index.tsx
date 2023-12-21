import { request } from "@/utils"
import { useEffect } from "react"

/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-20 17:10:26
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-21 16:39:19
 * @Description: Index
 */
export const Index = ()=>{
    useEffect(()=>{
        request.get('/user/profile')
    },[])
    return(<>
    this is Index page
    </>)
}