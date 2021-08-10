import React, { useEffect } from "react";
import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Option = Select.Option;

export default function AddForm(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    props.getAddForm(form);
  }, []);

  useEffect(() => {
    form.setFieldsValue({ parentId: props.parentId });
  });

  return (
    <Form form={form}>
      <Item name="parentId">
        <Select style={{ width: "100%" }}>
          <Option value="0" key="0">
            一级分类
          </Option>
          {props.categorys.map((item) => {
            return (
              <Option value={item._id} key={item._id}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </Item>
      <Item
        name="categoryName"
        rules={[{ required: true, message: "请输入分类名" }]}
      >
        <Input placeholder="请输入分类名称"></Input>
      </Item>
    </Form>
  );
}
