'use client';

// import React, { useState } from 'react';
// import { Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import { INotification, IUser } from '@app/type/schema.type';
// import { useQuery, useMutation } from 'react-query';
// import notificationApi from '@app/api/notification.api';
// import userApi from '@app/api/user.api';

// const NotificationManagementPage = () => {
//   const [form] = Form.useForm();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

//   const { data: notifications, refetch } = useQuery('notifications', notificationApi.getAllNotifications);
//   const { data: users } = useQuery('users', userApi.getAllUsers);

//   const createNotificationMutation = useMutation(
//     (data: Partial<INotification>) => notificationApi.createNotification(data),
//     {
//       onSuccess: () => {
//         message.success('Tạo thông báo thành công');
//         refetch();
//         setIsModalVisible(false);
//         form.resetFields();
//       },
//     }
//   );

//   const deleteNotificationMutation = useMutation(
//     (id: string) => notificationApi.deleteNotification(id),
//     {
//       onSuccess: () => {
//         message.success('Xóa thông báo thành công');
//         refetch();
//       },
//     }
//   );

//   const columns: ColumnsType<INotification> = [
//     {
//       title: 'Tiêu đề',
//       dataIndex: 'title',
//       key: 'title',
//     },
//     {
//       title: 'Nội dung',
//       dataIndex: 'content',
//       key: 'content',
//       ellipsis: true,
//     },
//     {
//       title: 'Loại',
//       dataIndex: 'type',
//       key: 'type',
//       render: (type) => {
//         const types = {
//           SYSTEM: 'Hệ thống',
//           POST: 'Bài đăng',
//           COMMENT: 'Bình luận',
//         };
//         return types[type as keyof typeof types];
//       },
//     },
//     {
//       title: 'Ngày tạo',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       render: (date) => new Date(date).toLocaleDateString('vi-VN'),
//     },
//     {
//       title: 'Thao tác',
//       key: 'action',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             danger
//             onClick={() => {
//               Modal.confirm({
//                 title: 'Xác nhận xóa thông báo?',
//                 content: 'Bạn có chắc chắn muốn xóa thông báo này?',
//                 onOk: () => deleteNotificationMutation.mutate(record.id),
//               });
//             }}
//           >
//             Xóa
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   const handleSubmit = (values: any) => {
//     createNotificationMutation.mutate({
//       ...values,
//       userIds: selectedUsers,
//     });
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Quản lý thông báo</h1>
//         <Button
//           type="primary"
//           onClick={() => {
//             form.resetFields();
//             setSelectedUsers([]);
//             setIsModalVisible(true);
//           }}
//         >
//           Tạo thông báo
//         </Button>
//       </div>

//       <Table columns={columns} dataSource={notifications} rowKey="id" />

//       <Modal
//         title="Tạo thông báo mới"
//         open={isModalVisible}
//         onCancel={() => {
//           setIsModalVisible(false);
//           form.resetFields();
//           setSelectedUsers([]);
//         }}
//         footer={null}
//       >
//         <Form form={form} onFinish={handleSubmit} layout="vertical">
//           <Form.Item
//             name="title"
//             label="Tiêu đề"
//             rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="content"
//             label="Nội dung"
//             rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
//           >
//             <Input.TextArea rows={4} />
//           </Form.Item>

//           <Form.Item
//             name="type"
//             label="Loại thông báo"
//             rules={[{ required: true, message: 'Vui lòng chọn loại thông báo' }]}
//           >
//             <Select>
//               <Select.Option value="SYSTEM">Hệ thống</Select.Option>
//               <Select.Option value="POST">Bài đăng</Select.Option>
//               <Select.Option value="COMMENT">Bình luận</Select.Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Người nhận"
//             rules={[{ required: true, message: 'Vui lòng chọn người nhận' }]}
//           >
//             <Select
//               mode="multiple"
//               placeholder="Chọn người nhận"
//               value={selectedUsers}
//               onChange={setSelectedUsers}
//               style={{ width: '100%' }}
//             >
//               {users?.map((user: IUser) => (
//                 <Select.Option key={user.id} value={user.id}>
//                   {user.name} ({user.email})
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item className="mb-0">
//             <div className="flex justify-end gap-2">
//               <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
//               <Button type="primary" htmlType="submit">
//                 Gửi thông báo
//               </Button>
//             </div>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

const NotificationManagementPage = () => {
  return (
    <div>
      <h1>Notification Management</h1>
    </div>
  );
};

export default NotificationManagementPage; 