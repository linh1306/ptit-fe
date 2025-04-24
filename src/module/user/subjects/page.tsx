"use client";

import { useRouter } from "next/navigation";
import { Card, List, Typography, Space } from "antd";
import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons";
import subjectApi from "@app/api/subject.api";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import { Loading } from "@app/components/loading";
import ContainerApp from "@app/components/container";

const { Text } = Typography;

const SubjectsPage = () => {
  const router = useRouter();

  const { data: subjects, isLoading } = useAppQuery(subjectApi.getSubjects, {
    queryKey: ["subjects"],
  });

  const handleSubjectSelect = (subjectId: string) => {
    router.push(`/subjects/${subjectId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ContainerApp title="Danh sách môn học">
      <List
        className="w-full"
        grid={{
          gutter: 12,
          column: 4,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}
        dataSource={subjects}
        renderItem={(subject) => (
          <List.Item key={subject.id}>
            <Card
              hoverable
              className="w-full h-full bg-white dark:bg-gray-800 overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-lg"
              onClick={() => handleSubjectSelect(subject.id)}
            >
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-50" />
                <Card.Meta
                  title={
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      {subject.name}
                    </div>
                  }
                  description={
                    <Space
                      direction="vertical"
                      size="middle"
                      className="w-full"
                    >
                      <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                        <Text className="text-gray-600 dark:text-gray-300">
                          Mã môn học:{" "}
                          <span className="font-medium">{subject.code}</span>
                        </Text>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <Text className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <ClockCircleOutlined className="text-blue-500" />
                          <span>3 tín chỉ</span>
                        </Text>
                        <Text className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <BookOutlined className="text-indigo-500" />
                          <span>8 bài học</span>
                        </Text>
                      </div>
                    </Space>
                  }
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </ContainerApp>
  );
};

export default SubjectsPage;
