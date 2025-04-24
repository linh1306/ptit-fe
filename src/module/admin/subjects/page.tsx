"use client";

import React, { useMemo } from "react";
import { Table, Button, Modal, Pagination } from "antd";
import { ISubject } from "@app/type/schema.type";
import subjectApi from "@app/api/subject.api";
import usePaginationParam from "@app/hooks/usePaginationParams.hook";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import useAppMutation from "@app/hooks/useAppMutation.hook";
import { createColumns, createToast } from "@app/common";
import { columns } from "./table";
import { useAppModal } from "@app/hooks/useAppModal.hook";
import modals from "./modal";

const SubjectManagementPage = () => {
  const modal = useAppModal(modals);
  const { pagination, onChangePagination, setPagination } =
    usePaginationParam();

  const { data: subjects, refetch } = useAppQuery(subjectApi.getSubjects, {
    queryKey: ["subjects"],
    onSuccess: (data) => {
      setPagination(data.metadata ?? pagination);
    },
  });

  const { mutate: deleteSubject } = useAppMutation(subjectApi.deleteSubject, {
    onSuccess: () => {
      createToast("success", "Xóa môn học thành công");
      refetch();
    },
  });

  const handleClickUpdate = (subject: ISubject) => {
    modal.updateSubject({ subject });
  };

  const handleClickCreate = () => {
    modal.createSubjects({});
  };

  const handleClickDelete = (record: ISubject) => {
    Modal.confirm({
      title: "Xác nhận xóa môn học?",
      content: "Bạn có chắc chắn muốn xóa môn học này?",
      onOk: () => deleteSubject({ pathIds: [record.id] }),
    });
  };

  const columnsTable = useMemo(() => {
    return createColumns<ISubject>(columns, {
      pagination,
      onEdit: handleClickUpdate,
      onDelete: handleClickDelete,
    });
  }, [columns, pagination, handleClickUpdate, handleClickDelete]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý môn học</h1>
        <Button
          type="primary"
          onClick={() => {
            handleClickCreate();
          }}
        >
          Thêm môn học
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={subjects}
        columns={columnsTable}
        pagination={false}
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

export default SubjectManagementPage;
