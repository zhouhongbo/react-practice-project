import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Card, Select, Input, Button, Table, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";
import { PAGE_SIZE } from "../../util/constants";

const Option = Select.Option;

export default function ProductHome() {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("productName");
  const [pageNum, setPageNum] = useState(1);

  useEffect(async () => {
    getProducts(1);
  }, []);

  const getProducts = async (pageNum) => {
    setPageNum(pageNum)
    setLoading(true);

    let result = {};
    if (searchName) {
      result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType,
      });
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE);
    }

    setLoading(false);
    if (result.status === 0) {
      setProducts(result.data.list);
      setTotal(result.data.total);
    }
  };

  const updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status);
    if (result.status === 0) {
      if (status === 1) {
        message.success("上架成功！");
      } else {
        message.success("下架成功！");
      }
    }
    getProducts(pageNum);
  };

  const title = (
    <span>
      <Select
        value={searchType}
        style={{ width: 150 }}
        onChange={(value) => setSearchType(value)}
      >
        <Option value="productName">按名称搜索</Option>
        <Option value="productDesc">按描述搜索</Option>
      </Select>
      <Input
        placeholder="关键字"
        style={{ width: 150, margin: "0 15px" }}
        value={searchName}
        onChange={(event) => setSearchName(event.target.value)}
      />
      <Button type="primary" onClick={() => getProducts(1)}>
        搜索
      </Button>
    </span>
  );
  const extra = (
    <Button type="primary" icon={<PlusOutlined />}>
      添加商品
    </Button>
  );

  const columns = [
    {
      title: "商品名称",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "商品描述",
      dataIndex: "desc",
    },
    {
      title: "价格",
      dataIndex: "price",
      render: (price) => "￥" + price,
      width: 100,
    },
    {
      title: "状态",
      render: (product) => {
        const { status, _id } = product;
        return (
          <span>
            <Button
              type="primary"
              onClick={() => updateStatus(_id, status === 1 ? 2 : 1)}
            >
              {status === 1 ? "下架" : "上架"}
            </Button>
            <span>{status === 1 ? "在售" : "已下架"}</span>
          </span>
        );
      },
      width: 100,
    },
    {
      title: "操作",
      render: (product) => {
        return (
          <Space>
            {/* 把product传递给目标路由组件 */}
            <a
              onClick={() =>
                history.push("/products/product/detail", { product })
              }
            >
              详情
            </a>
            <a>修改</a>
          </Space>
        );
      },
      width: 100,
    },
  ];
  return (
    <Card title={title} extra={extra}>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        bordered
        loading={loading}
        pagination={{
          total,
          defaultPageSize: PAGE_SIZE,
          showQuickJumper: true,
          onChange: (pageNum) => getProducts(pageNum),
        }}
      />
    </Card>
  );
}
