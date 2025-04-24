import { IPost, IUser } from "@app/type/schema.type";
import { createFetcher } from ".";

export interface IUpdateUserStatus extends Pick<IUser, "status"> {}

export interface IUpdateUserRole extends Pick<IUser, "role"> {}

export interface IAdminUpdateUser extends Pick<IUser, "status" | "role"> {}

export default {
  findUser: createFetcher<void, IUser[]>("users", "get"),
  getPostsByUser: createFetcher<void, IPost[]>("users/:id/posts", "get"),
  adminUpdateUser: createFetcher<IAdminUpdateUser, IUser>("users/:id", "put"),
  updateUserStatus: createFetcher<IUpdateUserStatus, IUser>(
    "users/:id/status",
    "put"
  ),
  updateUserRole: createFetcher<IUpdateUserRole, IUser>(
    "users/:id/role",
    "put"
  ),
  updateUser: createFetcher<IUser, IUser>("users", "put"),
};
