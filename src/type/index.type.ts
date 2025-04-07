import { MenuProps } from "antd";

export type ISubPage = (props: { [key: string]: any }) => JSX.Element;

// Định nghĩa các loại field có thể sử dụng
export type FieldType =
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'select'
    | 'date'
    | 'switch'
    | 'checkbox';

// Định nghĩa kiểu dữ liệu cho từng loại field
export type FieldValue =
    | string
    | number
    | boolean
    | Date
    | null
    | undefined;

// Định nghĩa option cho select
export interface SelectOption {
    label: string;
    value: string | number;
}

// Định nghĩa cấu trúc của một field
export interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    options?: SelectOption[];
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    disabled?: boolean;
    defaultValue?: FieldValue;
    dependencies?: string[];
    validate?: (value: FieldValue, formValues: Record<string, FieldValue>) => boolean | string;
    // Thuộc tính mới để xác định độ rộng của trường
    span?: number; // Độ rộng trong hệ thống grid (1-24)
}

// Định nghĩa kiểu dữ liệu cho giá trị form
export type FormValues = Record<string, FieldValue>;

// Props cho FormBuilder
export interface FormBuilderProps {
    fields: FieldConfig[];
    onSubmit: (data: FormValues) => void;
    onCancel?: () => void;
    submitText?: string;
    cancelText?: string;
    initialValues?: FormValues;
    resetAfterSubmit?: boolean;
    // Bố cục form
    layout?: {
        columns?: 1 | 2 | 3; // Số cột trong grid
        gutter?: number; // Khoảng cách giữa các cột
    };
}

export interface FormItemProps {
    field: FieldConfig;
}

export interface IPaginationParams {
    page: number;
    pageSize: number;
    total?: number;
}


export type MenuItem = Required<MenuProps>["items"][number];