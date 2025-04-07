import { useCallback } from 'react';
import { IMessage } from '@app/type/schema.type';
import { useReduxData } from './useReduxData.hook';
import { connectSocket, disconnectSocket } from '@app/store/slices/SocketSlice';
import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '@app/store/store';
import { SocketManager } from '@app/service/Socket.service';
import { KeySocket } from '@app/config';

interface UseSocketChatProps {
  key: KeySocket;
  onReceiveMessage?: (message: IMessage) => void;
}

export const useSocketChat = ({ key, onReceiveMessage }: UseSocketChatProps) => {
  const dispatch = useAppDispatch();
  const { user } = useReduxData();
  const token = user?.token ?? '';

  const socketInfo = useSelector((state: IRootState) => {
    if (!state.socket[key]) {
      dispatch(connectSocket({
        key
      }));
    }
    return state.socket[key];
  });

  const connectSocketManually = useCallback(() => {
    if (!token) {
      console.warn('No token to establish socket connection');
      return;
    }

    return dispatch(connectSocket({
      key
    }));
  }, [token, dispatch, key]);

  const disconnectSocketManually = useCallback(() => {
    return dispatch(disconnectSocket(key));
  }, [dispatch, key]);

  const setupSocketListeners = useCallback(() => {
    const socket = SocketManager.getSocket('CHAT');

    if (socket) {
      socket.on('receiveMessage', (message: IMessage) => {
        onReceiveMessage?.(message);
      });

      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      socket.on('disconnect', (reason) => {
        console.warn('Socket disconnected:', reason);
      });
    }
  }, [onReceiveMessage, key]);

  const sendMessage = useCallback(
    (data: { content: string; groupChatId: string }) => {
      if (!socketInfo?.isConnected) {
        console.warn("Cannot send message, WebSocket not connected");
        return false;
      }

      const socket = SocketManager.getSocket('CHAT');

      if (!socket) {
        console.warn("Socket not found");
        return false;
      }

      socket.emit('sendMessage', {
        ...data,
        token: token
      });

      return true;
    },
    [socketInfo?.isConnected, key, token]
  );

  return {
    isConnected: socketInfo?.isConnected || false,
    error: socketInfo?.error,
    sendMessage,
    connectSocket: connectSocketManually,
    disconnectSocket: disconnectSocketManually,
    setupSocketListeners
  };
};