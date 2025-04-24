'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, Typography, Row, Col, Layout } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

interface Lesson {
  id: number;
  title: string;
  description: string;
  route: string;
  icon: string;
}

const LessonsPage = () => {
  const router = useRouter();

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "Bài kiểm tra trắc nghiệm",
      description: "Làm bài kiểm tra để đánh giá kiến thức",
      route: "/quiz",
      icon: "📝"
    },
    {
      id: 2,
      title: "Bài học tương tác",
      description: "Học thông qua các bài tập tương tác",
      route: "/interactive",
      icon: "🎯"
    },
    // Thêm các bài học khác ở đây
  ];

  return (
    <Layout>
      <Content className="min-h-screen p-8">
        <Title level={2} className="mb-8">Danh sách bài học</Title>
        
        <Row gutter={[24, 24]}>
          {lessons.map((lesson) => (
            <Col xs={24} md={12} lg={8} key={lesson.id}>
              <Card
                hoverable
                onClick={() => router.push(lesson.route)}
                className="h-full"
              >
                <div className="text-4xl mb-4">{lesson.icon}</div>
                <Title level={4}>{lesson.title}</Title>
                <Typography.Text type="secondary">
                  {lesson.description}
                </Typography.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default LessonsPage; 