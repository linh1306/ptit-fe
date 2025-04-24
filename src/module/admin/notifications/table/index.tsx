import { INotification } from "@app/type/schema.type";
import { ColumnsType } from "antd/es/table";

export const columns: ColumnsType<INotification> = [
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Url",
    dataIndex: "url",
    key: "url",
  },
];
