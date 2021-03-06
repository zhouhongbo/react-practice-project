import React, { useState, useImperativeHandle, useEffect } from 'react'
import { Form, Tree, Input } from 'antd'

import menuList from '../../route/route'

const Item = Form.Item

function AuthRole(props, ref) {
  const [checkedKeys, setCheckedKeys] = useState(props.role.menus)

  // useEffect也可以监听props是否改变
  useEffect(() => {
    setCheckedKeys(props.role.menus)
  }, [props])

  useImperativeHandle(ref, () => ({
    getMenus: () => {
      return checkedKeys
    },
  }))

  const onCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys)
  }

  const children = menuList.map((item) => {
    if (item.children) {
      return {
        title: item.title,
        key: item.key,
        checkable: !item.isPublic,
        children: item.children.map((i) => {
          return {
            title: i.title,
            key: i.key,
            checkable: !item.isPublic,
          }
        }),
      }
    } else {
      return {
        title: item.title,
        key: item.key,
        checkable: !item.isPublic,
      }
    }
  })

  const treeData = [
    {
      title: '平台权限',
      key: '0-0',
      children,
    },
  ]

  return (
    <Form>
      <Item label="角色名称">
        <Input value={props.role.name} disabled />
      </Item>
      <Tree
        treeData={treeData}
        checkable
        defaultExpandAll
        checkedKeys={checkedKeys}
        onCheck={onCheck}
      />
    </Form>
  )
}

export default React.forwardRef(AuthRole)
