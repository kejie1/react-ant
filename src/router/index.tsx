/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-20 17:02:25
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-21 16:59:29
 * @Description: 
 */
import {createBrowserRouter} from 'react-router-dom'
import GeekLayout from '@/pages/Layout/index'
import {Login} from '@/pages/Login/index'
import { AuthRoute } from '@/components/AuthRoute'
const router = createBrowserRouter([
    {
        path:'/index',
        element:<AuthRoute><GeekLayout /></AuthRoute>
    },
    {
        path:'/login',
        element:<Login />
    }
])
export default router