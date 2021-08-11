import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "antd";
import "./index.less";
import logo from "../../assets/images/logo.png";
import menuList from "../../route/route";

const { SubMenu } = Menu;

export default function LeftNav() {
  // 使用数组的map方法
  const renderMenuMap = (menuList) => {
    return menuList.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title} icon={<item.icon />}>
            {renderMenuMap(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key} icon={<item.icon />}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      }
    });
  };
  // 使用数组的reduce方法
  const renderMenuReduce = (menuList) => {
    return menuList.reduce((result, item) => {
      if (item.children) {
        result.push(
          <SubMenu key={item.key} title={item.title} icon={<item.icon />}>
            {renderMenuReduce(item.children)}
          </SubMenu>
        );
      } else {
        result.push(
          <Menu.Item key={item.key} icon={<item.icon />}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      }
      return result;
    }, []);
  };

  // 获取当前路径
  const history = useHistory();
  let path = history.location.pathname;

  if (path.indexOf('/products/product') === 0) {
    path = '/products/product';
  }

  return (
    <div className="left-nav">
      <Link className="left-nav-header" to="/">
        <img src={logo} alt="logo" />
        <h1>硅谷后台</h1>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[path]}
        defaultOpenKeys={['/products', '/charts']}
      >
        {renderMenuReduce(menuList)}
        {/* {renderMenuMap(menuList)} */}
      </Menu>
    </div>
  );
}
