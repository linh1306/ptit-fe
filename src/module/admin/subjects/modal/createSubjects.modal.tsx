import subjectApi, { ICreateSubjectBody } from "@app/api/subject.api";
import { createToast } from "@app/common";
import FormBuilder, { FieldOption } from "@app/components/form";
import { BaseModalProps } from "@app/context/Modal.context";
import useAppMutation from "@app/hooks/useAppMutation.hook";

export interface ICreateSubjectsModalProps extends BaseModalProps {}

const fields: FieldOption<ICreateSubjectBody>[] = [
  {
    name: "code",
    label: "Mã môn học",
    type: "text",
    placeholder: "Nhập mã môn học",
    options: {
      required: true,
    },
  },
  {
    name: "name",
    label: "Tên môn học",
    type: "text",
    placeholder: "Nhập tên môn học",
    options: {
      required: true,
    },
  },
];

export default function CreateSubjectsModal({
  onClose,
}: ICreateSubjectsModalProps) {
  const { mutate: createSubject } = useAppMutation(subjectApi.createSubject, {
    onSuccess: () => {
      createToast("success", "Tạo môn học thành công");
      onClose?.();
    },
  });

  const handleSubmit = (body: ICreateSubjectBody) => {
    createSubject({
      body,
    });
  };
  return (
    <FormBuilder<ICreateSubjectBody>
      fields={fields}
      onSubmit={handleSubmit}
      button={{
        ok: "Tạo",
      }}
    />
  );
}
