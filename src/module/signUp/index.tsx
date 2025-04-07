"use client";
import authApi from "@app/api/auth.api";
import FormBuilder, { FieldConfig, FormBuilderRef, FormValues } from "@app/components/formConfig/FormBuilder";
import Config from '@app/config';
import useApiMutation from "@app/hooks/useApiMutation.hook";
import { Button, Flex, Row } from "antd";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function PSignUp() {
  const router = useRouter();
  const formRef = useRef<FormBuilderRef>(null);

  const fields: FieldConfig[] = [
    {
      name: "code",
      label: "Mã sinh viên",
      type: "text",
      placeholder: "Nhập mã sinh viên",
      required: true,
      span: 24
    },
    {
      name: "email",
      label: "Tài khoản",
      type: "email",
      placeholder: "Nhập tài khoản",
      required: true,
      span: 24
    },
    {
      name: "name",
      label: "Tài khoản",
      type: "text",
      placeholder: "Nhập tài khoản",
      required: true,
      span: 24
    },
    {
      name: "date_of_birth",
      label: "Ngày sinh",
      type: "date",
      placeholder: "Nhập ngày sinh",
      required: true,
      span: 24
    },
    {
      name: "course",
      label: "Khóa",
      type: "text",
      placeholder: "Nhập khóa",
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

  const { mutate: signUp, isLoading } = useApiMutation(authApi.signUp, {
    onSuccess: (res) => {
      console.log(res);
      router.push(Config.PATHNAME.SIGNIN);
    },
    onError: () => {
      console.log("Đăng ký thất bại");
    },
  });

  const handleSignUp = (values: FormValues): void => {
    signUp(
      {
        body: {
          code: values.code as string,
          email: values.email as string,
          name: values.name as string,
          date_of_birth: values.date_of_birth as string,
          course: values.course as string,
          password: values.password as string,
        }
      }
    );
  };
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
        // initialValues={initialValues}
        onSubmit={handleSignUp}
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
