"use client";

import ContainerApp from "@app/components/container";
import { Button, Pagination, Table } from "antd";
import { useAppModal } from "@app/hooks/useAppModal.hook";
import { usePaginationParam } from "@app/hooks/usePaginationParams.hook";
import { columns } from "./table";
import { useMemo } from "react";
import { createColumns } from "@app/common";
import { INotification } from "@app/type/schema.type";
import modals from "./modal";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import notificationApi from "@app/api/notification.api";

export default function NotificationManagementPage() {
  const modal = useAppModal(modals);
  const { pagination, paginationQuery, onChangePagination, setPagination } =
    usePaginationParam();

  const {
    data: notifications,
    isLoading,
    refetch,
  } = useAppQuery(notificationApi.adminGetNotification, {
    queryKey: ["adminGetNotification"],
    variables: {
      pagination: paginationQuery,
    },
    onSuccess: (data) => {
      setPagination(data.metadata ?? pagination);
    },
  });

  const handleClickCreate = () => {
    modal.createNotification({});
  };

  const columnsTable = useMemo(() => {
    return createColumns<INotification>(columns, {
      pagination,
      onEdit: handleClickCreate,
    });
  }, [columns, pagination, handleClickCreate]);

  return (
    <ContainerApp
      title="Quản lý thông báo"
      suffix={
        <Button type="primary" onClick={handleClickCreate}>
          Thêm thông báo
        </Button>
      }
    >
      <Table
        pagination={false}
        loading={isLoading}
        columns={columnsTable}
        dataSource={notifications}
        rowKey="id"
      />
      <Pagination
        align="end"
        defaultCurrent={pagination.page}
        total={pagination.total}
        onChange={onChangePagination}
      />
    </ContainerApp>
  );
}
