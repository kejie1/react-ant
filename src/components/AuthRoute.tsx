import { getToken } from "@/utils"
import { message } from "antd"
import { Navigate } from "react-router-dom"

// 封装权限验证组件
export const AuthRoute = (props:any)=>{
    const token = getToken()
    if(token){
        return <>{props.children}</>
    }else{
        // 重定向到登录
        message.warning('请登录')
        return <Navigate to='/login'/>
    }
}