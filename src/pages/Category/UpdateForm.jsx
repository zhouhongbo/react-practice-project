import React, { useEffect } from "react";
import { Form, Input } from "antd";

const Item = Form.Item;

export default function UpdateForm(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    props.getUpdateForm(form);
    form.setFieldsValue({ categoryName: props.categoryName });
  });

  return (
    <Form form={form}>
      <Item
        name="categoryName"
        rules={[{ required: true, message: "请输入分类名" }]}
      >
        <Input />
      </Item>
    </Form>
  );
}
