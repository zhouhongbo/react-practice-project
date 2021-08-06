import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import App from "./App";

const history = createBrowserHistory();

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById("root")
);
