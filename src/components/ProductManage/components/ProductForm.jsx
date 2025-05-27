/* eslint-disable react/prop-types */
// File: ProductForm.js
import {
  Form,
  Input,
  Select as AntSelect,
  Upload,
  Button,
  message,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  useEditProduct,
  useCreateProduct,
} from "../../../api/hooks/useProdPkg";
import { useGetCategory } from "../../../api/hooks/useService";

const ProductForm = ({
  modalType,
  editingProduct,
  fileList,
  setFileList,
  setModalVisible,
}) => {
  const [form] = Form.useForm();
  const editProduct = useEditProduct();
  const addProduct = useCreateProduct();
  const { data: categoryData } = useGetCategory(1, 100);
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    if (modalType === "edit" && editingProduct) {
      form.setFieldsValue({
        name: editingProduct.name,
        discountPrice: editingProduct.discountPrice,
        salePrice: editingProduct.price,
        stockCount: editingProduct.stockCount,
        description: editingProduct.description,
        categoryId: editingProduct.category?._id || "",
      });

      setFileList(
        editingProduct.images.map((url, index) => ({
          uid: index,
          name: `image-${index}`,
          url,
          status: "done",
        }))
      );
    } else {
      form.setFieldsValue({
        discountPrice: 0,
      });
      form.resetFields();
      setFileList([]);
      setDeletedImages([]);
    }
  }, [modalType, editingProduct, form, setFileList]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("discountPrice", values.discountPrice);
        formData.append("description", values.description);
        formData.append("category", values.categoryId);
        formData.append("price", values.salePrice);
        formData.append("stockCount", values.stockCount);

        fileList.forEach((file) => {
          if (file.originFileObj) {
            formData.append("productImage", file.originFileObj);
          }
        });

        formData.append("deletedImages", JSON.stringify(deletedImages));

        if (modalType === "edit" && editingProduct) {
          editProduct.mutate(
            { productId: editingProduct._id, productData: formData },
            {
              onSuccess: () => {
                message.success("Product updated successfully");
                setModalVisible(false);
              },
              onError: (err) => {
                message.error(`Error: ${err.message}`);
              },
            }
          );
        } else {
          addProduct.mutate(formData, {
            onSuccess: () => {
              message.success("Product added successfully");
              form.resetFields();
              setFileList([]);
              setDeletedImages([]);
              setModalVisible(false);
            },
            onError: (err) => {
              message.error(`Error: ${err.message}`);
            },
          });
        }
      })
      .catch((info) => {
        message.error("Validation Failed:", info);
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSave}
      initialValues={{
        discountPrice: 0,
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <AntSelect placeholder="Select category" optionLabelProp="label">
              {categoryData?.data?.map((cat) => (
                <AntSelect.Option
                  key={cat._id}
                  value={cat._id}
                  label={`${cat.name} - ${cat.description}`}
                >
                  {cat.name} - {cat.description}
                </AntSelect.Option>
              ))}
            </AntSelect>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="discountPrice" label="Discount Price">
            <Input type="number" placeholder="1000" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="salePrice"
            label="Sale Price"
            rules={[
              { required: true, message: "Please input the sale price!" },
            ]}
          >
            <Input type="number" placeholder="3000" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="stockCount"
            label="Stock Count"
            rules={[
              { required: true, message: "Please input the stock count!" },
            ]}
          >
            <Input type="number" placeholder="e.g. 20" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input.TextArea
          placeholder="Write product description here..."
          rows={4}
        />
      </Form.Item>

      <Form.Item label="Product Images">
        <Upload
          listType="picture"
          fileList={fileList}
          onChange={({ fileList: newFileList }) => {
            if (newFileList.length > 5) {
              message.warning("You can upload a maximum of 5 images.");
              return;
            }
            setFileList(newFileList);
          }}
          onRemove={(file) => {
            if (file.url) {
              setDeletedImages((prev) => [...prev, file.url]);
            }
          }}
          beforeUpload={(file, fileListToAdd) => {
            const total = fileList.length + fileListToAdd.length;
            if (total > 5) {
              message.error("You can upload up to 5 images only.");
              return Upload.LIST_IGNORE;
            }
            return false; // prevent automatic upload
          }}
          multiple
        >
          {fileList.length < 5 && (
            <Button icon={<UploadOutlined />}>Upload</Button>
          )}
        </Upload>
        <div style={{ marginTop: "8px", color: "#999" }}>
          You can upload up to 5 product images.
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {modalType === "edit" ? "Save Product" : "Add Product"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
