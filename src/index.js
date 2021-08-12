import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import { createBrowserHistory } from "history";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import App from "./App";
import memoryUtil from "./util/memoryUtil";
import storageUtil from "./util/storageUtil";
import store from "./store/store"

const history = createBrowserHistory();
const user = storageUtil.getUser();
memoryUtil.user = user;

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById("root")
);
