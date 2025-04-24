import { IUser } from "@app/type/schema.type";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";

export const columns: ColumnsType<IUser> = [
  {
    title: "Mã sinh viên",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
    render: (role) => (
      <Tag
        color={
          role === "admin" ? "blue" : role === "superAdmin" ? "red" : "green"
        }
      >
        {role.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag
        color={
          status === "active"
            ? "success"
            : status === "inactive"
            ? "error"
            : "warning"
        }
      >
        {status.toUpperCase()}
      </Tag>
    ),
  },
];
