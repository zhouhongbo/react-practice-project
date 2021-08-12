import { message } from "antd";
import jsonp from "jsonp";
import ajax from "./ajax";

// 登录
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

// 添加用户
export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST");

// 删除用户
export const reqDeleteUser = (userId) => ajax("/manage/user/delete", {userId}, "POST")

// 更新用户
export const reqUpdateUser = (user) => ajax("/manage/user/update", user, "POST");

// 获取用户列表
export const reqUsers = () => ajax("/manage/user/list");

// 获取分类列表
export const reqCategorys = (parentId) =>
  ajax("/manage/category/list", { parentId });

// 添加分类
export const reqAddCategory = (parentId, categoryName) =>
  ajax("/manage/category/add", { parentId, categoryName }, "POST");

// 更新分类
export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "POST");

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) =>
  ajax("/manage/product/list", { pageNum, pageSize });

// 搜索商品分页列表 searchType: productName / productDesc
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType,
}) =>
  ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });

// 根据id获取分类
export const reqCategory = (categoryId) =>
  ajax("/manage/category/info", { categoryId });

// 更新商品的状态
export const reqUpdateStatus = (productId, status) =>
  ajax("/manage/product/updateStatus", { productId, status }, "POST");

// 删除图片
export const reqDeleteImg = (name) =>
  ajax("/manage/img/delete", { name }, "POST");

// 添加/修改商品
export const reqAddorUpdateProduct = (product) =>
  ajax("/manage/product/" + (product._id ? "update" : "add"), product, "POST");

// 获取所有角色的列表
export const reqRoles = () => ajax("/manage/role/list");

// 添加角色
export const reqAddRole = (roleName) =>
  ajax("/manage/role/add", { roleName }, "POST");

// 给角色设置权限
export const reqUpdateRole = ({ _id, menus, auth_time, auth_name }) =>
  ajax("/manage/role/update", { _id, menus, auth_time, auth_name }, "POST");

// jsonp请求天气
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=1234b9a2657fe9396bae6c286a8198a4`;
    jsonp(url, {}, (err, data) => {
      if (data.status === "1" && !err) {
        resolve(data.lives[0].weather);
      } else {
        message.error("请求天气失败！");
      }
    });
  });
};
