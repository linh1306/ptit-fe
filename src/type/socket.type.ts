import { IMessage, IUser } from "./schema.type";

export interface ISocketMessage {
  mes: string;
  group: string;
  user: Pick<IUser, "id" | "name">;
}

export interface ISocketResponse {
  message: IMessage;
  user: Pick<IUser, "id" | "name">;
}

export interface ISocketEvents {
  joinRoom: (data: { groupId: string }) => void;
  sendMessage: (data: { mes: string; group: string }) => void;
  receiveMessage: (data: ISocketResponse) => void;
}
