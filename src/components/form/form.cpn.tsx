import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
} from "antd";
import { FieldOption, FormBuilderProps, GridOptions } from "./form.type";
import { useEffect, useState } from "react";
import { FormInstance } from "antd/lib";
import { createSchemaYup } from "./form.validate";
import { ValidationError } from "yup";

function renderField<T>(form: FormInstance, field: FieldOption<T>) {
  const { type, placeholder, options, disabled } = field;

  if (field.render) {
    return field.render(field, form);
  }

  switch (type) {
    case "text":
      return <Input placeholder={placeholder} disabled={disabled} />;

    case "textarea":
      return (
        <Input.TextArea
          rows={4}
          placeholder={placeholder}
          disabled={disabled}
        />
      );

    case "number":
      return (
        <InputNumber
          style={{ width: "100%" }}
          placeholder={placeholder}
          disabled={disabled}
        />
      );

    case "select":
      return (
        <Select
          placeholder={placeholder}
          disabled={disabled}
          options={options?.options}
        />
      );

    case "date":
      return <DatePicker style={{ width: "100%" }} disabled={disabled} />;

    case "switch":
      return <Switch disabled={disabled} />;

    case "checkbox":
      return <Checkbox.Group options={options?.options} disabled={disabled} />;

    case "password":
      return <Input.Password placeholder={placeholder} disabled={disabled} />;

    default:
      return <Input placeholder={placeholder} disabled={disabled} />;
  }
}

function renderGridFormItems<T>(
  form: FormInstance,
  fields: FieldOption<T>[],
  errors: Record<string, string>
) {
  return fields.map((field) => {
    if (field.hidden) return null;

    const colProps: GridOptions = field.grid || {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
    };

    const errorMes = errors[field.name.toString()]

    return (
      <Col key={field.name.toString()} {...colProps}>
        <Form.Item
          className="w-full"
          layout="vertical"
          label={field.label}
          name={field.name.toString()}
          dependencies={field.dependencies?.map((dep) => dep.toString())}
          help={errorMes ? <p className="text-xs">{errorMes}</p> : null}
          validateStatus={errorMes ? "error" : "success"}
          valuePropName={
            field.type === "switch" || field.type === "checkbox"
              ? "checked"
              : "value"
          }
        >
          {renderField(form, field)}
        </Form.Item>
      </Col>
    );
  });
}

export default function FormBuilder<T extends Record<string, any>>(
  props: FormBuilderProps<T>
): React.ReactElement {
  const {
    fields,
    onSubmit,
    onCancel,
    initialValues,
    button,
    loading = false,
    form: externalForm,
    gridGutter = [16, 0],
  } = props;

  const [internalForm] = Form.useForm();
  const form = externalForm || internalForm;
  const schema = createSchemaYup(fields);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (values: T) => {
    try {
      await schema.validate(values, { abortEarly: false });
      onSubmit(values);
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path && !errors[e.path]) {
            errors[e.path] = e.message;
          }
        });
        setErrors(errors);
      }
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Row gutter={gridGutter}>
        {renderGridFormItems(form, fields, errors)}
        {button && (
          <Col span={24}>
            <Form.Item
              className="flex gap-3"
              style={{ justifyContent: button?.position ?? "end" }}
            >
              <Flex gap={12}>
                {button?.cancel && onCancel && (
                  <Button onClick={onCancel}>{button?.cancel}</Button>
                )}
                {button?.ok && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ marginRight: 8 }}
                  >
                    {button?.ok}
                  </Button>
                )}
              </Flex>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
}
