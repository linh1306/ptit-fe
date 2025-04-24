"use client";
import authApi, { ISignUpBody } from "@app/api/auth.api";
import FormBuilder, { FieldOption } from "@app/components/form";
import Config from "@app/config/index.config";
import useAppMutation from "@app/hooks/useAppMutation.hook";
import { Button, Flex, Form } from "antd";
import { useRouter } from "next/navigation";

const fields: FieldOption<ISignUpBody>[] = [
  {
    name: "code",
    label: "Mã sinh viên",
    type: "text",
    placeholder: "B20DCCN000",
    options: {
      required: true,
    },
    grid: {
      xs: 12,
    },
  },
  {
    name: "name",
    label: "Họ và tên",
    type: "text",
    placeholder: "Nguyễn Văn A",
    options: {
      required: true,
    },
    grid: {
      xs: 12,
    },
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Nhập email của bạn",
    options: {
      required: true,
      email: true,
    },
    grid: {
      xs: 24,
    },
  },
  {
    name: "course",
    label: "Khóa",
    type: "text",
    placeholder: "D20",
    options: {
      required: true,
    },
    grid: {
      xs: 24,
    },
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    placeholder: "Tạo mật khẩu của bạn",
    options: {
      required: true,
    },
    grid: {
      xs: 24,
    },
  },
];

export default function PSignUp() {
  const router = useRouter();
  const [form] = Form.useForm();

  const { mutate: signUp, isLoading } = useAppMutation(authApi.signUp, {
    onSuccess: (res) => {
      console.log(res);
      router.push(Config.PATHNAME.SIGNIN);
    },
  });

  const handleSignUp = (body: ISignUpBody): void => {
    signUp({ body });
  };
  return (
    <Flex vertical className="w-full" justify="center" align="center" gap={24}>
      <div className="text-center">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Đăng ký tài khoản
        </h1>
        <p className="text-gray-500 mt-2">Tạo tài khoản học tập của bạn</p>
      </div>

      <div className="w-full">
        <FormBuilder<ISignUpBody>
          form={form}
          fields={fields}
          onSubmit={handleSignUp}
        />
      </div>

      <Button
        type="primary"
        loading={isLoading}
        onClick={() => form.submit()}
        className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-500 to-indigo-600 
        border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90"
      >
        Đăng ký
      </Button>

      <p className="text-sm text-gray-500">
        Đã có tài khoản?
        <span
          onClick={() => router.push("/dang-nhap")}
          className="ml-1 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors duration-200"
        >
          Đăng nhập
        </span>
      </p>
    </Flex>
  );
}
