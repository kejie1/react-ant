/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-21 09:44:05
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-25 11:22:06
 * @Description:
 */
import React from "react";
import { Card, Form, Input, Button,message } from "antd";
import "./index.scss";
import { useDispatch } from 'react-redux'
import {getUserToken} from '@/store/modules/user'
import { LoginFrom } from '@/types/user'
import {UnknownAction}from '@reduxjs/toolkit'
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    // 获取form输入
  const onFinish = async (values: LoginFrom) => {
    await dispatch(getUserToken(values) as unknown as UnknownAction)
    // 跳转主页
    navigate('/')
    message.success('登录成功')
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    mobile?: string;
    code?: string;
  };
  return (
    <div className="full-height flex justify-center items-center">
      <Card style={{ width: 500 }}>
        <div className="flex justify-center">
        <h2>Login</h2>
        </div>
        <Form
          name="basic"
          style={{ maxWidth: 500 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="mobile"
            rules={[
              { required: true, message: "请输入手机号" },
              {pattern:/^1[3-9]\d{9}$/,message:"手机号格式错误"} 
            ]}
            validateTrigger="onBlur"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
            validateTrigger="onBlur"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              className="cursor-p"
              size="small"
              block
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
