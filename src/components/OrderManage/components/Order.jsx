import { useState } from "react";
import {
  Table,
  Tag,
  Select,
  Popconfirm,
  message,
  Typography,
  Card,
  Tooltip,
  Space,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useUpdateOrder,
  useGetOrders,
  useDeleteOrder,
} from "../../../api/hooks/useOrder";
import { Modal, Image } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const progressColors = {
  pending: "orange",
  accepted: "blue",
  declined: "red",
  done: "green",
};

const Order = () => {
  const { data: orders, isLoading } = useGetOrders();
  const deleteOrder = useDeleteOrder();
  const updateOrder = useUpdateOrder();
  const [updatingId, setUpdatingId] = useState(null);
  console.log(orders);
  const handleProgressChange = async (id, value) => {
    try {
      setUpdatingId(id);
      await updateOrder.mutateAsync({
        orderId: id,
        orderData: { progress: value },
      });
      message.success("Order progress updated.");
    } catch {
      message.error("Failed to update order.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder.mutateAsync(id);
      message.success("Order deleted.");
    } catch {
      message.error("Failed to delete order.");
    }
  };

  const columns = [
    {
      title: "Products",
      dataIndex: "products",
      render: (products) => (
        <Space direction="vertical">
          {products.map((item, idx) => (
            <Text key={idx}>
              • <strong>{item.productId?.name}</strong> × {item.quantity}
            </Text>
          ))}
        </Space>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      render: (value) => (
        <Text strong style={{ color: "#1890ff" }}>
          Ks {value.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Contact",
      render: (_, record) => (
        <Space direction="vertical">
          <Text>{record.phonePrimary}</Text>
          {record.phoneSecondary && (
            <Text type="secondary">{record.phoneSecondary}</Text>
          )}
        </Space>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text) => (
        <Text ellipsis={{ tooltip: text }} style={{ maxWidth: 180 }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Payment",
      render: (_, record) => (
        <Space direction="vertical">
          <Tag color={record.paymentType === "COD" ? "default" : "cyan"}>
            {record.paymentType}
          </Tag>

          {record.paymentType === "prepaid" && record.transactionScreenshot && (
            <>
              <Tooltip title="View Screenshot">
                <span style={{ display: "inline-block" }}>
                  <Image
                    src={record.transactionScreenshot}
                    width={60}
                    height={60}
                    style={{
                      objectFit: "cover",
                      borderRadius: 8,
                      border: "1px solid #eee",
                    }}
                    preview={false}
                    alt="Screenshot"
                    onClick={() => {
                      setPreviewSrc(record.transactionScreenshot);
                      setPreviewVisible(true);
                    }}
                  />
                </span>
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
    {
      title: "Progress",
      dataIndex: "progress",
      render: (progress, record) => (
        <Select
          value={progress}
          size="middle"
          variant="borderless" // ✅ Fix deprecated warning
          loading={updatingId === record._id}
          onChange={(value) => handleProgressChange(record._id, value)}
          style={{
            width: 160,
            borderRadius: 8,
            background: "#f4f4f5",
            fontWeight: 500,
          }}
          dropdownStyle={{ borderRadius: 8 }}
        >
          {Object.keys(progressColors).map((status) => (
            <Option key={status} value={status}>
              <Tag
                color={progressColors[status]}
                style={{
                  paddingInline: 12,
                  borderRadius: 16,
                  fontSize: 13,
                  textTransform: "capitalize",
                }}
              >
                {status}
              </Tag>
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this order?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip title="Delete Order">
            <DeleteOutlined
              style={{ color: "red", fontSize: 16, cursor: "pointer" }}
            />
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  // Inside your component:
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Card
        bordered={false}
        style={{
          background: "#ffffff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Title level={3} className="mb-6 text-center">
          🧾 Orders Overview
        </Title>

        {/* ⚠️ Warning Note */}
        <div
          style={{
            background: "#fffbe6",
            border: "1px solid #ffe58f",
            padding: "12px 16px",
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <Text strong style={{ color: "#ad6800" }}>
            ⚠️ Be careful when setting an order to <Tag color="green">done</Tag>
            .
          </Text>
          <div style={{ fontSize: 13, marginTop: 4, color: "#ad6800" }}>
            Once marked as <strong>done</strong>, the order cannot be edited or
            deleted, and the stock count will be reduced.
          </div>
        </div>

        <Table
          rowKey="_id"
          columns={columns}
          dataSource={orders?.data || []}
          loading={isLoading}
          bordered
          pagination={{ pageSize: 6 }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={800}
        centered
      >
        <img
          alt="Transaction Screenshot"
          style={{ width: "100%", borderRadius: 8 }}
          src={previewSrc}
        />
      </Modal>
    </div>
  );
};

export default Order;
