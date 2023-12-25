/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-21 13:47:30
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-21 13:53:59
 * @Description: 
 */
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './modules/user'
import articleReducer from './modules/article'
const store = configureStore({
    reducer:{
        user:userReducer,
        article:articleReducer
    }
})

export default store

