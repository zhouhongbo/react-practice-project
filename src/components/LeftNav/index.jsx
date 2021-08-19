import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'antd'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../route/route'
import { setHeadTitle } from '../../store/actions'

const { SubMenu } = Menu

function LeftNav(props) {
  const history = useHistory()
  const [path, setPath] = useState('')

  useEffect(() => {
    if (history.location.pathname.indexOf('/products/product') === 0) {
      setPath('/products/product')
    } else {
      setPath(history.location.pathname)
    }
  }, [])

  const hasAuth = (item) => {
    const menus = props.user.role.menus
    const username = props.user.username
    if (menus.includes(item.key) || item.isPublic || username === 'admin') {
      return true
    } else if (item.children) {
      if (item.children.find((child) => menus.includes(child.key))) return true
    } else {
      return false
    }
  }

  const renderMenuMap = (menuList) => {
    return menuList.map((item) => {
      if (hasAuth(item)) {
        if (item.children) {
          return (
            <SubMenu key={item.key} title={item.title} icon={<item.icon />}>
              {renderMenuMap(item.children)}
            </SubMenu>
          )
        } else {
          if (item.key === path || path.indexOf(item.key) === 0) {
            // 判断item是否为当前item
            props.setHeadTitle(item.title)
          }
          return (
            <Menu.Item key={item.key} icon={<item.icon />}>
              <Link
                to={item.key}
                onClick={() => props.setHeadTitle(item.title)}
              >
                {item.title}
              </Link>
            </Menu.Item>
          )
        }
      }
    })
  }

  return (
    <div className="left-nav">
      <Link className="left-nav-header" to="/">
        <img src={logo} alt="logo" />
        <h1>硅谷后台</h1>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[path]}
        defaultOpenKeys={['/products', '/charts']}
        onClick={(item) => setPath(item.key)}
      >
        {renderMenuMap(menuList)}
      </Menu>
    </div>
  )
}
export default connect((state) => ({ user: state.user }), { setHeadTitle })(
  LeftNav
)
