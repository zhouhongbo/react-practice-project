import React, { useState, useEffect } from "react";
import { Card, Table, Button, Space, Modal, message } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";

import { reqCategorys, reqUpdateCategory } from "../../api";
import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";

export default function Category() {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parentId, setParentId] = useState("0");
  const [parentName, setParentName] = useState("");
  const [showStatus, setShowStatus] = useState(0); // 标识显示的对话框，0都不显示，1显示添加，2显示更新
  const [category, setCategory] = useState("");
  const [updateForm, setUpdateForm] = useState();

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

  const showUpdate = (category) => {
    setShowStatus(2);
    setCategory(category);
  };

  const addCategory = () => {
    setShowStatus(0);
  };

  const getUpdateForm = (form) => {
    setUpdateForm(form);
  };

  const updateCategory = async () => {
    setShowStatus(0);

    let categoryName = updateForm.getFieldValue("categoryName");
    const result = await reqUpdateCategory(category._id, categoryName);

    if (result.status === 0) {
      getCategorys();
    }

    updateForm.resetFields();
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
          <a onClick={() => showUpdate(category)}>修改分类</a>
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
            <ArrowRightOutlined style={{ margin: "0 10px" }} />
            <span>{parentName}</span>
          </span>
        )
      }
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowStatus(1)}
        >
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
      <Modal
        title="添加分类"
        visible={showStatus === 1}
        onOk={addCategory}
        onCancel={() => setShowStatus(0)}
      >
        <AddForm />
      </Modal>
      <Modal
        title="修改分类"
        visible={showStatus === 2}
        onOk={updateCategory}
        onCancel={() => {
          setShowStatus(0);
          updateForm.resetFields();
        }}
      >
        <UpdateForm
          categoryName={category.name}
          getUpdateForm={getUpdateForm}
        />
      </Modal>
    </Card>
  );
}
