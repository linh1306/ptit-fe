import { AppModalDef } from "@app/hooks/useAppModal.hook";
import CommentModal, { ICommentModalProps } from "./comment.modal";
import PostModal from "./post.modal";

const modals = {
  comments: {
    header: "Bình luận",
    component: CommentModal,
  } as AppModalDef<ICommentModalProps>,
  posts: {
    header: "Bình luận",
    component: PostModal,
  } as AppModalDef<undefined>,
};

export default modals;
