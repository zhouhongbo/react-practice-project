import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
} from './action-types'
import { reqLogin } from '../api'
import storageUtil from '../util/storageUtil'

export const setHeadTitle = (headTitle) => ({
  type: SET_HEAD_TITLE,
  payload: headTitle,
})
export const receiveUser = (user) => ({ type: RECEIVE_USER, payload: user })
export const showErrorMsg = (errorMsg) => ({
  type: SHOW_ERROR_MSG,
  payload: errorMsg,
})
export const logout = () => {
  storageUtil.removeUser()
  return { type: RESET_USER }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const result = await reqLogin(username, password)
    if (result.status === 0) {
      const user = result.data
      storageUtil.setUser(user)
      dispatch(receiveUser(user))
    } else {
      const msg = result.msg
      dispatch(showErrorMsg(msg))
    }
  }
}
