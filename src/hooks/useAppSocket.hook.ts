import { useEffect } from "react";
import { IMessage, INotification } from "@app/type/schema.type";
import { SocketManager } from "@app/service/Socket.service";
import { KeySocket } from "@app/config/index.config";

export const SOCKET_EVENTS = {
  CHAT: {
    pub: {
      sendMessage: "sendMessage",
    },
    sub: {
      receiveMessage: "receiveMessage",
    },
  },
  NOTIFICATION: {
    pub: {},
    sub: {
      receiveNotification: "receiveNotification",
    },
  },
} as const;

export type SocketEventMap = {
  CHAT: {
    pub: {
      sendMessage: Pick<IMessage, "content" | "groupChatId">;
    };
    sub: {
      receiveMessage: (message: IMessage) => void;
    };
  };
  NOTIFICATION: {
    pub: Record<string, never>;
    sub: {
      receiveNotification: (notification: INotification) => void;
    };
  };
};

type SubEventHandlers<T extends KeySocket> = {
  [K in keyof SocketEventMap[T]["sub"]]: SocketEventMap[T]["sub"][K];
};

interface UseSocketProps<T extends KeySocket> {
  key: T;
  onEvents?: Partial<SubEventHandlers<T>>;
}

type SocketResult<T extends KeySocket> = {
  isConnected: boolean;
} & {
  [K in keyof SocketEventMap[T]["pub"]]: (
    data: SocketEventMap[T]["pub"][K]
  ) => void;
};

export const useAppSocket = <T extends KeySocket>({
  key,
  onEvents,
}: UseSocketProps<T>): SocketResult<T> => {
  const socketInfo = SocketManager.connectSocket(key);

  useEffect(() => {
    if (onEvents && socketInfo.io) {
      Object.entries(onEvents).forEach(([eventHandlerName, handler]) => {
        if (typeof handler === "function") {
          const eventName = eventHandlerName;
          const eventHandler = handler as (...args: any[]) => void;
          socketInfo.io.on(eventName, eventHandler);
        }
      });

      return () => {
        if (socketInfo.io) {
          Object.entries(onEvents).forEach(([eventHandlerName, handler]) => {
            if (typeof handler === "function") {
              const eventName = eventHandlerName;
              const eventHandler = handler as (...args: any[]) => void;
              socketInfo.io.off(eventName, eventHandler);
            }
          });
        }
      };
    }
  }, [socketInfo.io, onEvents]);

  const pubFunctions = {} as {
    [K in keyof SocketEventMap[T]["pub"]]: (
      data: SocketEventMap[T]["pub"][K]
    ) => void;
  };

  // Tạo các hàm emit tương ứng với pub events
  if (socketInfo.io) {
    // Sử dụng SOCKET_EVENTS thay vì SocketEventMap
    const pubEvents = SOCKET_EVENTS[key].pub;

    // Duyệt qua các pub events và tạo các hàm tương ứng
    Object.keys(pubEvents).forEach((eventName) => {
      pubFunctions[eventName as keyof typeof pubFunctions] = (data: any) => {
        socketInfo.io.emit(eventName, data);
      };
    });
  }

  return {
    isConnected: socketInfo?.isConnected || false,
    ...pubFunctions,
  } as SocketResult<T>;
};
