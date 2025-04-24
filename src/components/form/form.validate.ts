import * as yup from "yup";
import { FieldOption, FieldType, IOptionsField } from "./form.type";

type OptionsForFieldType<FT extends FieldType> = IOptionsField[FT];

type SchemaShape = Record<string, yup.Schema<any>>;

export function createSchemaYup<T>(fields: FieldOption<T>[]): yup.ObjectSchema<any> {
  const shape: SchemaShape = {};

  fields.forEach((field) => {
    if (field.hidden) return;

    const { name, type, options = {} } = field;
    const fieldName = String(name);

    switch (type) {
      case "text": {
        let schema = yup.string();
        const opts = options as Partial<IOptionsField["text"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.min)
          schema = schema.min(
            opts.min.val,
            opts.min.message ||
              `Trường này phải có ít nhất ${opts.min.val} ký tự`
          );
        if (opts.max)
          schema = schema.max(
            opts.max.val,
            opts.max.message ||
              `Trường này không được vượt quá ${opts.max.val} ký tự`
          );
        if (opts.length)
          schema = schema.length(
            opts.length.val,
            opts.length.message || `Trường này phải có ${opts.length.val} ký tự`
          );
        if (opts.matches)
          schema = schema.matches(
            opts.matches.regex,
            opts.matches.message || `Trường này không hợp lệ`
          );
        if (opts.email) {
          const message =
            typeof opts.email === "object" ? opts.email.message : undefined;
          schema = schema.email(message || "Email không hợp lệ");
        }
        if (opts.url) {
          const message =
            typeof opts.url === "object" ? opts.url.message : undefined;
          schema = schema.url(message || "URL không hợp lệ");
        }
        if (opts.trim) {
          const message =
            typeof opts.trim === "object" ? opts.trim.message : undefined;
          schema = schema.trim(
            message || "Trường này không được có khoảng trắng"
          );
        }

        shape[fieldName] = schema;
        break;
      }

      case "textarea": {
        let schema = yup.string();
        const opts = options as Partial<IOptionsField["textarea"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.min)
          schema = schema.min(
            opts.min.val,
            opts.min.message ||
              `Trường này phải có ít nhất ${opts.min.val} ký tự`
          );
        if (opts.max)
          schema = schema.max(
            opts.max.val,
            opts.max.message ||
              `Trường này không được vượt quá ${opts.max.val} ký tự`
          );

        shape[fieldName] = schema;
        break;
      }

      case "password": {
        let schema = yup.string();
        const opts = options as Partial<IOptionsField["password"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.min)
          schema = schema.min(
            opts.min.val,
            opts.min.message ||
              `Trường này phải có ít nhất ${opts.min.val} ký tự`
          );
        if (opts.max)
          schema = schema.max(
            opts.max.val,
            opts.max.message ||
              `Trường này không được vượt quá ${opts.max.val} ký tự`
          );
        if (opts.length)
          schema = schema.length(
            opts.length.val,
            opts.length.message || `Trường này phải có ${opts.length.val} ký tự`
          );
        if (opts.matches)
          schema = schema.matches(
            opts.matches.regex,
            opts.matches.message || `Trường này không hợp lệ`
          );

        shape[fieldName] = schema;
        break;
      }

      case "number": {
        let schema = yup.number();
        const opts = options as Partial<IOptionsField["number"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.min)
          schema = schema.min(
            opts.min.val,
            opts.min.message ||
              `Trường này phải có ít nhất ${opts.min.val} ký tự`
          );
        if (opts.max)
          schema = schema.max(
            opts.max.val,
            opts.max.message ||
              `Trường này không được vượt quá ${opts.max.val} ký tự`
          );
        if (opts.lessThan)
          schema = schema.lessThan(
            opts.lessThan.val,
            opts.lessThan.message ||
              `Trường này phải nhỏ hơn ${opts.lessThan.val}`
          );
        if (opts.moreThan)
          schema = schema.moreThan(
            opts.moreThan.val,
            opts.moreThan.message ||
              `Trường này phải lớn hơn ${opts.moreThan.val}`
          );
        if (opts.positive) {
          const message =
            typeof opts.positive === "object"
              ? opts.positive.message
              : undefined;
          schema = schema.positive(message || "Trường này phải là số dương");
        }
        if (opts.negative) {
          const message =
            typeof opts.negative === "object"
              ? opts.negative.message
              : undefined;
          schema = schema.negative(message || "Trường này phải là số âm");
        }
        if (opts.integer) {
          const message =
            typeof opts.integer === "object" ? opts.integer.message : undefined;
          schema = schema.integer(message || "Trường này phải là số nguyên");
        }

        shape[fieldName] = schema;
        break;
      }

      case "switch": {
        let schema = yup.boolean();
        const opts = options as Partial<IOptionsField["switch"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.oneOf)
          schema = schema.oneOf(
            opts.oneOf.values,
            opts.oneOf.message ||
              `Trường này phải là ${opts.oneOf.values.join(" hoặc ")}`
          );

        shape[fieldName] = schema;
        break;
      }

      case "select": {
        let schema = yup.mixed();
        const opts = options as Partial<IOptionsField["select"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }

        shape[fieldName] = schema;
        break;
      }

      case "date": {
        let schema = yup.date();
        const opts = options as Partial<IOptionsField["date"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.min)
          schema = schema.min(
            new Date(opts.min.val),
            opts.min.message || `Trường này phải lớn hơn ${opts.min.val}`
          );
        if (opts.max)
          schema = schema.max(
            new Date(opts.max.val),
            opts.max.message || `Trường này phải nhỏ hơn ${opts.max.val}`
          );

        shape[fieldName] = schema;
        break;
      }

      case "checkbox": {
        let schema = yup.array();
        const opts = options as Partial<IOptionsField["checkbox"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }

        shape[fieldName] = schema;
        break;
      }

      default:
        shape[fieldName] = yup.string();
        break;
    }
  });

  return yup.object().shape(shape);
}

function validateWithYup<T>(schema: yup.ObjectSchema<any>) {
  return async (values: T) => {
    try {
      await schema.validate(values, { abortEarly: false });
      return Promise.resolve();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });

        return Promise.reject(errors);
      }

      return Promise.reject("Validation failed");
    }
  };
}

export function applyValidation<T>(form: any, fields: FieldOption<T>[]) {
  const schema = createSchemaYup(fields);
  form.validateFields = validateWithYup(schema);
  return schema;
}
