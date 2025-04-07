"use client";

import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Space, Modal, Select, message, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IUser, ROLE, TStatusUser } from "@app/type/schema.type";
import userApi from "@app/api/user.api";
import useApiMutation from "@app/hooks/useApiMutation.hook";
import usePaginationParam from "@app/hooks/usePaginationParams.hook";

const UserManagementPage = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState<TStatusUser>(TStatusUser.pending);
  const [newRole, setNewRole] = useState<ROLE>(ROLE.user);
  const { pagination, onChange:onChangePagination, setPagination } = usePaginationParam()
  const { data: users, mutate: findUser, isLoading } = useApiMutation(userApi.findUser, {
    setQueryData: {
      queryKey: ["users"]
    },
    onSuccess: (data) => {
      setPagination(data.metadata ?? pagination);
    }
  });

  const {  isLoading: updateStatusLoading } = useApiMutation(userApi.updateUserStatus, {
    onSuccess: () => {
      message.success("Cập nhật trạng thái thành công");
      findUser({});
    },
  });

  const {  isLoading: updateRoleLoading } = useApiMutation(userApi.updateUserRole, {
    onSuccess: () => {
      message.success("Cập nhật vai trò thành công");
      findUser({});
    },
  });

  const handleOpenModal = (user: IUser) => {
    setSelectedUser(user);
    setNewStatus(user.status);
    setNewRole(user.role);
    setIsModalVisible(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedUser) return;

    // let hasSuccess = false;

    // if (newStatus !== selectedUser.status) {
    //   await updateStatus({
    //     body: {
    //       userId: selectedUser.id,
    //       status: newStatus,
    //     }
    //   });
    //   hasSuccess = true;
    // }

    // if (newRole !== selectedUser.role) {
    //   await updateRoleMutation.mutateAsync({
    //     userId: selectedUser.id,
    //     role: newRole,
    //   });
    //   hasSuccess = true;
    // }

    // if (!hasSuccess) {
    //   message.info("Không có thay đổi nào được thực hiện");
    // }

    setIsModalVisible(false);
  };

  const columns: ColumnsType<IUser> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => (pagination.page-1) * pagination.pageSize + index + 1,
    },
    {
      title: "Mã sinh viên",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          color={
            role === "admin" ? "blue" : role === "superAdmin" ? "red" : "green"
          }
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "active"
              ? "success"
              : status === "inactive"
                ? "error"
                : "warning"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleOpenModal(record)}>
            Chỉnh sửa
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    findUser({ pagination });
  }, [pagination.page, pagination.pageSize]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>

      <Table pagination={false} loading={isLoading} columns={columns} dataSource={users} rowKey="id" />
      <Pagination
        align="end"
        defaultCurrent={pagination.page}
        total={pagination.total}
        onChange={onChangePagination}
      />

      <Modal
        title="Chỉnh sửa người dùng"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={
              updateStatusLoading || updateRoleLoading
            }
            onClick={handleSaveChanges}
          >
            Lưu thay đổi
          </Button>,
        ]}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Trạng thái</label>
              <Select
                value={newStatus}
                style={{ width: "100%" }}
                onChange={(value) => setNewStatus(value)}
              >
                <Select.Option value="active">Hoạt động</Select.Option>
                <Select.Option value="inactive">Vô hiệu hóa</Select.Option>
                <Select.Option value="pending">Chờ duyệt</Select.Option>
              </Select>
            </div>

            <div>
              <label className="block mb-2">Vai trò</label>
              <Select
                value={newRole}
                style={{ width: "100%" }}
                onChange={(value) => setNewRole(value)}
              >
                <Select.Option value="user">Người dùng</Select.Option>
                <Select.Option value="admin">Quản trị viên</Select.Option>
                <Select.Option value="superAdmin">Super Admin</Select.Option>
              </Select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagementPage;
