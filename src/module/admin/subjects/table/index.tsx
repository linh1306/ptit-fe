import { ISubject } from "@app/type/schema.type";
import { ColumnsType } from "antd/es/table";

export const columns: ColumnsType<ISubject> = [
  {
    title: "Mã môn học",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Tên môn học",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date) => new Date(date).toLocaleDateString("vi-VN"),
  },
];
