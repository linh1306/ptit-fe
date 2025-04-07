"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, List, Typography, Skeleton, Empty, Space } from "antd";
import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons";
import useApiMutation from "@app/hooks/useApiMutation.hook";
import subjectApi from "@app/api/subject.api";
import Image from "next/image";

const { Title, Paragraph, Text } = Typography;

const SubjectsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { data: subjects, mutate: getSubjects } = useApiMutation(subjectApi.getSubjects, {
    setQueryData: {
      queryKey: ["subjects"]
    },
    onSuccess: () => setLoading(false),
    onError: () => setLoading(false)
  });

  useEffect(() => {
    getSubjects({});
  }, []);

  const handleSubjectSelect = (subjectId: string) => {
    router.push(`/subjects/${subjectId}`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, index) => (
          <Card key={index} className="shadow-md rounded-lg">
            <Skeleton active />
          </Card>
        ))}
      </div>
    );
  }

  if (!subjects || subjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Empty description={
          <Space direction="vertical" size="small" className="text-center">
            <Text strong>Không có môn học nào</Text>
            <Text type="secondary">Vui lòng kiểm tra lại sau hoặc liên hệ với quản trị viên.</Text>
          </Space>
        } />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Title level={2} className="mb-6">Danh sách môn học</Title>
      <List
        className="w-full"
        grid={{ gutter: 16, column: 4 }}
        dataSource={subjects}
        renderItem={(subject) => (
          <List.Item key={subject.id}>
            <Card
              hoverable
              cover={
                <div className="h-48 overflow-hidden">
                  <Image
                    src={'/thum.jpg'}
                    alt={subject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              }
              className="w-full shadow-md rounded-lg"
              onClick={() => handleSubjectSelect(subject.id)}
            >
              <Card.Meta
                title={subject.name}
                description={
                  <Space direction="vertical" size="small" className="w-full">
                    <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                      {`Mã môn học: ${subject.code}`}
                    </Paragraph>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <Text className="flex items-center gap-1"><ClockCircleOutlined /> 3 tín chỉ</Text>
                      <Text className="flex items-center gap-1"><BookOutlined /> 8 bài học</Text>
                    </div>
                  </Space>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SubjectsPage;
