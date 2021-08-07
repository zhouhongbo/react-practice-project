import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import memoryUtil from "../../util/memoryUtil";
import Header from "../../components/Header";
import LeftNav from "../../components/LeftNav";
import Category from "../Category";
import Bar from "../Charts/Bar";
import Line from "../Charts/Line";
import Pie from "../Charts/Pie";
import Home from "../Home";
import Product from "../Product";
import Role from "../Role";
import User from "../User";

const { Footer, Sider, Content } = Layout;

export default function Admin() {
  const user = memoryUtil.user;
  if (!user || !user._id) {
    return <Redirect to="/login" />;
  }
  return (
    <Layout style={{ height: "100%" }}>
      <Sider>
        <LeftNav></LeftNav>
      </Sider>
      <Layout>
        <Header></Header>
        <Content style={{ backgroundColor: "#fff" }}>
          <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/category" component={Category}/>
            <Route path="/product" component={Product}/>
            <Route path="/role" component={Role}/>
            <Route path="/user" component={User}/>
            <Route path="/charts/bar" component={Bar}/>
            <Route path="/charts/line" component={Line}/>
            <Route path="/charts/pie" component={Pie}/>
            <Redirect to="/home"/>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center", color: "#cccccc" }}>
          推荐使用谷歌浏览器，可以获得更佳页面操作体验
        </Footer>
      </Layout>
    </Layout>
  );
}
