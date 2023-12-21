/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-21 13:48:17
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-21 13:54:33
 * @Description: 
 */
import { createSlice } from '@reduxjs/toolkit'

const userStore = createSlice({
    name:'user',
    initialState:{
        token:''
    },
    reducers:{
        // 
        setToken(state,action){
            state.token = action.payload
        }
    }
})

const {setToken} = userStore.actions
const userReducer = userStore.reducer
export { setToken }
export default userReducer