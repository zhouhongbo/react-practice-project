import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { Card, Form, Input, Cascader, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { reqCategorys } from "../../api";
import PicturesWall from "./PicturesWall";
import RichTextEditor from "./RichTextEditor";
import { reqAddorUpdateProduct } from "../../api";

const Item = Form.Item;
const TextArea = Input.TextArea;

export default function ProductAdd(props) {
  const history = useHistory();
  const [form] = Form.useForm();

  const pwRef = useRef();
  const rteRef = useRef();

  const [options, setOptions] = useState([]);
  const [isUpdate, setIsupdate] = useState(props.location.state ? true : false);
  const [product, setProduct] = useState(
    props.location.state ? props.location.state.product : {}
  );

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

  const initOptions = async (categorys) => {
    const myOptions = categorys.map((item) => {
      return {
        value: item._id,
        label: item.name,
        isLeaf: false,
      };
    });

    // 二级分类商品修改时
    if (isUpdate && product.pCategoryId !== "0") {
      const subCategorys = await getCategorys(product.pCategoryId);
      const childOptions = subCategorys.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      const targetOption = myOptions.find(
        (option) => option.value === product.pCategoryId
      );
      targetOption.children = childOptions;
    }

    setOptions(myOptions);
  };

  const onFinish = async (values) => {
    // 收集数据
    const { name, desc, price, categoryIds } = values;
    let pCategoryId, categoryId;
    if (categoryIds.length === 1) {
      pCategoryId = "0";
      categoryId = categoryIds[0];
    } else {
      [pCategoryId, categoryId] = categoryIds;
    }
    const imgs = pwRef.current.getImgs();
    const detail = rteRef.current.getDetail();
    const newProduct = {
      name,
      desc,
      price,
      imgs,
      detail,
      pCategoryId,
      categoryId,
    };
    if (isUpdate) newProduct._id = product._id;

    // 发送请求
    const result = await reqAddorUpdateProduct(newProduct);
    if (result.status === 0) {
      message.success(isUpdate ? "更新成功" : "添加成功");
      history.goBack();
    } else {
      message.error(isUpdate ? "更新失败" : "添加失败");
    }
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

    setOptions([...options]);
  };

  const title = (
    <span>
      <a onClick={() => history.goBack()}>
        <ArrowLeftOutlined
          style={{ color: "green", marginRight: 15, fontSize: 20 }}
        />
      </a>
      <span>{isUpdate ? "修改商品" : "添加商品"}</span>
    </span>
  );

  const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 5 },
  };

  let initCategoryIds = [];
  if (isUpdate) {
    if (product.pCategoryId === "0") initCategoryIds = [product.categoryId];
    else initCategoryIds = [product.pCategoryId, product.categoryId];
  }

  return (
    <div>
      <Card title={title}>
        <Form {...layout} onFinish={onFinish} form={form}>
          <Item
            label="商品名称"
            name="name"
            initialValue={product.name}
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
            initialValue={product.desc}
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
            initialValue={product.price}
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
          <Item
            label="商品分类"
            name="categoryIds"
            initialValue={initCategoryIds}
            rules={[
              {
                required: true,
                message: "必须指定商品分类",
              },
            ]}
          >
            <Cascader options={options} loadData={loadData} />
          </Item>
          <Item label="商品图片">
            <PicturesWall ref={pwRef} imgs={product.imgs} />
          </Item>
          <Item label="商品详情" wrapperCol={{ span: 17 }}>
            <RichTextEditor ref={rteRef} detail={product.detail} />
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
