/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-21 13:35:04
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-25 10:54:32
 * @Description: axios封装
 */
// axios封装
import axios from "axios";
import { AxiosResponse } from "axios";
import { getToken, removeToken } from "@/utils/index";
import { message } from "antd";
import router from "@/router";
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 1000 * 5,
});
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // axios拦截器配置token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
interface IHomeData extends AxiosResponse {
  code: number;
  data: any;
  message: string;
}
// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<IHomeData, any>) => {
    return response.data;
  },
  (error) => {
    if(error.response.status === 401){
      removeToken()
      message.warning('登录状态失效，请重新登录')
      router.navigate('/login')
      window.location.reload()
    }
    return Promise.reject(error.response);
  }
);

export { request };
