import { io, Socket } from 'socket.io-client';

export class SocketManager {
  private static instances: { [key: string]: Socket } = {};

  static createOrGetSocket(key: string, url: string, token: string): Socket {
    // Nếu socket đã tồn tại, disconnect nó trước
    if (this.instances[key]) {
      this.disconnectSocket(key);
    }

    const socket = io(url, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 5000
    });

    // Lưu instance mới
    this.instances[key] = socket;

    return socket;
  }

  static disconnectSocket(key: string): void {
    const socket = this.instances[key];
    if (socket) {
      socket.disconnect();
      delete this.instances[key];
    }
  }

  static getSocket(key: string): Socket | undefined {
    return this.instances[key];
  }
}