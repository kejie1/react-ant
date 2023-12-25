import { getChannelListAPI } from "@/apis/article";
import { Dispatch, createSlice } from "@reduxjs/toolkit";

const articleStore = createSlice({
    name:'article',
    initialState:{
        channels:[]
    },
    reducers:{
        getChannels(state,action){
            state.channels = action.payload
        }
    }
})

const {getChannels} = articleStore.actions

const fetchChannels = ()=>{
    return async (dispatch:Dispatch)=>{
        const res = await getChannelListAPI()
        dispatch(getChannels(res.data.channels))
    }
}

export {fetchChannels}
export default articleStore.reducer