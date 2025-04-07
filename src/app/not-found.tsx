import React from 'react';
import { Button, Result } from 'antd';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại."
        extra={
          <Link href="/">
            <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
              Quay lại trang chủ
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;
