/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-20 17:10:26
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-25 10:44:08
 * @Description: 
 */
import { Layout, Menu, Popconfirm, Button, message } from "antd";
import"./index.scss";
import {
  PieChartOutlined,
  SolutionOutlined,
  FileWordOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {UnknownAction}from '@reduxjs/toolkit'
import {getUserInfo,clearUserInfo} from '@/store/modules/user'

const { Header, Sider, Content } = Layout;

const GeekLayout = () => {
  const items = [
    { label:'数据面板' ,key: "/"},
    { label: '创建文章',key: "/publish"},
    { label:'内容管理', key: "/article" },
  ]
  const navigate = useNavigate()
  // 修改路由
  const onChangeRoute = (route:any)=>{
    navigate(route.key)
  }
  // 当前的路由
  const location = useLocation()
  // 获取用户信息
  const name= useSelector((state:any)=>state.user.userInfo.name)
  const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUserInfo() as unknown as UnknownAction)
    },[dispatch])
  // 退出登录
  const handleLogout = ()=>{
    dispatch(clearUserInfo())
    message.success('退出成功')
    navigate('/login')
  }
  return (
    <Layout className='geek-layout'>
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu selectedKeys={[location.pathname]} onClick={onChangeRoute} mode="inline" theme="dark" items={items}></Menu>
      </Sider>
      <Layout>
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{name}</span>
            <Popconfirm
              placement="bottomRight"
              title="您确认退出极客园自媒体端吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={handleLogout}
            >
              <Button type="link" icon={<LogoutOutlined />}>
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;