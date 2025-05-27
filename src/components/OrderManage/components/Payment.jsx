import { useState } from "react";
import {
  useGetPayments,
  useCreatePayment,
  useEditPayment,
  useDeletePayment,
} from "../../../api/hooks/useService";
import { Table, Button, message, Space, Typography, Card, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PaymentModal from "./PaymentModal";

const { Title } = Typography;

const Payment = () => {
  const { data: payments, isLoading } = useGetPayments();
  const createPayment = useCreatePayment();
  const editPayment = useEditPayment();
  const deletePayment = useDeletePayment();

  // console.log(payments)
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const openCreateModal = () => {
    setEditData(null);
    setModalVisible(true);
  };

  const openEditModal = (payment) => {
    setEditData(payment);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePayment.mutateAsync(id);
      message.success("Payment deleted successfully");
    } catch (err) {
      message.error(err?.response?.data?.message || "Delete failed");
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editData) {
        await editPayment.mutateAsync({
          paymentId: editData._id,
          paymentData: values,
        });
        message.success("Payment updated successfully");
      } else {
        await createPayment.mutateAsync(values);
        message.success("Payment created successfully");
      }
      setModalVisible(false);
    } catch (err) {
      message.error(err?.response?.data?.message || "Submit failed");
    }
    setSubmitting(false);
  };

  const columns = [
    {
      title: "Platform",
      dataIndex: "platform",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Username",
      dataIndex: "platformUserName",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
    },
    {
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => openEditModal(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(record._id)}
              size="small"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Card bordered={false} style={{ background: "#f9f9f9" }}>
        <div className="flex items-center justify-between mb-4">
          <Title level={3} style={{ margin: 0 }}>
            My Payment Methods
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Add New
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={payments?.data}
          rowKey="_id"
          loading={isLoading}
          bordered
          pagination={{ pageSize: 5 }}
          size="middle"
        />
      </Card>

      <PaymentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        initialData={editData}
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </div>
  );
};

export default Payment;
