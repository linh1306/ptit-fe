"use client";

import React from "react";
import { Card, Empty, List, Tag, Typography } from "antd";
import { ILesson } from "@app/type/schema.type";
import subjectApi from "@app/api/subject.api";
import { useRouter } from "next/navigation";
import {
  FileTextOutlined,
  VideoCameraOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Loading } from "@app/components/loading";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import ContainerApp from "@app/components/container";

const { Text } = Typography;

interface SubjectDetailPageProps {
  params: {
    id: string;
  };
}

const SubjectDetailPage = ({ params }: SubjectDetailPageProps) => {
  const router = useRouter();
  const subjectId = params.id;

  const { data: subject, isLoading } = useAppQuery(subjectApi.getSubjectById, {
    queryKey: ["subjects", subjectId],
    variables: { pathIds: [subjectId] },
  });

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
    <ContainerApp isShowBack title={subject?.name}>
      <List
        dataSource={subject?.lessons}
        className="shadow-sm"
        itemLayout="horizontal"
        bordered={false}
        renderItem={(lesson: ILesson, index) => (
          <List.Item key={lesson.id}>
            <Card
              hoverable
              className="w-full block-style hover:border-blue-300 transition-colors"
              onClick={() => router.push(`/lessons/${lesson.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                    {getLessonIcon(lesson.type)}
                  </div>
                  <div>
                    <Text strong className="text-base">
                      {lesson.name}
                    </Text>
                    <div className="mt-1">
                      <Tag color={getTagColor(lesson.type)}>
                        {getLessonTypeText(lesson.type)}
                      </Tag>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Text className="text-sm text-gray-500">Bài {index + 1}</Text>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </ContainerApp>
  );
};

export default SubjectDetailPage;
