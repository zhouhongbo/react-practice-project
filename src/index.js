import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import App from "./App";
import memoryUtil from "./util/memoryUtil";
import storageUtil from "./util/storageUtil";

const history = createBrowserHistory();
const user = storageUtil.getUser();
memoryUtil.user = user;

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById("root")
);
