/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-21 09:44:05
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-21 13:31:00
 * @Description:
 */
import React from "react";
import { Card, Form, Input, Button } from "antd";
import "./index.scss";

export const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    phone?: string;
    password?: string;
    remember?: string;
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
            name="phone"
            rules={[
              { required: true, message: "请输入手机号" },
              {pattern:/^1[3-9]\d{9}$/,message:"手机号格式错误"} 
            ]}
            validateTrigger="onBlur"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
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
