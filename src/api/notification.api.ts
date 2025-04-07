import { INotification } from "@app/type/schema.type";
import { createFetcher } from ".";

export default {
  getNotifications: createFetcher<void, INotification[]>("notifications", "get"),
  createNotification: createFetcher<Partial<INotification>, INotification>("notifications", "post"),
  markAsRead: createFetcher<void, void>("notifications/:id/read", "post"),
  markAllAsRead: createFetcher<void, void>("notifications/read-all", "post"),
  deleteNotification: createFetcher<void, void>("notifications/:id", "delete"),
};