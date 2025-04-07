import React, { useImperativeHandle, forwardRef } from 'react';
import * as hookForm from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Form, Row, Col, Space } from 'antd';
import { FormItem } from './FormItem';

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

// Định nghĩa responsive spans cho các breakpoints
export interface ResponsiveSpan {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}

// Định nghĩa cấu trúc của một field với responsive spans
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
    // Thuộc tính responsive span cho các breakpoints khác nhau
    span?: number | ResponsiveSpan; // Có thể là số hoặc object với các breakpoints
}

// Định nghĩa kiểu dữ liệu cho giá trị form
export type FormValues = Record<string, FieldValue>;

// Form ref để truy cập các phương thức của form từ bên ngoài
export interface FormBuilderRef {
    submit: () => void;
    reset: () => void;
    setValue: (name: string, value: FieldValue) => void;
    getValues: () => FormValues;
    formMethods: hookForm.UseFormReturn<FormValues, any, undefined>;
}

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
        columns?: 1 | 2 | 3 | ResponsiveSpan; // Số cột trong grid, có thể responsive
        gutter?: number | [number, number]; // Khoảng cách giữa các cột
    };
    // Hiển thị nút submit/cancel bên trong form
    showButtons?: boolean;
}

// Component FormBuilder chính
const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>(({
    fields,
    onSubmit,
    onCancel,
    submitText = 'Lưu',
    cancelText = 'Hủy',
    initialValues = {},
    resetAfterSubmit = false,
    layout = { columns: 1, gutter: 16 },
    showButtons = true,
}, ref) => {
    // Tạo schema validation từ cấu hình các field
    const generateValidationSchema = () => {
        const schema: Record<string, any> = {};

        fields.forEach((field) => {
            let fieldSchema: any = yup.mixed();

            // Xác định loại dữ liệu dựa vào type field
            switch (field.type) {
                case 'text':
                case 'password':
                    fieldSchema = yup.string();
                    break;
                case 'email':
                    fieldSchema = yup.string().email(`${field.label} phải là một email hợp lệ`);
                    break;
                case 'number':
                    fieldSchema = yup.number().typeError(`${field.label} phải là một số`);
                    break;
                case 'date':
                    fieldSchema = yup.date().typeError(`${field.label} phải là một ngày hợp lệ`);
                    break;
                case 'switch':
                case 'checkbox':
                    fieldSchema = yup.boolean();
                    break;
                case 'select':
                    fieldSchema = yup.mixed();
                    break;
            }

            // Thêm các validation rule dựa vào cấu hình
            if (field.required) {
                fieldSchema = fieldSchema.required(`${field.label} là bắt buộc`);
            }

            if (field.min !== undefined && (field.type === 'text' || field.type === 'password')) {
                fieldSchema = fieldSchema.min(field.min, `${field.label} phải có ít nhất ${field.min} ký tự`);
            }

            if (field.max !== undefined && (field.type === 'text' || field.type === 'password')) {
                fieldSchema = fieldSchema.max(field.max, `${field.label} không được vượt quá ${field.max} ký tự`);
            }

            if (field.min !== undefined && field.type === 'number') {
                fieldSchema = fieldSchema.min(field.min, `${field.label} phải lớn hơn hoặc bằng ${field.min}`);
            }

            if (field.max !== undefined && field.type === 'number') {
                fieldSchema = fieldSchema.max(field.max, `${field.label} phải nhỏ hơn hoặc bằng ${field.max}`);
            }

            if (field.pattern && (field.type === 'text' || field.type === 'password' || field.type === 'email')) {
                fieldSchema = fieldSchema.matches(field.pattern, `${field.label} không đúng định dạng`);
            }

            schema[field.name] = fieldSchema;
        });

        return yup.object().shape(schema);
    };

    const validationSchema = generateValidationSchema();

    // Khởi tạo form với react-hook-form
    const methods = hookForm.useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
    });

    // Expose form methods cho component cha thông qua ref
    useImperativeHandle(ref, () => ({
        submit: () => methods.handleSubmit(handleSubmit)(),
        reset: () => methods.reset(),
        setValue: (name, value) => methods.setValue(name, value),
        getValues: () => methods.getValues(),
        formMethods: methods
    }));

    const handleSubmit = (data: FormValues) => {
        onSubmit(data);
        if (resetAfterSubmit) {
            methods.reset();
        }
    };

    const handleReset = () => {
        methods.reset();
        if (onCancel) {
            onCancel();
        }
    };

    // Xử lý responsive columns
    const getColumnsForBreakpoint = (breakpoint: string): number => {
        if (typeof layout.columns === 'number') {
            return layout.columns;
        }
        
        if (typeof layout.columns === 'object') {
            const responsiveColumns = layout.columns as ResponsiveSpan;
            const breakpointValue = responsiveColumns[breakpoint as keyof ResponsiveSpan];
            return breakpointValue || 1; // Default to 1 column if not specified
        }
        
        return 1; // Default to 1 column
    };

    // Lấy các thuộc tính span cho responsive
    const getResponsiveProps = (field: FieldConfig) => {
        if (typeof field.span === 'number') {
            return { span: field.span };
        }

        if (typeof field.span === 'object') {
            return field.span;
        }

        // Mặc định dựa trên cấu hình columns
        return {
            xs: 24, // Full width on mobile
            sm: 24 / getColumnsForBreakpoint('sm'),
            md: 24 / getColumnsForBreakpoint('md'),
            lg: 24 / getColumnsForBreakpoint('lg'),
            xl: 24 / getColumnsForBreakpoint('xl'),
            xxl: 24 / getColumnsForBreakpoint('xxl'),
        };
    };

    // Tổ chức các field theo grid layout
    const renderFields = () => {
        return (
            <Row gutter={layout.gutter || 16}>
                {fields.map((field) => (
                    <Col key={field.name} {...getResponsiveProps(field)}>
                        <FormItem field={field} />
                    </Col>
                ))}
            </Row>
        );
    };

    // Render form buttons
    const renderButtons = () => {
        if (!showButtons) return null;
        
        return (
            <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Space>
                        <Button onClick={handleReset}>{cancelText}</Button>
                        <Button type="primary" htmlType="submit">{submitText}</Button>
                    </Space>
                </div>
            </Form.Item>
        );
    };

    return (
        <hookForm.FormProvider {...methods}>
            <Form layout="vertical" onFinish={methods.handleSubmit(handleSubmit)}>
                {renderFields()}
                {renderButtons()}
            </Form>
        </hookForm.FormProvider>
    );
});

FormBuilder.displayName = "FormBuilder";

export default FormBuilder;