import userApi, { IAdminUpdateUser } from "@app/api/user.api";
import { createToast } from "@app/common";
import FormBuilder, { FieldOption } from "@app/components/form";
import { BaseModalProps } from "@app/context/Modal.context";
import useAppMutation from "@app/hooks/useAppMutation.hook";
import { IUser, ROLE, TStatusUser } from "@app/type/schema.type";

export interface IUserModalProps extends BaseModalProps {
  user: IUser;
}

const fields: FieldOption<IAdminUpdateUser>[] = [
  {
    name: "role",
    label: "Vai trò",
    type: "select",
    placeholder: "Chọn vai trò",
    options: {
      required: true,
      options: [
        { value: ROLE.user, label: "Người dùng" },
        { value: ROLE.admin, label: "Quản trị viên" },
        { value: ROLE.superAdmin, label: "Super Admin" },
      ],
    },
  },
  {
    name: "status",
    label: "Trạng thái",
    type: "select",
    placeholder: "Chọn trạng thái",
    options: {
      required: true,
      options: [
        { value: TStatusUser.active, label: "Hoạt động" },
        { value: TStatusUser.banned, label: "Vô hiệu hóa" },
        { value: TStatusUser.pending, label: "Chờ duyệt" },
      ],
    },
  },
];

export default function UserModal({
  user,
  onSuccess,
  onClose,
}: IUserModalProps) {
  const { mutate: updateUser, isLoading } = useAppMutation(
    userApi.adminUpdateUser,
    {
      onSuccess: (res) => {
        createToast("success", "Cập nhật thành công");
        onSuccess?.();
        onClose?.();
      },
      onError: (error) => {
        createToast("error", "Cập nhật thất bại");
      },
    }
  );

  const handleSubmit = (body: IAdminUpdateUser) => {
    updateUser({
      body,
      pathIds: [user.id],
    });
  };

  return (
    <FormBuilder<IAdminUpdateUser>
      loading={isLoading}
      fields={fields}
      initialValues={user}
      onSubmit={handleSubmit}
      button={{
        ok: "Cập nhật",
      }}
    />
  );
}
