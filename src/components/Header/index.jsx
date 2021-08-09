import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Modal } from "antd";
import memoryUtil from "../../util/memoryUtil";
import storageUtil from "../../util/storageUtil"
import menuList from "../../route/route";
import { reqWeather } from "../../api";
import "./index.less";

export default function Header() {
  const history = useHistory();

  const [time, setTime] = useState(moment().format("YYYY-MM-DD h:mm:ss"));
  const [weather, setWeather] = useState("");

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTime(moment().format("YYYY-MM-DD h:mm:ss"));
    }, 1000);
    getWeather("110115"); // 北京大兴区的天气
    getTitle();

    return function clean() {
      clearInterval(intervalId)
    }
  }, []);

  const getWeather = async (city) => {
    const result = await reqWeather(city);
    setWeather(result);
  };

  const getTitle = () => {
    let pathname = history.location.pathname;
    let title;
    menuList.forEach((item) => {
      if (item.key === pathname) title = item.title;
      else if (item.children) {
        const cItem = item.children.find((cItem) => cItem.key === pathname);
        if (cItem) title = cItem.title;
      }
    });
    return title;
  };

  const logout = () => {
    Modal.confirm({
      content: "确认退出吗？",
      onOk() {
        memoryUtil.user = {}
        storageUtil.removeUser()
        history.replace('/login')
      }
    });
  };

  let title = getTitle();

  return (
    <div className="header">
      <div className="header-top">
        <span>欢迎，{memoryUtil.user.username}</span>
        <a href="#" onClick={logout}>
          退出
        </a>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
          <span>{time}</span>
          <span>{weather}</span>
        </div>
      </div>
    </div>
  );
}
