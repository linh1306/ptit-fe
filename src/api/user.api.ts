import { IPost, IUser } from "@app/type/schema.type";
import { createFetcher } from ".";

export default {
  findUser: createFetcher<void, IUser[]>("users", "get"),
  getPostsByUser: createFetcher<void, IPost[]>("users/:id/posts", "get"),
  updateUserStatus: createFetcher<IUser, IUser>("users/:id/status", "put"),
  updateUserRole: createFetcher<IUser, IUser>("users/:id/role", "put"),
  updateUser: createFetcher<IUser, IUser>("users", "put"),
};