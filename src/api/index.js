import { message } from "antd";
import jsonp from "jsonp";
import ajax from "./ajax";

// 登录
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

// 添加用户
export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST");

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
}) => ajax("/manage/product/search", { pageNum, pageSize, [searchType]: searchName });

// 根据id获取分类
export const reqCategory = (categoryId) => ajax("/manage/category/info", {categoryId});

// 更新商品的状态
export const reqUpdateStatus = (productId, status) => ajax("/manage/product/updateStatus", {productId, status}, "POST");

// 删除图片
export const reqDeleteImg = (name) => ajax("/manage/img/delete", {name}, "POST");

// 添加/修改商品
export const reqAddorUpdateProduct = (product) => ajax("/manage/product/" + (product._id ? 'update' : 'add'), product, "POST");

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
