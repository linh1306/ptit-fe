import {
  UserOutlined,
  BookOutlined,
  HomeOutlined,
  MessageOutlined,
  GlobalOutlined,
  ReadOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { MenuItem } from "@app/type/index.type";
import { ROLE } from "@app/type/schema.type";
import React from "react";

const routes = [
  {
    key: "/",
    label: "Trang chủ",
    icon: <HomeOutlined />,
    permissions: ["user", "admin", "superAdmin"]
  },
  {
    key: "/posts",
    label: "Bài đăng",
    icon: <GlobalOutlined />,
    permissions: ["user", "admin", "superAdmin"]
  },
  {
    key: "/subjects",
    label: "Môn học",
    icon: <BookOutlined />,
    permissions: ["user", "admin", "superAdmin"]
  },
  {
    key: "/messages",
    label: "Tin nhắn",
    icon: <MessageOutlined />,
    permissions: ["user", "admin", "superAdmin"]
  },
  {
    key: "/profile",
    label: "Tài khoản",
    icon: <UserOutlined />,
    permissions: ["user", "admin", "superAdmin"]
  },
  {
    key: "/admin",
    label: "Quản trị viên",
    icon: <UserOutlined />,
    permissions: ["admin", "superAdmin"]
  }
];

const menuAdminItems = [
  {
    key: '/admin/users',
    icon: <UserOutlined />,
    label: 'Quản lý người dùng',
    permissions: ["admin", "superAdmin"]
  },
  {
    key: '/admin/subjects',
    icon: <BookOutlined />,
    label: 'Quản lý môn học',
    permissions: ["admin", "superAdmin"]
  },
  {
    key: '/admin/lessons',
    icon: <ReadOutlined />,
    label: 'Quản lý bài học',
    permissions: ["admin", "superAdmin"]
  },
  {
    key: '/admin/notifications',
    icon: <BellOutlined />,
    label: 'Quản lý thông báo',
    permissions: ["admin", "superAdmin"]
  },
];

const getMenuItems = (userRole: ROLE): MenuItem[] => {
  return routes
    .filter(route => route.permissions.includes(userRole))
    .map(({ key, label, icon }) => ({
      key,
      label,
      icon
    }));
};

const getMenuAdminItems = (userRole: ROLE): MenuItem[] => {
  return menuAdminItems
    .filter(route => route.permissions.includes(userRole))
    .map(({ key, label, icon }) => ({
      key,
      label,
      icon
    }));
};

export { routes, getMenuItems, getMenuAdminItems };