import { useState } from "react";
import { Button, Input, Modal, Form, Upload, message, Alert } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  useGetLanding,
  useCreateLanding,
  useEditLanding,
} from "../../api/hooks/useService";
import { HexColorPicker } from "react-colorful";

const LandingManagement = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const { data: landingData, isLoading, isError, error } = useGetLanding();
  const createLanding = useCreateLanding();
  const editLanding = useEditLanding();

  const landing = landingData?.data;

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("storeName", values.storeName);
    formData.append("colourCode", values.colourCode);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("landingImage", fileList[0].originFileObj);
    }

    const onSuccess = () => {
      message.success(landing ? "Landing updated." : "Landing created.");
      setModalVisible(false);
    };

    const onError = () => {
      message.error("Error saving landing.");
    };

    if (landing) {
      editLanding.mutate(
        { landingId: landing._id, landingData: formData },
        { onSuccess, onError }
      );
    } else {
      createLanding.mutate(formData, { onSuccess, onError });
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    if (landing) {
      form.setFieldsValue({
        storeName: landing.storeName,
        colourCode: landing.colourCode,
      });
      setFileList([
        {
          uid: "-1",
          name: "Current Image",
          status: "done",
          url: landing.image,
        },
      ]);
    } else {
      form.resetFields();
      setFileList([]);
    }
  };

  return (
    <div className="p-6 bg-neutral-900 rounded shadow-lg max-w-4xl mx-auto mt-10 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Landing Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenModal}
        >
          {landing ? "Edit Landing" : "Create Landing"}
        </Button>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading landing info...</p>
      ) : isError ? (
        <Alert
          message="Landing not found"
          description={
            error?.response?.data?.message || "Landing hasn't been created yet."
          }
          type="warning"
          showIcon
          className="mb-4"
        />
      ) : landing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fade-in">
          <div>
            <p className="mb-2 text-lg">
              <span className="font-semibold text-gray-300">Store Name:</span>{" "}
              <div className="main-font text-white font-semibold leading-tight md:leading-[1.1] tracking-tight max-w-full md:max-w-[80%] break-words md:text-left">
                {landing.storeName}
              </div>
            </p>
            <p className="mb-2 text-lg">
              <span className="font-semibold text-gray-300">Colour Code:</span>{" "}
              <span
                className="px-3 py-1 rounded shadow-md border"
                style={{
                  backgroundColor: landing.colourCode,
                  color: "#fff",
                }}
              >
                {landing.colourCode}
              </span>
            </p>
          </div>
          <img
            src={landing.image}
            alt="Landing Preview"
            className="w-full rounded-lg shadow border"
          />
        </div>
      ) : (
        <Alert
          message="No Landing Found"
          description="You haven't created a landing page yet. Click the 'Create Landing' button to get started."
          type="info"
          showIcon
          className="mb-4"
        />
      )}

      <Modal
        open={modalVisible}
        title={landing ? "Edit Landing" : "Create Landing"}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        okText={landing ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="storeName"
            label="Store Name"
            rules={[{ required: true, message: "Store name is required" }]}
          >
            <Input placeholder="Enter store name" />
          </Form.Item>

          <Form.Item
            name="colourCode"
            label="Primary Colour Code"
            rules={[
              { required: true, message: "Colour code is required" },
              {
                pattern: /^#([0-9A-F]{3}){1,2}$/i,
                message: "Enter a valid hex color (e.g., #000000)",
              },
            ]}
          >
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue, setFieldsValue }) => (
                <div className="flex flex-col gap-2">
                  <HexColorPicker
                    color={getFieldValue("colourCode") || "#000000"}
                    onChange={(color) => setFieldsValue({ colourCode: color })}
                  />
                  <Input
                    value={getFieldValue("colourCode")}
                    onChange={(e) =>
                      setFieldsValue({ colourCode: e.target.value })
                    }
                    placeholder="#000000"
                  />
                </div>
              )}
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="Upload Image"
            required={!landing}
            help={!landing ? "Image is required" : ""}
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LandingManagement;
