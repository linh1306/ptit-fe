import { FormInstance } from "antd";

export interface OptionItem {
  label: string;
  value: string | number | boolean;
}

export interface GridOptions {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface IOptionsField {
  text: {
    required?: { message?: string } | boolean;
    min?: { val: number; message?: string };
    max?: { val: number; message?: string };
    length?: { val: number; message?: string };
    matches?: { regex: RegExp; message?: string };
    email?: { message?: string } | boolean;
    url?: { message?: string } | boolean;
    trim?: { message?: string } | boolean;
  };
  textarea: {
    required?: { message?: string } | boolean;
    min?: { val: number; message?: string };
    max?: { val: number; message?: string };
  };
  password: {
    required?: { message?: string } | boolean;
    min?: { val: number; message?: string };
    max?: { val: number; message?: string };
    length?: { val: number; message?: string };
    matches?: { regex: RegExp; message?: string };
  };
  number: {
    required?: { message?: string } | boolean;
    min?: { val: number; message?: string };
    max?: { val: number; message?: string };
    lessThan?: { val: number; message?: string };
    moreThan?: { val: number; message?: string };
    positive?: { message?: string } | boolean;
    negative?: { message?: string } | boolean;
    integer?: { message?: string } | boolean;
  };
  switch: {
    required?: { message?: string } | boolean;
    oneOf?: { values: boolean[]; message?: string };
  };
  select: {
    options: OptionItem[];
    required?: { message?: string } | boolean;
  };
  date: {
    required?: { message?: string } | boolean;
    min?: { val: Date | string; message?: string };
    max?: { val: Date | string; message?: string };
  };
  checkbox: {
    required?: { message?: string } | boolean;
    options: OptionItem[];
  };
}

export type FieldType = keyof IOptionsField;

// Base field option properties, shared among all field types
export interface BaseFieldOption<T = any> {
  name: keyof T;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  hidden?: boolean;
  dependencies?: Array<keyof T>;
  render?: (field: FieldOption<T>, form: FormInstance) => React.ReactNode;
  grid?: GridOptions;
}

// Field option with type-specific options
export interface TypedFieldOption<T = any, FT extends FieldType = FieldType>
  extends BaseFieldOption<T> {
  type: FT;
  options?: Partial<IOptionsField[FT]>;
}

// Union type for all possible field options
export type FieldOption<T = any> = {
  [FT in FieldType]: TypedFieldOption<T, FT>;
}[FieldType];

export interface FormBuilderProps<T extends Record<string, any>> {
  form?: FormInstance;
  fields: FieldOption<T>[];
  onSubmit: (values: T) => void;
  onCancel?: () => void;
  initialValues?: Partial<T>;
  button?: {
    ok?: string;
    cancel?: string;
    position?: "start" | "center" | "end";
  };
  loading?: boolean;
  gridGutter?: [number, number];
}
