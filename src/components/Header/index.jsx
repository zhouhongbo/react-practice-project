import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Modal } from 'antd'

import { reqWeather } from '../../api'
import { logout } from '../../store/actions'
import './index.less'

function Header(props) {
  const [time, setTime] = useState(moment().format('YYYY-MM-DD h:mm:ss'))
  const [weather, setWeather] = useState('')

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTime(moment().format('YYYY-MM-DD h:mm:ss'))
    }, 1000)
    getWeather('110115') // 北京大兴区的天气

    return function clean() {
      clearInterval(intervalId)
    }
  }, [])

  const getWeather = async (city) => {
    const result = await reqWeather(city)
    setWeather(result)
  }

  const logout = () => {
    Modal.confirm({
      content: '确认退出吗？',
      onOk() {
        props.logout()
      },
    })
  }

  return (
    <div className="header">
      <div className="header-top">
        <span>欢迎，{props.user.username}</span>
        <a onClick={logout}>退出</a>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{props.headTitle}</div>
        <div className="header-bottom-right">
          <span>{time}</span>
          <span>{weather}</span>
        </div>
      </div>
    </div>
  )
}

export default connect(
  (state) => ({
    headTitle: state.headTitle,
    user: state.user,
  }),
  { logout }
)(Header)
