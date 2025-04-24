"use client";

import { useRouter } from "next/navigation";
import { Flex, Row, Button, Form } from "antd";
import authApi, { ISignInBody } from "@app/api/auth.api";
import Config from "@app/config/index.config";
import { createToast } from "@app/common";
import useAppMutation from "@app/hooks/useAppMutation.hook";
import FormBuilder, { FieldOption } from "@app/components/form";

const fields: FieldOption<ISignInBody>[] = [
  {
    name: "email",
    label: "Tài khoản",
    type: "text",
    placeholder: "Nhập tài khoản",
    options: {
      required: true,
      email: true,
    },
    grid: {
      xs: 24
    },
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    placeholder: "Nhập mật khẩu",
    options: {
      required: true,
    },
    grid: {
      xs: 24
    },
  },
];

export default function PSignIn() {
  const router = useRouter();
  const [form] = Form.useForm();

  const { mutate: signIn, isLoading } = useAppMutation(authApi.signIn, {
    onSuccess: (res) => {
      createToast("success", "Đăng nhập thành công");
      localStorage.setItem(Config.LOCALSTORATE.TOKEN, res.data.token);
      router.push(Config.PATHNAME.HOME);
    },
    onError: (error) => {
      console.error("Đăng nhập thất bại:", error);
    },
  });

  const initialValues = {
    email: "nguyenlinh13602@gmail.com",
    password: "000000",
  };

  const handleLogin = (body: ISignInBody) => {
    signIn({ body });
  };

  return (
    <Flex vertical className="w-full" justify="center" align="center" gap={24}>
      <div className="text-center">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Đăng nhập
        </h1>
        <p className="text-gray-500 mt-2">Chào mừng bạn quay trở lại</p>
      </div>

      <div className="w-full">
        <FormBuilder
          form={form}
          fields={fields}
          initialValues={initialValues}
          onSubmit={handleLogin}
        />
      </div>

      <Row className="w-full">
        <div
          role="button"
          tabIndex={0}
          className="ml-auto text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={() => {
            /* Xử lý quên mật khẩu */
          }}
        >
          Quên mật khẩu?
        </div>
      </Row>

      <Button
        type="primary"
        loading={isLoading}
        onClick={() => form.submit()}
        className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-500 to-indigo-600 
        border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90"
      >
        Đăng nhập
      </Button>

      <p className="text-sm text-gray-500">
        Chưa có tài khoản?
        <span
          onClick={() => router.push("/dang-ky")}
          className="ml-1 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors duration-200"
        >
          Đăng ký ngay
        </span>
      </p>
    </Flex>
  );
}
