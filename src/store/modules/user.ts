/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-21 13:48:17
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-22 11:38:13
 * @Description: 
 */
import { createSlice,Dispatch } from '@reduxjs/toolkit'
import { request } from '@/utils/index'
import { LoginFrom } from '@/types/user'
import { setToken as _setToken,getToken } from '@/utils/index'
const userStore = createSlice({
    name:'user',
    initialState:{
        token:getToken() || '',
        userInfo:{}
    },
    reducers:{
        setToken(state,action):void{
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state,action):void{
            state.userInfo = action.payload
        }
    }
})

const getUserToken = (loginFrom:LoginFrom)=>{
    return async (dispatch:Dispatch)=>{
        const res = await request.post('/authorizations',loginFrom)
        dispatch(setToken(res.data.token))
    }
}
const getUserInfo = ()=>{
    return async(dispatch:Dispatch)=>{
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}
const {setToken,setUserInfo} = userStore.actions
const userReducer = userStore.reducer
export { setToken,getUserToken,getUserInfo }
export default userReducer