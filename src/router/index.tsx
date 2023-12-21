/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-20 17:02:25
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-21 09:44:36
 * @Description: 
 */
import {createBrowserRouter} from 'react-router-dom'
import {Index} from '@/pages/Layout/index'
import {Login} from '@/pages/Login/index'
const router = createBrowserRouter([
    {
        path:'/index',
        element:<Index />
    },
    {
        path:'/login',
        element:<Login />
    }
])
export default router