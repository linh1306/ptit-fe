"use client";
import { Card, Col, Row, Space, Statistic } from 'antd';
import { useReduxData } from '@app/hooks/useReduxData.hook';

export default function Home() {
  const { user } = useReduxData();

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Xin chào, {user?.user?.name || 'Sinh viên'}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Chào mừng bạn đến với hệ thống quản lý học tập
        </p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic 
              title="Khóa học"
              value={5}
              valueStyle={{ color: '#3b82f6' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic 
              title="Bài tập"
              value={12}
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic 
              title="Điểm trung bình"
              value={8.5}
              precision={1}
              valueStyle={{ color: '#6366f1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic 
              title="Hoàn thành"
              value={85}
              suffix="%"
              valueStyle={{ color: '#8b5cf6' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card 
            title="Khóa học gần đây"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              {['Lập trình web', 'Cơ sở dữ liệu', 'Trí tuệ nhân tạo'].map((course, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  {course}
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card 
            title="Thông báo mới"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              {[
                'Đã cập nhật điểm giữa kỳ môn Lập trình web',
                'Bài tập mới: Thiết kế cơ sở dữ liệu',
                'Nhắc nhở: Deadline bài tập AI là 20/04'
              ].map((notice, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  {notice}
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
