import groupChatApi, { ICreateGroupChatBody } from "@app/api/groupChat.api";
import { createToast } from "@app/common";
import FormBuilder, { FieldOption } from "@app/components/form";
import { BaseModalProps } from "@app/context/Modal.context";
import useAppMutation from "@app/hooks/useAppMutation.hook";
import { useReduxData } from "@app/hooks/useReduxData.hook";
import { TGroupChat } from "@app/type/schema.type";

export interface ICreateGroupChatModalProps extends BaseModalProps {}

const fields: FieldOption<ICreateGroupChatBody>[] = [
  {
    name: "name",
    label: "Tên nhóm",
    type: "text",
    placeholder: "Nhập tên nhóm",
    options: {
      required: true,
    },
    grid: {
      xs: 24,
    },
  },
  {
    name: "typeGroup",
    label: "Loại nhóm",
    type: "select",
    placeholder: "Chọn loại nhóm",
    options: {
      required: true,
      options: [
        { value: TGroupChat.classroom, label: "Classroom" },
        { value: TGroupChat.community, label: "Community" },
        { value: TGroupChat.group, label: "Group" },
      ],
    },
    grid: {
      xs: 24,
    },
  },
];

export default function CreateGroupChatModal({
  onSuccess,
  onClose,
}: ICreateGroupChatModalProps) {
  const { user } = useReduxData();
  const { mutate, isLoading } = useAppMutation(groupChatApi.createGroupChat, {
    onSuccess: (res) => {
      createToast("success", "Tạo thành công");
      onSuccess?.();
      onClose?.();
    },
  });

  const handleSubmit = (body: ICreateGroupChatBody) => {
    body.userId = user.user?.id;
    mutate({
      body,
    });
  };

  return (
    <FormBuilder
      loading={isLoading}
      fields={fields}
      onSubmit={handleSubmit}
      button={{
        ok: "Tạo",
      }}
    />
  );
}
