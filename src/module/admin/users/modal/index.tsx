import { AppModalDef } from "@app/hooks/useAppModal.hook";
import UserModal, { IUserModalProps } from "./user.modal";

const modals = {
  updateUser: {
    header: "Chỉnh sửa người dùng",
    component: UserModal,
  } as AppModalDef<IUserModalProps>,
};

export default modals;
