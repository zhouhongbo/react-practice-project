import React, { useImperativeHandle } from "react";
import { Card, Input, Form, Select } from "antd";

const { Item } = Form;
const { Option } = Select;

function AddUser(props, ref) {
  const [addForm] = Form.useForm();

  useImperativeHandle(ref, () => ({
    getAddForm: () => addForm,
  }));

  return (
    <Card title="创建用户">
      <Form form={addForm} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Item>
        <Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input />
        </Item>
        <Item label="电话" name="phone">
          <Input />
        </Item>
        <Item label="邮箱" name="email">
          <Input />
        </Item>
        <Item label="所属角色" name="role_id">
          <Select>
            {props.roles.map(role => (<Option value={role._id} key={role._id}>{role.name}</Option>))}
          </Select>
        </Item>
      </Form>
    </Card>
  );
}

export default React.forwardRef(AddUser);
