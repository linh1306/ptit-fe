import CreateSubjectsModal from "./createSubjects.modal";
import UpdateSubjectModal from "./updateSubject.modal";

const modals = {
  createSubjects: {
    header: "Tạo môn học",
    component: CreateSubjectsModal,
  },
  updateSubject: {
    header: "Chỉnh sửa môn học",
    component: UpdateSubjectModal,
  },
};

export default modals;