import subjectApi, { ICreateSubjectBody } from "@app/api/subject.api";
import { createToast } from "@app/common";
import FormBuilder, { FieldOption } from "@app/components/form";
import { BaseModalProps } from "@app/context/Modal.context";
import useAppMutation from "@app/hooks/useAppMutation.hook";
import { ISubject } from "@app/type/schema.type";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export interface IUpdateSubjectModalProps extends BaseModalProps {
  subject: ISubject;
}

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

export default function UpdateSubjectModal({
  onClose,
  subject,
}: IUpdateSubjectModalProps) {
  const route = useRouter();
  const { mutate: updateSubject } = useAppMutation(subjectApi.updateSubject, {
    onSuccess: () => {
      createToast("success", "Cập nhật môn học thành công");
      onClose?.();
    },
  });

  const initialValues = subject;

  const handleRedirectManageLesson = (record: ISubject) => {
    onClose?.();
    route.push(`/admin/subjects/${record.id}`);
  };

  const handleSubmit = (body: ICreateSubjectBody) => {
    updateSubject({
      body,
      pathIds: [subject.id],
    });
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => handleRedirectManageLesson(subject)}>
        Chỉnh sửa bài học
      </Button>
      <FormBuilder<ICreateSubjectBody>
        fields={fields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        button={{
          ok: "Cập nhật",
          cancel: "Hủy",
        }}
      />
    </div>
  );
}
