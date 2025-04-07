"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Flex, Row, Button } from "antd";
import authApi from "@app/api/auth.api";
import Config from '@app/config';
import FormBuilder, { FormBuilderRef, FieldConfig, FormValues } from "@app/components/formConfig/FormBuilder";
import { createToast } from "@app/common";
import useApiMutation from "@app/hooks/useApiMutation.hook";

export default function PSignIn() {
  const router = useRouter();
  const formRef = useRef<FormBuilderRef>(null);

  const { mutate: signIn, isLoading } = useApiMutation(authApi.signIn, {
    onSuccess: (res) => {
      createToast("success", "Đăng nhập thành công");
      localStorage.setItem(Config.LOCALSTORATE.TOKEN, res.data.token);
      router.push(Config.PATHNAME.HOME);
    },
    onError: (error) => {
      console.error("Đăng nhập thất bại:", error);
    },
    setQueryData: {
      queryKey: ['signIn']
    }
  });
  const fields: FieldConfig[] = [
    {
      name: "email",
      label: "Tài khoản",
      type: "email",
      placeholder: "Nhập tài khoản",
      required: true,
      span: 24
    },
    {
      name: "password",
      label: "Mật khẩu",
      type: "password",
      placeholder: "Nhập mật khẩu",
      required: true,
      span: 24
    }
  ];

  const initialValues = {
    email: "nguyenlinh13602@gmail.com",
    password: "000000",
  };

  const handleLogin = (values: FormValues) => {
    signIn({
      body: {
        email: values.email as string,
        password: values.password as string
      },
    });
  }


  return (
    <Flex
      vertical
      className="w-full py-3"
      justify="center"
      align="center"
      gap={30}
    >
      <p className="text-xl">Đăng nhập</p>

      <FormBuilder
        ref={formRef}
        fields={fields}
        initialValues={initialValues}
        onSubmit={handleLogin}
        showButtons={false}
        layout={{
          columns: 1,
          gutter: 16
        }}
      />

      <Row className="w-full">
        <div
          role="button"
          tabIndex={0}
          className="ml-auto cursor-pointer hover:text-blue-500"
          onClick={() => {/* Xử lý quên mật khẩu */ }}
        >
          Quên mật khẩu?
        </div>
      </Row>

      <Button
        type="primary"
        loading={isLoading}
        onClick={() => formRef.current?.submit()}
        className="w-full h-10"
      >
        Đăng nhập
      </Button>
    </Flex>
  );
}