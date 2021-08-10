import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { BASE_IMG_URL } from "../../util/constants";
import { reqCategory } from "../../api";
import "./product.less";

const Item = List.Item;

export default function ProductDetail(props) {
  const history = useHistory();
  const { name, desc, price, detail, imgs, pCategoryId, categoryId } =
    props.location.state.product;

  const [cName1, setCName1] = useState(""); // 一级分类名称
  const [cName2, setCName2] = useState(""); // 二级分类名称

  useEffect(async () => {
    if (pCategoryId === "0") {
      const result = await reqCategory(categoryId);
      setCName1(result.data.name);
    } else {
      /* const result1 = await reqCategory(pCategoryId);
      const result2 = await reqCategory(categoryId);
      setCName1(result1.data.name);
      setCName2(result2.data.name); */
      
      // 一次性发送多个请求
      const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]);
      setCName1(results[0].data.name);
      setCName2(results[1].data.name);
    }
  }, []);

  const title = (
    <span>
      <a onClick={() => history.goBack()}>
        <ArrowLeftOutlined
          style={{ color: "green", marginRight: 15, fontSize: 20 }}
        />
      </a>
      <span>商品详情</span>
    </span>
  );

  return (
    <Card title={title} className="product-detail">
      <List>
        <Item>
          <span className="left">商品名称：</span>
          <span>{name}</span>
        </Item>
        <Item>
          <span className="left">商品描述：</span>
          <span>{desc}</span>
        </Item>
        <Item>
          <span className="left">商品价格：</span>
          <span>{price}元</span>
        </Item>
        <Item>
          <span className="left">所属分类：</span>
          <span>{cName1} {cName2 ? ' --> ' + cName2 : ''}</span>
        </Item>
        <Item>
          <span className="left">商品图片：</span>
          <span>
            {imgs.map((img) => (
              <img
                className="product-img"
                alt="img"
                src={BASE_IMG_URL + img}
                key={img}
              />
            ))}
          </span>
        </Item>
        <Item>
          <span className="left">商品详情：</span>
          <span dangerouslySetInnerHTML={{ __html: detail }}></span>
        </Item>
      </List>
    </Card>
  );
}
