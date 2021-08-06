import React from "react";
import { Redirect } from "react-router";
import memoryUtil from "../../util/memoryUtil";

export default function Admin() {
  const user = memoryUtil.user;
  if (!user || !user._id) {
    return <Redirect to="/login" />
  }
  return <div>欢迎 {user.username}</div>;
}
