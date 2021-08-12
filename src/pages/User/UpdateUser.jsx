import React from "react";
import { Card, Input, Form, Select } from "antd";

const { Item } = Form;
const { Option } = Select;

export default function UpdateUser(props) {
  return (
    <Card title="修改用户信息">
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Item label="用户名" name="username">
          <Input />
        </Item>
        <Item label="邮箱" name="email">
          <Input />
        </Item>
        <Item label="电话" name="phone">
          <Input />
        </Item>
        <Item label="所属角色" name="role_id">
          <Select>
            <Option value="1">管理员</Option>
          </Select>
        </Item>
      </Form>
    </Card>
  );
}