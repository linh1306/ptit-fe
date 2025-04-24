"use client";

import { Table, Pagination } from "antd";
import { IUser } from "@app/type/schema.type";
import userApi from "@app/api/user.api";
import usePaginationParam from "@app/hooks/usePaginationParams.hook";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import modals from "./modal";
import { useAppModal } from "@app/hooks/useAppModal.hook";
import { columns } from "./table";
import { createColumns } from "@app/common";
import { useMemo } from "react";

const UserManagementPage = () => {
  const modal = useAppModal(modals);
  const { pagination, paginationQuery, onChangePagination, setPagination } =
    usePaginationParam();

  const {
    data: users,
    isLoading,
    refetch,
  } = useAppQuery(userApi.findUser, {
    queryKey: ["users"],
    variables: {
      pagination: paginationQuery,
    },
    onSuccess: (data) => {
      setPagination(data.metadata ?? pagination);
    },
  });


  const handleOpenModal = (user: IUser) => {
    modal.updateUser({ user, onSuccess: refetch });
  };

  const columnsTable = useMemo(() => {
    return createColumns<IUser>(columns, { pagination, onEdit: handleOpenModal });
  }, [columns, pagination, handleOpenModal]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>

      <Table
        pagination={false}
        loading={isLoading}
        columns={columnsTable}
        dataSource={users}
        rowKey="id"
      />
      <Pagination
        align="end"
        defaultCurrent={pagination.page}
        total={pagination.total}
        onChange={onChangePagination}
      />
    </div>
  );
};

export default UserManagementPage;
