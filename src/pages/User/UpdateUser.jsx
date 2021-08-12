import React, { useState, useEffect, useImperativeHandle } from "react";
import { Card, Input, Form, Select } from "antd";

const { Item } = Form;
const { Option } = Select;

function UpdateUser(props, ref) {
  const [updateForm] = Form.useForm();

  useEffect(() => {
    updateForm.resetFields();
    updateForm.setFieldsValue(props.user);
  }, [props.user]);

  useImperativeHandle(ref, () => ({
    getUpdateForm: () => updateForm,
  }));

  return (
    <Card title="修改用户信息">
      <Form form={updateForm} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
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
            {props.roles.map((role) => (
              <Option value={role._id} key={role._id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Item>
      </Form>
    </Card>
  );
}
export default React.forwardRef(UpdateUser);
