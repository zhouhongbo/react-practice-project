import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./index.less";
import logo from "../../assets/images/logo.png";
import menuList from "../../route/route"

const { SubMenu } = Menu;

export default function LeftNav() {
  return (
    <div to="/" className="left-nav">
      <Link className="left-nav-header">
        <img src={logo} alt="logo" />
        <h1>硅谷后台</h1>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/home">首页</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
          <Menu.Item key="2">
            <Link to="/category">品类管理</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/product">商品管理</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="4">
          <Link to="/user">用户管理</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/role">角色管理</Link>
        </Menu.Item>
        <SubMenu key="sub2" icon={<MailOutlined />} title="图形图表">
          <Menu.Item key="6">
            <Link to="/charts/bar">柱形图</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/charts/line">折线图</Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to="/charts/pie">饼图</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}
