/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-20 17:02:25
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-22 11:17:00
 * @Description: 
 */
import {createBrowserRouter} from 'react-router-dom'
import GeekLayout from '@/pages/Layout/index'
import {Login} from '@/pages/Login/index'
import { AuthRoute } from '@/components/AuthRoute'
import { Home } from '@/pages/Home/index'
import { Article } from '@/pages/Article/index'
import { Publish } from '@/pages/Publish/index'
const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/',
        element:<AuthRoute><GeekLayout /></AuthRoute>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:'article',
                element:<Article></Article>
            },
            {
                path:'publish',
                element:<Publish></Publish>
            },
        ]
    },
    
])
export default router