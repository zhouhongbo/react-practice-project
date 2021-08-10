import React from "react";
import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Option = Select.Option;

export default function AddForm() {
  const [form] = Form.useForm();
  return (
    <Form form={form}>
      <Item>
        <Select name="parentId" defaultValue="0" style={{ width: "100%" }}>
          <Option value="0">一级分类</Option>
          <Option value="1">电脑</Option>
          <Option value="2">图书</Option>
        </Select>
      </Item>
      <Item>
        <Input name="categoryName" placeholder="请输入分类名称"></Input>
      </Item>
    </Form>
  );
}
