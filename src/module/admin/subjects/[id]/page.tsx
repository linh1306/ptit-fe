"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Select,
  Card,
  Typography,
  Pagination,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { ILesson, TLesson } from "@app/type/schema.type";
import subjectApi from "@app/api/subject.api";
import usePaginationParam from "@app/hooks/usePaginationParams.hook";
import lessonApi from "@app/api/lesson.api";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import useAppMutation from "@app/hooks/useAppMutation.hook";

const { Title } = Typography;
const { Option } = Select;

interface SubjectLessonManagementProps {
  params: {
    id: string;
  };
}

const SubjectLessonManagementPage = ({
  params,
}: SubjectLessonManagementProps) => {
  const subjectId = params.id;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingLesson, setEditingLesson] = useState<ILesson | null>(null);

  const {
    pagination,
    paginationQuery,
    onChangePagination,
    setPagination,
  } = usePaginationParam();
  const { data: subject, isLoading: isLoadingSubject } = useAppQuery(
    subjectApi.getSubjectById,
    {
      queryKey: ["subjects", subjectId],
      variables: {
        pathIds: [subjectId],
      },
    }
  );
  const {
    data: lessons,
    refetch,
    isLoading: isLoadingLessons,
  } = useAppQuery(subjectApi.getLessons, {
    queryKey: ["subjects", subjectId, "lessons"],
    variables: {
      pathIds: [subjectId],
      pagination: paginationQuery,
    },
    onSuccess: (data) => {
      setPagination(data.metadata ?? pagination);
    },
  });

  const { mutate: createLesson } = useAppMutation(subjectApi.createLesson, {
    onSuccess: () => {
      message.success("Tạo bài học thành công");
      refetch();
      setIsModalVisible(false);
      form.resetFields();
    },
  });

  // Cập nhật bài học
  const { mutate: updateLesson } = useAppMutation(lessonApi.updateLesson, {
    onSuccess: () => {
      message.success("Cập nhật bài học thành công");
      refetch();
      setIsModalVisible(false);
      setEditingLesson(null);
      form.resetFields();
    },
  });

  // Xóa bài học
  const { mutate: deleteLesson } = useAppMutation(lessonApi.deleteLesson, {
    onSuccess: () => {
      message.success("Xóa bài học thành công");
      refetch();
    },
  });

  const handleDelete = (lessonId: string) => {
    Modal.confirm({
      title: "Xác nhận xóa bài học",
      content: "Bạn có chắc chắn muốn xóa bài học này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        deleteLesson({ pathIds: [lessonId] });
      },
    });
  };

  const handleSubmit = (values: any) => {
    if (editingLesson) {
      updateLesson({ pathIds: [editingLesson.id], body: values });
    } else {
      createLesson({ pathIds: [subjectId], body: values });
    }
  };

  const getLessonTypeText = (type: TLesson) => {
    const types: { [key in TLesson]: string } = {
      document: "Tài liệu",
      multiple_choice: "Trắc nghiệm",
    };
    return types[type] || type;
  };

  const getLessonIcon = (type: TLesson) => {
    switch (type) {
      case "document":
        return <FileTextOutlined style={{ color: "#1890ff" }} />;
      case "multiple_choice":
        return <FormOutlined style={{ color: "#fa8c16" }} />;
      default:
        return <FileTextOutlined />;
    }
  };

  const columns: ColumnsType<ILesson> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên bài học",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center">
          {getLessonIcon(record.type)}
          <span className="ml-2">{text}</span>
        </div>
      ),
    },
    {
      title: "Loại bài học",
      dataIndex: "type",
      key: "type",
      width: 150,
      render: (type) => getLessonTypeText(type as TLesson),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingLesson(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const isLoading = isLoadingSubject || isLoadingLessons;

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <Title level={4}>{subject?.name}</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingLesson(null);
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            Thêm bài học
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={lessons}
          rowKey="id"
          loading={isLoading}
          pagination={false}
        />

        <Pagination
          align="end"
          defaultCurrent={pagination.page}
          total={pagination.total}
          onChange={onChangePagination}
        />
      </Card>

      <Modal
        title={editingLesson ? "Sửa bài học" : "Thêm bài học mới"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingLesson(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Tên bài học"
            rules={[{ required: true, message: "Vui lòng nhập tên bài học" }]}
          >
            <Input />
          </Form.Item>

          {!editingLesson && (
            <Form.Item
              name="type"
              label="Loại bài học"
              rules={[
                { required: true, message: "Vui lòng chọn loại bài học" },
              ]}
            >
              <Select placeholder="Chọn loại bài học">
                <Option value="document">Tài liệu</Option>
                <Option value="multiple_choice">Trắc nghiệm</Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                {editingLesson ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubjectLessonManagementPage;
