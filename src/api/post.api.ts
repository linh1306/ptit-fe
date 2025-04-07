import { IComment, IPost } from "@app/type/schema.type";
import { IPaginationParams } from "@app/type/index.type";
import { createFetcher } from ".";

interface ICreatePostBody {
  content: string;
}

interface IUpdatePostBody {
  title?: string;
  content?: string;
  imageUrl?: string;
}

interface ICreateCommentBody {
  content: string;
  tags?: string[];
}

export default {
  getPosts: createFetcher<IPaginationParams, IPost[]>("posts", "get"),
  createPost: createFetcher<ICreatePostBody, IPost>("posts", "post"),
  getPostById: createFetcher<void, IPost>("posts/:id", "get"),
  updatePost: createFetcher<IUpdatePostBody, IPost>("posts/:id", "put"),
  likePost: createFetcher<void, void>("posts/:id/like", "put"),
  getCommentsByPostId: createFetcher<void, IComment[]>("posts/:id/comments", "get"),
  createComment: createFetcher<ICreateCommentBody, IComment>("posts/:id/comments", "post"),
  deletePost: createFetcher<void, void>("posts/:id", "delete")
};