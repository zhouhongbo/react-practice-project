import { combineReducers } from "redux";

import storageUtil from "../util/storageUtil";
import {SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER} from "./action-types"

const initHeadTitle = '首页';

function headTitle(state=initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.payload;
    default:
      return state;
  }
}

const initUser = storageUtil.getUser();

function user(state=initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.payload;
    case SHOW_ERROR_MSG: 
      const errorMsg = action.payload;
      return {...state, errorMsg}
    case RESET_USER:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  headTitle,
  user,
});