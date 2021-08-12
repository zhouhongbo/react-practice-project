/* 
  1. 静态界面
  2. 获取用户列表
 */
import React, { useState, useEffect } from "react";
import { Card, Table, Button, Space, Modal } from "antd";

import { reqAddUser, reqUpdateUser, reqUsers } from "../../api";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";

export default function User() {
  const [users, setUsers] = useState([])
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    const result = await reqUsers();
    if (result.status === 0) {
      setUsers(result.data.users)
    }
  }

  const cancelAdd = () => {
    setIsAdd(false);
  };

  const cancelUpdate = () => {
    setIsUpdate(false);
  };

  const addUser = () => {
    setIsAdd(false);
  }

  const updateUser = () => {
    setIsUpdate(false);
  }

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
    },
    {
      title: "所属角色",
      dataIndex: "role_id",
    },
    {
      title: "操作",
      render: (user) => (
        <Space>
          <a onClick={() => setIsUpdate(true)}>修改</a>
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
      <Table dataSource={users} columns={columns} rowKey="role_id"/>
      <Modal visible={isAdd} onCancel={cancelAdd} onOk={addUser} closable={false}>
        <AddUser />
      </Modal>
      <Modal visible={isUpdate} onCancel={cancelUpdate} onOk={updateUser} closable={false}>
        <UpdateUser />
      </Modal>
    </Card>
  );
}
