/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-21 13:35:04
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-21 16:51:15
 * @Description: axios封装
 */
// axios封装
import axios from "axios";
import { AxiosResponse } from "axios";
import { getToken } from "@/utils/index";
import { useNavigate } from "react-router";
import { message } from "antd";

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
    return Promise.reject(error.response);
  }
);

export { request };
