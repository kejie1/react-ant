/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-21 13:48:17
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-21 16:01:39
 * @Description: 
 */
import { createSlice,Dispatch } from '@reduxjs/toolkit'
import { request } from '@/utils/index'
import { LoginFrom } from '@/types/user'

const userStore = createSlice({
    name:'user',
    initialState:{
        token:''
    },
    reducers:{
        // 
        setToken(state,action):void{
            state.token = action.payload
        }
    }
})

const getUserToken = (loginFrom:LoginFrom)=>{
    return async (dispatch:Dispatch)=>{
        const res = await request.post('/authorizations',loginFrom)
        dispatch(setToken(res.data.token))
    }
}
const {setToken} = userStore.actions
const userReducer = userStore.reducer
export { setToken,getUserToken }
export default userReducer