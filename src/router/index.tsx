/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-20 17:02:25
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-26 14:21:58
 * @Description: 
 */
import {createBrowserRouter} from 'react-router-dom'
import GeekLayout from '@/pages/Layout/index'
import { AuthRoute } from '@/components/AuthRoute'
import Login from '@/pages/Login'
import { Suspense, lazy } from 'react'
// 组件导入通过lazy导入
const Home = lazy(()=>import('@/pages/Home/index'))
const Article = lazy(()=>import('@/pages/Article/index'))
const Publish = lazy(()=>import('@/pages/Publish/index'))
// 使用suspense包裹
{/* <Suspense><Home /></Suspense>  */}

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
                element:<Suspense fallback={'加载中'}><Home /></Suspense> 
            },
            {
                path:'article',
                element:<Suspense fallback={'加载中'}><Article /></Suspense> 
            },
            {
                path:'publish',
                element:<Suspense fallback={'加载中'}><Publish /></Suspense> 
            },
        ]
    },
    
])
export default router