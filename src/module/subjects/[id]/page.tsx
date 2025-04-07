"use client";

import React, { useEffect } from "react";
import { Card, List, Tag, Typography } from "antd";
import { ILesson } from "@app/type/schema.type";
import subjectApi from "@app/api/subject.api";
import { useRouter } from "next/navigation";
import {
  FileTextOutlined,
  VideoCameraOutlined,
  FormOutlined,
  BorderOuterOutlined,
} from "@ant-design/icons";
import useApiMutation from "@app/hooks/useApiMutation.hook";
import { Loading } from "@app/components/loading";

const { Title, Text } = Typography;

interface SubjectDetailPageProps {
  params: {
    id: string;
  };
}

const SubjectDetailPage = ({ params }: SubjectDetailPageProps) => {
  const router = useRouter();
  const subjectId = params.id;

  const { data: subject, mutate: getSubjectById, isLoading } = useApiMutation(subjectApi.getSubjectById, {
    setQueryData: {
      queryKey: ["subjects"]
    }
  });

  useEffect(() => {
    getSubjectById({ pathIds: [subjectId] });
  }, [subjectId]);

  if (isLoading) {
    return <Loading />;
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileTextOutlined className="text-blue-500 text-lg" />;
      case "video":
        return <VideoCameraOutlined className="text-green-500 text-lg" />;
      case "quiz":
        return <FormOutlined className="text-orange-500 text-lg" />;
      default:
        return <FileTextOutlined className="text-blue-500 text-lg" />;
    }
  };

  const getLessonTypeText = (type: string) => {
    const types: { [key: string]: string } = {
      document: "Tài liệu",
      video: "Video",
      quiz: "Trắc nghiệm",
    };
    return types[type] || type;
  };

  const getTagColor = (type: string) => {
    const colors: { [key: string]: string } = {
      document: "blue",
      video: "green",
      quiz: "orange",
    };
    return colors[type] || "default";
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      <div className="mb-4">
        <Title level={4} className="flex items-center gap-2">
          <BorderOuterOutlined className="text-primary" />[{subject?.code}]-{subject?.name}
        </Title>
      </div>

      <List
        dataSource={subject?.lessons}
        className="shadow-sm"
        itemLayout="horizontal"
        renderItem={(lesson: ILesson, index) => (
          <List.Item>
            <Card
              hoverable
              className="w-full border border-gray-200 hover:border-blue-300 transition-colors"
              onClick={() => router.push(`/lessons/${lesson.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                    {getLessonIcon(lesson.type)}
                  </div>
                  <div>
                    <Text strong className="text-base">{lesson.name}</Text>
                    <div className="mt-1">
                      <Tag color={getTagColor(lesson.type)}>
                        {getLessonTypeText(lesson.type)}
                      </Tag>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Text className="text-sm text-gray-500">
                    Bài {index + 1}
                  </Text>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
        locale={{ emptyText: "Chưa có bài học nào" }}
      />
    </div>
  );
};

export default SubjectDetailPage;