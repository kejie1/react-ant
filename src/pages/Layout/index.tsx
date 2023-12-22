/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-20 17:10:26
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-22 11:24:45
 * @Description: 
 */
import { Layout, Menu, Popconfirm, Button } from "antd";
import"./index.scss";
import {
  PieChartOutlined,
  SolutionOutlined,
  FileWordOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const GeekLayout = () => {
  // const items = [
  //   { label: <Link to="/home">数据面板</Link>,key: "/home"},
  //   { label: <Link to="/publish">创建文章</Link>,key: "/publish"},
  //   { label: <Link to="/article">内容管理</Link>, key: "/article" },
  // ]
  const items = [
    { label:'数据面板' ,key: "/"},
    { label: '创建文章',key: "/publish"},
    { label:'内容管理', key: "/article" },
  ]
  const navigate = useNavigate()
  const onChangeRoute = (route:any)=>{
    console.log(route)
    navigate(route.key)
  }
  return (
    <Layout className='geek-layout'>
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu defaultSelectedKeys={['1']} onClick={onChangeRoute} mode="inline" theme="dark" items={items}></Menu>
      </Sider>
      <Layout>
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>111</span>
            <Popconfirm
              placement="bottomRight"
              title="您确认退出极客园自媒体端吗？"
              okText="确认"
              cancelText="取消"
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