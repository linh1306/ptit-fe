import { MenuProps } from "antd";

export type ISubPage = (props: { [key: string]: any }) => JSX.Element;

export interface IPaginationParams {
    page: number;
    pageSize: number;
    total?: number;
}

export type MenuItem = Required<MenuProps>["items"][number];