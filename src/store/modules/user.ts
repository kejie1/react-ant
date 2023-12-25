/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-21 13:48:17
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-25 11:20:17
 * @Description: 
 */
import { createSlice,Dispatch } from '@reduxjs/toolkit'
import { removeToken, request } from '@/utils/index'
import { LoginFrom } from '@/types/user'
import { setToken as _setToken,getToken } from '@/utils/index'
import { loginAPI,getProfileAPI } from '@/apis/user'
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
        },
        clearUserInfo(state):void{
            state.token = '',
            state.userInfo = {}
            removeToken()
        }
    }
})

const getUserToken = (loginFrom:LoginFrom)=>{
    return async (dispatch:Dispatch)=>{
        const res = await loginAPI(loginFrom)
        dispatch(setToken(res.data.token))
    }
}
const getUserInfo = ()=>{
    return async(dispatch:Dispatch)=>{
        const res = await getProfileAPI()
        dispatch(setUserInfo(res.data))
    }
}
const {setToken,setUserInfo,clearUserInfo} = userStore.actions
const userReducer = userStore.reducer
export { setToken,getUserToken,getUserInfo,clearUserInfo }
export default userReducer