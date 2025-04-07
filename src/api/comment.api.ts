import { IComment } from "@app/type/schema.type";
import { createFetcher } from ".";

type IUpdateCommentBody = Pick<IComment, 'content' | 'tags'>;

export default {
  updateComment: createFetcher<IUpdateCommentBody, IComment>("comments/:id", "post"),
  deleteComment: createFetcher<void, void>("comments/:id", "delete")
};