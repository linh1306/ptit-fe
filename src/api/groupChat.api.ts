import { IGroupChat, IMessage, TGroupChat } from "@app/type/schema.type";
import { createFetcher } from ".";

interface ICreateGroupChatBody {
  name?: string;
  userId?: string;
  typeGroup?: TGroupChat;
}

interface IGetMessagesBody {
  groupChatId: string;
}

type ICreateMessageBody = Pick<IMessage, 'content'>;

type IAddUserToGroupChatBody = Pick<IGroupChat, 'userIds'>;

export default {
  getGroupChats: createFetcher<void, IGroupChat[]>("group-chat", "get"),
  createGroupChats: createFetcher<ICreateGroupChatBody, IGroupChat>("group-chat", "post"),
  getMessages: createFetcher<IGetMessagesBody, IMessage[]>("group-chat/:groupChatId/messages", "get"),
  createMessage: createFetcher<ICreateMessageBody, IMessage>("group-chat/:groupChatId/messages", "post"),
  addUserToGroupChat: createFetcher<IAddUserToGroupChatBody, void>("group-chat/:groupChatId/users", "post"),
  getUsersInGroupChat: createFetcher<void, IGroupChat[]>("group-chat/:groupChatId/users", "get"),
};