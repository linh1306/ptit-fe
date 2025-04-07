'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ISubject } from '@app/type/schema.type';
import subjectApi from '@app/api/subject.api';
import useApiMutation from '@app/hooks/useApiMutation.hook';
import usePaginationParam from '@app/hooks/usePaginationParams.hook';
import { useRouter } from 'next/navigation';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const SubjectManagementPage = () => {
  const router = useRouter();

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSubject, setEditingSubject] = useState<ISubject | null>(null);
  const { pagination, onChange: onChangePagination, setPagination } = usePaginationParam()
  const { data: subjects, mutate: getSubjects } = useApiMutation(subjectApi.getSubjects, {
    setQueryData: {
      queryKey: ["subjects"]
    },
    onSuccess: (data) => {
      setPagination(data.metadata ?? pagination);
    }
  });

  const { mutate: createSubject } = useApiMutation(subjectApi.createSubject, {
    onSuccess: () => {
      message.success('Tạo môn học thành công');
      getSubjects({});
      setIsModalVisible(false);
      form.resetFields();
    },
  });

  const { mutate: updateSubject } = useApiMutation(subjectApi.updateSubject, {
    onSuccess: () => {
      message.success('Cập nhật môn học thành công');
      getSubjects({});
      setIsModalVisible(false);
      setEditingSubject(null);
      form.resetFields();
    },
  });

  const { mutate: deleteSubject } = useApiMutation(subjectApi.deleteSubject, {
    onSuccess: () => {
      message.success('Xóa môn học thành công');
      getSubjects({});
    },
  });

  const handleDelete = (id: string) => {
    deleteSubject({ pathIds: [id] });
  };

  const columns: ColumnsType<ISubject> = [
    {
      title: "STT",
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Mã môn học',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên môn học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              setEditingSubject(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          />

          <DeleteOutlined
            onClick={() => {
              Modal.confirm({
                title: 'Xác nhận xóa môn học?',
                content: 'Bạn có chắc chắn muốn xóa môn học này?',
                onOk: () => handleDelete(record.id),
              });
            }}
          />
        </Space>
      ),
    },
  ];

  const handleSubmit = (values: any) => {
    if (editingSubject) {
      updateSubject({ pathIds: [editingSubject.id], body: values });
    } else {
      createSubject({ body: values });
    }
  };


  useEffect(() => {
    getSubjects({ pagination });
  }, [pagination.page, pagination.pageSize]);

  const handleRowClick = (record: ISubject) => {
    router.push(`/admin/subjects/${record.id}`);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý môn học</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingSubject(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Thêm môn học
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={subjects}
        columns={columns}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={false}
      />
      <Pagination
        align="end"
        defaultCurrent={pagination.page}
        total={pagination.total}
        onChange={onChangePagination}
      />
      <Modal
        title={editingSubject ? 'Sửa môn học' : 'Thêm môn học'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingSubject(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="code"
            label="Mã môn học"
            rules={[{ required: true, message: 'Vui lòng nhập mã môn học' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="name"
            label="Tên môn học"
            rules={[{ required: true, message: 'Vui lòng nhập tên môn học' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                {editingSubject ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubjectManagementPage; 