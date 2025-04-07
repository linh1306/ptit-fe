import React from 'react';
import * as hookForm from 'react-hook-form';
import { Form, Input, Select, DatePicker, InputNumber, Switch, Checkbox } from 'antd';
import { FieldConfig } from './FormBuilder';

interface FormItemProps {
    field: FieldConfig;
}

export const FormItem: React.FC<FormItemProps> = ({ field }) => {
    const { control, formState: { errors }, watch } = hookForm.useFormContext();
    const error = errors[field.name];

    // Kiểm tra dependencies (nếu có)
    const shouldRender = (): boolean => {
        if (!field.dependencies || field.dependencies.length === 0) return true;

        // Nếu field phụ thuộc vào các field khác
        const watchedValues = watch();

        // Hiển thị nếu tất cả dependencies có giá trị truthy
        return field.dependencies.every(dep => !!watchedValues[dep]);
    };

    if (!shouldRender()) return null;

    const renderField = () => {
        switch (field.type) {
            case 'text':
                return (
                    <Input
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                    />
                );

            case 'password':
                return (
                    <Input.Password
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                    />
                );

            case 'email':
                return (
                    <Input
                        type="email"
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                    />
                );

            case 'number':
                return (
                    <InputNumber
                        placeholder={field.placeholder}
                        min={field.min}
                        max={field.max}
                        disabled={field.disabled}
                        style={{ width: '100%' }}
                    />
                );

            case 'select':
                return (
                    <Select
                        placeholder={field.placeholder}
                        options={field.options}
                        disabled={field.disabled}
                        style={{ width: '100%' }}
                    />
                );

            case 'date':
                return (
                    <DatePicker
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        style={{ width: '100%' }}
                    />
                );

            case 'switch':
                return <Switch disabled={field.disabled} />;

            case 'checkbox':
                return <Checkbox disabled={field.disabled}>{field.placeholder}</Checkbox>;

            default:
                return <Input placeholder={field.placeholder} disabled={field.disabled} />;
        }
    };

    return (
        <Form.Item
            label={field.label}
            validateStatus={error ? 'error' : undefined}
            help={error?.message as string}
        >
            <hookForm.Controller
                name={field.name}
                control={control}
                render={({ field: { onChange, value, ref } }) => {
                    // Xử lý riêng cho DatePicker vì nó xử lý value khác
                    if (field.type === 'date') {
                        return React.cloneElement(renderField(), {
                            onChange: (date: any) => onChange(date),
                            value: value,
                            ref: ref,
                        });
                    }

                    // Xử lý cho Switch và Checkbox
                    if (field.type === 'switch' || field.type === 'checkbox') {
                        return React.cloneElement(renderField(), {
                            onChange: (checked: boolean) => onChange(checked),
                            checked: value,
                            ref: ref,
                        });
                    }

                    // Xử lý riêng cho InputNumber
                    if (field.type === 'number') {
                        return React.cloneElement(renderField(), {
                            onChange: (val: number | null) => onChange(val),
                            value: value,
                            ref: ref,
                        });
                    }

                    // Xử lý riêng cho Select
                    if (field.type === 'select') {
                        return React.cloneElement(renderField(), {
                            onChange: (val: string | number) => onChange(val),
                            value: value,
                            ref: ref,
                        });
                    }

                    // Xử lý chung cho các loại input text
                    return React.cloneElement(renderField(), {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
                        value: value as string,
                        ref: ref,
                    });
                }}
            />
        </Form.Item>
    );
};