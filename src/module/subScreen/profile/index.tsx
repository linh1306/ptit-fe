"use client";

import { useState, useRef } from "react";
import { useReduxData } from "@app/hooks/useReduxData.hook";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Modal,
  Form,
  Input,
  message,
  Skeleton
} from "antd";
import Image from "next/image";
import {
  LogoutOutlined,
  RightOutlined,
  EditOutlined,
  UserOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logoutUser } from "@app/store/slices/UserSlice";
import { logout } from "@app/common";
import { useRouter } from "next/navigation";
import Config from '@app/config/index.config';

export default function PProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useReduxData();
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [form] = Form.useForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    Modal.confirm({
      title: "Logout Confirmation",
      content: "Are you sure you want to logout?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        router.push(Config.PATHNAME.SIGNIN);
        dispatch(logoutUser());
        logout();
      }
    });
  };

  const handleAvatarClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewAvatar(objectUrl);

      // Start upload process
      setUploadLoading(true);
      message.loading("Uploading avatar...", 0);

      try {
        // Upload image using the API
        // const uploadedUrl = await uploadImage(file);

        message.destroy();
        message.success("Avatar updated successfully!");
      } catch (error) {
        message.destroy();
        message.error("Failed to upload avatar. Please try again.");
        console.error("Avatar upload error:", error);
      } finally {
        setUploadLoading(false);
      }
    }
  };

  const showEditModal = () => {
    form.setFieldsValue({
      name: user.user?.name,
      email: user.user?.email,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    setLoading(true);
    setIsEditModalOpen(false);
    setLoading(false);
    message.success("Profile updated successfully!");
  };

  const menuItems = [
    {
      icon: <UserOutlined />,
      title: "Edit Profile",
      onClick: showEditModal
    },
    // {
    //   icon: <LockOutlined />,
    //   title: "Change Password",
    //   onClick: () => router.push(Config.PATHNAME.CHANGE_PASSWORD)
    // },
    // {
    //   icon: <BellOutlined />,
    //   title: "Notifications",
    //   onClick: () => router.push(Config.PATHNAME.NOTIFICATIONS)
    // },
  ];

  return (
    <Flex vertical className="w-full" gap={8}>
      <Flex
        justify="center"
        className="relative h-32 w-full bg-blue-500 rounded-xl mb-16"
      >
        {/* Cover photo edit button */}
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          className="absolute top-2 right-2 text-white"
          onClick={() => message.info("Cover photo edit feature coming soon!")}
        />

        {/* Avatar with upload capability */}
        <div className="absolute -bottom-12 cursor-pointer" onClick={handleAvatarClick}>
          <Avatar
            className="border-4 border-white shadow-md"
            size={100}
            icon={user.user?.name || previewAvatar ?
              <Image
                alt="avatar"
                src={previewAvatar || "/avatar.jpg"}
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              /> :
              <UserOutlined />
            }
          />
          <div className={`absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full text-white ${uploadLoading ? 'animate-pulse' : ''}`}>
            <CameraOutlined />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
      </Flex>

      {/* User info section */}
      <Flex vertical align="center" gap={1}>
        <p className="text-2xl font-semibold">{user.user?.name || <Skeleton.Input active size="small" />}</p>
        <p className="text-sm text-gray-500">{user.user?.code || <Skeleton.Input active size="small" />}</p>
        <p className="text-sm text-gray-500">{user.user?.email || <Skeleton.Input active size="small" />}</p>
        {user.user?.name && <p className="text-sm text-gray-500">{user.user.name}</p>}

        <Button
          type="primary"
          icon={<EditOutlined />}
          size="small"
          className="mt-2"
          onClick={showEditModal}
        >
          Edit Profile
        </Button>
      </Flex>

      {/* Menu options */}
      <Flex vertical className="w-full h-full pt-5" gap={8}>
        <Flex vertical className="flex-1" gap={3}>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              size="large"
              className="w-full flex text-start bg-gray-50 hover:bg-gray-100"
              type="text"
              onClick={item.onClick}
            >
              {item.icon}
              <div className="flex-1 font-semibold ml-2">{item.title}</div>
              <RightOutlined />
            </Button>
          ))}
        </Flex>

        <Divider className="m-0 border-t-2" />

        {/* Logout button */}
        <Flex gap={8}>
          <Button
            icon={<LogoutOutlined />}
            className="w-full text-start bg-red-500 text-white hover:bg-red-600"
            type="text"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>
      </Flex>

      {/* Edit profile modal */}
      <Modal
        title="Edit Profile"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" }
            ]}
          >
            <Input placeholder="Enter your email" disabled />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            name="department"
            label="Department"
          >
            <Input placeholder="Enter your department" />
          </Form.Item>

          <Form.Item>
            <Flex justify="end" gap={8}>
              <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save Changes
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
}