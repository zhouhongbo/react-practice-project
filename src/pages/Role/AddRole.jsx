import React, { useEffect } from "react";
import { Form, Input } from "antd";

const Item = Form.Item;

export default function AddRole(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    props.setForm(form);
  }, []);

  return (
    <Form form={form}>
      <Item
        name="roleName"
        label="角色名称："
        rules={[{ required: true, message: "请输入角色名" }]}
      >
        <Input placeholder="请输入角色名称"></Input>
      </Item>
    </Form>
  );
}

