/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-26 09:46:26
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-26 09:52:01
 * @Description: 
 */

import { useEffect, useState } from "react";
import { getChannelListAPI } from "@/apis/article";
import {ChannelType} from '@/types/article'

export const useChannel = ()=>{
    const [channels,setChannels] = useState<Array<ChannelType>>([])
    // 获取分类列表
    useEffect(()=>{
        const fetchChannels = async ()=>{
            const res = await getChannelListAPI()
            setChannels(res.data.channels)
        }
        fetchChannels()
    },[])
    return {channels}
}   