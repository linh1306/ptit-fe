import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IRootState, IAppDispatch } from "@app/store/store";
import { SocketManager } from "@app/service/Socket.service";
import Config, { KeySocket } from "@app/config";

interface ISocketInfo {
  url: string;
  isConnected: boolean;
  error: string;
}

interface ISocketStore {
  [key: string]: ISocketInfo | undefined;
}

const initialState: ISocketStore = {};

export const connectSocket = createAsyncThunk<
  void, 
  { key: KeySocket }, 
  { 
    state: IRootState, 
    dispatch: IAppDispatch 
  }
>(
  'socket/connectSocket',
  async ({ key }, { getState }) => {
    const state = getState();
    const token = state.user.token;
    const url = Config.SOCKET[key];

    if (!token) {
      throw new Error('No token available');
    }

    return new Promise<void>((resolve, reject) => {
      try {
        const socket = SocketManager.createOrGetSocket(key, url, token);
        
        socket.on('connect', () => resolve());
        socket.on('connect_error', (error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }
);

export const disconnectSocket = createAsyncThunk<
  void, 
  string, 
  { 
    state: IRootState, 
    dispatch: IAppDispatch 
  }
>(
  'socket/disconnectSocket',
  async (key) => {
    SocketManager.disconnectSocket(key);
  }
);

const SocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    updateSocketConnection: (state, action: PayloadAction<{
      key: KeySocket;
      isConnected: boolean;
      error?: string;
    }>) => {
      const { key, isConnected, error } = action.payload;
      if (state[key]) {
        state[key]!.isConnected = isConnected;
        state[key]!.error = error || '';
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectSocket.pending, () => {
        // Optional: Handle pending state
      })
      .addCase(connectSocket.fulfilled, () => {
        // Optional: Handle fulfilled state
      })
      .addCase(connectSocket.rejected, () => {
        // Optional: Handle rejected state
      });
  }
});

export const { updateSocketConnection } = SocketSlice.actions;

export default SocketSlice.reducer;