import { INotification, IUserNotification } from "@app/type/schema.type";
import { createFetcher } from ".";

export interface ICreateNotification {
  content: string;
  url: string;
}

export default {
  getNotifications: createFetcher<void, IUserNotification[]>(
    "notifications",
    "get"
  ),
  adminGetNotification: createFetcher<void, INotification[]>(
    "admin/notifications",
    "get"
  ),
  createNotification: createFetcher<ICreateNotification, INotification>(
    "notifications",
    "post"
  ),
  markAsRead: createFetcher<void, void>("notifications/:id/read", "post"),
  markAllAsRead: createFetcher<void, void>("notifications/read-all", "post"),
  deleteNotification: createFetcher<void, void>("notifications/:id", "delete"),
};
