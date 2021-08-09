import React, { useState, useEffect } from "react";
import { Card, Table, Button, Space, message } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { reqCategorys } from "../../api";

export default function Category() {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parentId, setParentId] = useState("0");
  const [parentName, setParentName] = useState("");

  useEffect(async () => {
    getCategorys();
  }, [parentId]);

  const showSubCategorys = async (category) => {
    setParentId(category._id);
    setParentName(category.name);
  };

  const getCategorys = async () => {
    setLoading(true);
    const result = await reqCategorys(parentId);
    if (result.status === 0) {
      setCategorys(result.data);
    } else {
      message.error("获取列表失败！");
    }
    setLoading(false);
  };

  const columns = [
    {
      title: "分类的名称",
      dataIndex: "name",
    },
    {
      title: "操作",
      width: 300,
      render: (category) => (
        <Space size="middle">
          <a>修改分类</a>
          {parentId === "0" ? (
            <a onClick={() => showSubCategorys(category)}>查看子分类</a>
          ) : null}
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        parentId === "0" ? (
          "一级分类列表"
        ) : (
          <span>
            <a onClick={() => setParentId("0")}>一级分类列表</a>
            <ArrowRightOutlined style={{margin: '0 10px'}}/>
            <span>{parentName}</span>
          </span>
        )
      }
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          添加
        </Button>
      }
    >
      <Table
        bordered
        dataSource={categorys}
        columns={columns}
        rowKey="_id"
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        loading={loading}
      />
    </Card>
  );
}
