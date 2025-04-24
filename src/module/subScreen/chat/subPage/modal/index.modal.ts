import { AppModalDef } from "@app/hooks/useAppModal.hook";
import CreateGroupChatModal, {
  ICreateGroupChatModalProps,
} from "./createGroupChat.modal";

const modals = {
  createGroupChat: {
    header: "Tạo Nhóm Chat",
    component: CreateGroupChatModal,
  } as AppModalDef<ICreateGroupChatModalProps>,
};

export default modals;
