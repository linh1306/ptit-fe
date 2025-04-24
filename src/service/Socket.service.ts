import Config, { KeySocket } from "@app/config/index.config";
import { io, Socket } from "socket.io-client";

interface ISocketInfo {
  io: Socket;
  addedEvent: boolean;
  isConnected: boolean;
}

export class SocketManager {
  private static instances: {
    [key: string]: ISocketInfo;
  } = {};

  static connectSocket(key: KeySocket): ISocketInfo {
    const token = localStorage.getItem(Config.LOCALSTORATE.TOKEN);
    const url = Config.SOCKET[key];

    const socket: ISocketInfo = this.getSocket(key) ?? {
      io: io(url, {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 5000,
      }),
      addedEvent: false,
      isConnected: false,
    };
    this.instances[key] = socket

    if (!socket.addedEvent) {
      socket.io.on("connect", () => {
        this.instances[key].isConnected = true;
      });
      socket.io.on("connect_error", () => {
        this.instances[key].isConnected = false;
      });
      socket.io.on("disconnect", () => {
        this.instances[key].isConnected = false;
      });
      socket.addedEvent = true;
    }
    return socket;
  }

  static disconnectSocket(key: string): void {
    const socket = this.instances[key];
    if (socket) {
      socket.io.disconnect();
      delete this.instances[key];
    }
  }

  static getSocket(key: string): ISocketInfo | undefined {
    return this.instances[key];
  }
}
