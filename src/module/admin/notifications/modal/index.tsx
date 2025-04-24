import { AppModalDef } from "@app/hooks/useAppModal.hook";
import CreateNotificationModal, { ICreateNotificationModalProps } from "./createNotification.modal";

const modals = {
  createNotification: {
    header: "Tạo thông báo",
    component: CreateNotificationModal,
  } as AppModalDef<ICreateNotificationModalProps>,
};

export default modals;
