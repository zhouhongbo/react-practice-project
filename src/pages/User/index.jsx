/* 
  1. 静态界面
  2. 获取用户列表
  3. 添加用户
  4. 修改用户
  5. 删除用户
 */
import React, { useState, useEffect, useRef } from "react";
import { Card, Table, Button, Space, Modal, message } from "antd";
import moment from "moment";

import { reqAddUser, reqUpdateUser, reqUsers, reqRoles } from "../../api";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";

export default function User() {
  const addRef = useRef();
  const updateRef = useRef();

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  const getUsers = async () => {
    const result = await reqUsers();
    if (result.status === 0) {
      setUsers(result.data.users);
    }
  };

  const getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      setRoles(result.data);
    }
  };

  const cancelAdd = () => {
    setIsAdd(false);
  };

  const cancelUpdate = () => {
    setIsUpdate(false);
  };

  const addUser = () => {
    setIsAdd(false);

    const addForm = addRef.current.getAddForm();
    addForm.validateFields().then(async (values) => {
      const result = await reqAddUser(values);
      if (result.status === 0) {
        message.success("添加用户成功");
        addForm.resetFields();
        getUsers();
      } else {
        message.error("添加用户失败");
      }
    });
  };

  const updateUser = () => {
    setIsUpdate(false);

    const updateForm = updateRef.current.getUpdateForm();
    updateForm.validateFields().then(async (values) => {
      const result = await reqUpdateUser({...values, _id: user._id});
      if (result.status === 0) {
        message.success("修改用户成功");
        getUsers();
      } else {
        message.error("修改用户失败");
      }
    });
  };

  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "电话",
      dataIndex: "phone",
    },
    {
      title: "注册时间",
      dataIndex: "create_time",
      render: (createTime) => moment(createTime).format("YYYY-MM-DD h:mm:ss"),
    },
    {
      title: "所属角色",
      dataIndex: "role_id",
      render: (roleId) =>
        roleId && roles.length !== 0
          ? roles.find((role) => role._id === roleId).name
          : null,
    },
    {
      title: "操作",
      render: (user) => (
        <Space>
          <a onClick={() => {
            setIsUpdate(true);
            setUser(user);
          }}>修改</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
  const title = (
    <Button type="primary" onClick={() => setIsAdd(true)}>
      创建用户
    </Button>
  );
  return (
    <Card title={title}>
      <Table dataSource={users} columns={columns} rowKey="_id" />
      <Modal
        visible={isAdd}
        onCancel={cancelAdd}
        onOk={addUser}
        closable={false}
      >
        <AddUser ref={addRef} roles={roles} />
      </Modal>
      <Modal
        visible={isUpdate}
        onCancel={cancelUpdate}
        onOk={updateUser}
        closable={false}
      >
        <UpdateUser ref={updateRef} roles={roles} user={user}/>
      </Modal>
    </Card>
  );
}
