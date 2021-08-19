import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Table, Space, Modal, message } from 'antd'
import moment from 'moment'

import { PAGE_SIZE } from '../../util/constants'
import { reqRoles } from '../../api'
import AddRole from './AddRole'
import AuthRole from './AuthRole'
import { reqAddRole, reqUpdateRole } from '../../api'
import { logout } from '../../store/actions'

function Role(props) {
  const ref = useRef()

  const [roles, setRoles] = useState([])
  const [role, setRole] = useState({})
  const [isShowAdd, setIsShowAdd] = useState(false)
  const [isShowAuth, setIsShowAuth] = useState(false)
  const [form, setForm] = useState()

  useEffect(() => {
    getRoles()
  }, [])

  const getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      setRoles(result.data)
    }
  }

  const onRow = (role) => {
    return {
      onClick: (event) => {
        setRole(role)
      },
    }
  }

  const addRole = () => {
    form.validateFields().then(async (values) => {
      const result = await reqAddRole(values.roleName)
      if (result.status === 0) {
        message.success('添加角色成功')
        setIsShowAdd(false)

        // getRoles();
        setRoles([...roles, result.data])
      } else {
        message.error('添加角色失败')
      }
    })
  }

  const updateRole = async () => {
    setIsShowAuth(false)
    const updateParam = {
      _id: role._id,
      menus: ref.current.getMenus(),
      auth_time: Date.now(),
      auth_name: props.user.username,
    }
    const result = await reqUpdateRole(updateParam)
    if (result.status === 0) {
      // 如果更新了自己的权限，强制退出登录
      if (updateParam._id === props.user.role_id) {
        message.info('更新了权限，请重新登录')
        props.logout()
      } else {
        message.success('更新成功')
        getRoles()
        // 更新role
        role.menus = updateParam.menus
        setRole(role)
      }
    } else {
      message.error('更新失败')
    }
  }

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (createTime) => moment(createTime).format('YYYY-MM-DD h:mm:ss'),
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: (authTime) => moment(authTime).format('YYYY-MM-DD h:mm:ss'),
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
    },
  ]

  const title = (
    <Space>
      <Button type="primary" onClick={() => setIsShowAdd(true)}>
        创建角色
      </Button>
      <Button disabled={!role._id} onClick={() => setIsShowAuth(true)}>
        设置角色权限
      </Button>
    </Space>
  )

  return (
    <Card title={title}>
      <Table
        bordered
        dataSource={roles}
        columns={columns}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [role._id],
          onSelect: (role) => setRole(role),
        }}
        rowKey="_id"
        pagination={{ defaultPageSize: PAGE_SIZE }}
        onRow={onRow}
      />
      <Modal
        title="添加角色"
        visible={isShowAdd}
        onOk={addRole}
        onCancel={() => {
          setIsShowAdd(false)
          form.resetFields()
        }}
      >
        <AddRole setForm={(form) => setForm(form)} />
      </Modal>
      <Modal
        title="设置角色权限"
        visible={isShowAuth}
        onOk={updateRole}
        onCancel={() => setIsShowAuth(false)}
      >
        <AuthRole ref={ref} role={role} />
      </Modal>
    </Card>
  )
}
export default connect((state) => ({ user: state.user }), { logout })(Role)
