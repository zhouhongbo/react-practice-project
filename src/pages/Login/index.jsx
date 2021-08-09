import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import memoryUtil from "../../util/memoryUtil";
import storageUtil from "../../util/storageUtil";
import { reqLogin } from "../../api";
import "./login.less";
import logo from "../../assets/images/logo.png"

export default function Login() {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        // 3. 表单统一验证
        if (values.password === "123456")
          return Promise.reject(new Error("密码太简单了！"));
        // 发送ajax请求
        let result = await reqLogin(values.username, values.password);
        if (result.status === 0) {
          message.success('登录成功')
          memoryUtil.user = result.data
          storageUtil.setUser(result.data)
          history.replace('/')
        } else {
          message.error('用户名或密码错误')
        }
      })
      .catch((errorInfo) => {
        message.error(String(errorInfo));
      });
  };

  // 判断用户是否登录
  const user = memoryUtil.user
  if (user && user._id) {
    return <Redirect to="/" />
  }

  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登录</h2>
        <Form className="login-form" form={form} onFinish={onFinish}>
          <Form.Item
            name="username"
            // 2. 自定义验证，点击按钮后才验证
            rules={[
              { required: true, message: "请输入用户名!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    getFieldValue("password") !== value ||
                    getFieldValue("password") === "admin"
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("用户名和密码相同！"));
                },
              }),
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
              placeholder="  账户"
            />
          </Form.Item>

          <Form.Item
            name="password"
            // 1. 声明式验证
            rules={[
              { required: true, message: "请输入密码!" },
              { type: "string", min: 5, max: 20, message: "密码5到20位!" },
              {
                pattern: /^[a-zA-Z0-9]+$/,
                message: "由英文、数字或下划线组成",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
              placeholder="  密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}
