import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Card, Form, Input, Cascader, Upload, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { reqCategorys } from "../../api";

const Item = Form.Item;
const TextArea = Input.TextArea;

const layout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 5 },
};

export default function ProductAdd() {
  const history = useHistory();

  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    getCategorys("0");
  }, []);

  const getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId);
    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === "0") {
        initOptions(categorys);
      } else {
        return categorys;
      }
    }
  };

  const initOptions = (categorys) => {
    const myOptions = categorys.map((item) => {
      return {
        value: item._id,
        label: item.name,
        isLeaf: false,
      };
    });
    setOptions(myOptions);
  };

  const onFinish = (values) => {
    // console.log(values);
  };

  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // 根据选中的分类，获取下一级分类列表
    const subCategorys = await getCategorys(targetOption.value);
    targetOption.loading = false;

    if (subCategorys && subCategorys.length > 0) {
      targetOption.children = subCategorys.map((item) => ({
        value: item._id,
        label: item.name,
      }));
    } else {
      targetOption.isLeaf = true;
    }
  };

  const onChange = (value, selectedOptions) => {
    // console.log(value, selectedOptions);
  };

  const title = (
    <span>
      <a onClick={() => history.goBack()}>
        <ArrowLeftOutlined
          style={{ color: "green", marginRight: 15, fontSize: 20 }}
        />
      </a>
      <span>添加商品</span>
    </span>
  );

  return (
    <div>
      <Card title={title}>
        <Form {...layout} onFinish={onFinish}>
          <Item
            label="商品名称"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入商品名称",
              },
            ]}
          >
            <Input />
          </Item>
          <Item
            label="商品描述"
            name="desc"
            rules={[
              {
                required: true,
                message: "请输入商品描述",
              },
            ]}
          >
            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Item>
          <Item
            label="商品价格"
            name="price"
            rules={[
              {
                required: true,
                message: "请输入商品价格",
              },
              {
                validator: (_, value) => {
                  if (value < 0)
                    return Promise.reject(new Error("价格不能为负数"));
                  if (value.toString().split(".")[1]) {
                    if (value.toString().split(".")[1].length > 2)
                      return Promise.reject(
                        new Error("不能使用比角更小的价格")
                      );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input type="number" addonAfter="元" />
          </Item>
          <Item label="商品分类">
            <Cascader
              options={options}
              loadData={loadData}
              onChange={onChange}
              changeOnSelect
            />
          </Item>
          <Item label="商品图片">
            <div></div>
          </Item>
          <Item label="商品详情">
            <div></div>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    </div>
  );
}
