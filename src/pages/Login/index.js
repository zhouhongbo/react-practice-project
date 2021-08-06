import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.less";
import logo from "./images/logo.png";

export default function Login() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    // 3. 表单统一验证
    form.validateFields().then(values => {
      if (values.password === '123456') return Promise.reject(new Error('密码太简单了！'))
    }).catch(errorInfo => {
      message.error(String(errorInfo))
    })
  };

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
            rules={[{ required: true, message: "请输入用户名!" }, ({getFieldValue}) => ({
              validator(_, value) {
                if (getFieldValue('password') !== value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('用户名和密码相同！'))
              }
            })]}
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
              { type: "string", min: 6, max: 20,  message: "密码6到20位!" },
              {pattern: /^[a-zA-Z0-9]+$/, message: "由英文、数字或下划线组成"}
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
