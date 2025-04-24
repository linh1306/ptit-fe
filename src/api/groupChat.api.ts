import { IGroupChat, IMessage, TGroupChat } from "@app/type/schema.type";
import { createFetcher } from ".";

export interface ICreateGroupChatBody {
  name?: string;
  userId?: string;
  typeGroup?: TGroupChat;
}

// export type IAddUsToGroupChatBody = Pick<IGroupChat, "name" |"adminId">;

export interface IGetMessagesBody {
  groupChatId: string;
}

export type ICreateMessageBody = Pick<IMessage, "content">;

export type IAddUserToGroupChatBody = Pick<IGroupChat, "userIds">;

export default {
  getGroupChats: createFetcher<void, IGroupChat[]>("group-chat", "get"),
  createGroupChat: createFetcher<ICreateGroupChatBody, IGroupChat>(
    "group-chat",
    "post"
  ),
  getMessages: createFetcher<IGetMessagesBody, IMessage[]>(
    "group-chat/:groupChatId/messages",
    "get"
  ),
  createMessage: createFetcher<ICreateMessageBody, IMessage>(
    "group-chat/:groupChatId/messages",
    "post"
  ),
  addUserToGroupChat: createFetcher<IAddUserToGroupChatBody, void>(
    "group-chat/:groupChatId/users",
    "post"
  ),
  getUsersInGroupChat: createFetcher<void, IGroupChat[]>(
    "group-chat/:groupChatId/users",
    "get"
  ),
};
