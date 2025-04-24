import notificationApi, {
  ICreateNotification,
} from "@app/api/notification.api";
import { createToast } from "@app/common";
import FormBuilder, { FieldOption } from "@app/components/form";
import { BaseModalProps } from "@app/context/Modal.context";
import useAppMutation from "@app/hooks/useAppMutation.hook";

export interface ICreateNotificationModalProps extends BaseModalProps {}

const fields: FieldOption<ICreateNotification>[] = [
  {
    name: "content",
    label: "Nội dung",
    type: "text",
    placeholder: "Nhập nội dung",
    options: {
      required: true,
    },
  },
  {
    name: "url",
    label: "Url",
    type: "text",
    placeholder: "Nhập url",
    options: {
      required: true,
      url: true,
    },
  },
];

export default function CreateNotificationModal({
  onClose,
}: ICreateNotificationModalProps) {
  const { mutate: createNotification, isLoading } = useAppMutation(
    notificationApi.createNotification,
    {
      onSuccess: (res) => {
        createToast("success", "Cập nhật thành công");
        onClose?.();
      },
      onError: (error) => {
        createToast("error", "Cập nhật thất bại");
      },
    }
  );

  const handleSubmit = (body: ICreateNotification) => {
    createNotification({ body });
  };

  const handleCancel = () => {
    onClose?.();
  };

  return (
    <FormBuilder<ICreateNotification>
      fields={fields}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      button={{
        ok: "Tạo",
        cancel: "Hủy",
      }}
    />
  );
}
