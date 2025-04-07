import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import UserReducer from "./slices/UserSlice";
import MenuReducer from "./slices/MenuSlice";
import SettingReducer from "./slices/SettingSlice";
import SocketReducer from "./slices/SocketSlice";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const createNoopStorage = (): {
  getItem: (_key: string) => Promise<null>;
  setItem: (_key: string, value: unknown) => Promise<unknown>;
  removeItem: (_key: string) => Promise<void>;
} => {
  return {
    getItem(): Promise<null> {
      return Promise.resolve(null);
    },
    setItem(_key, value): Promise<unknown> {
      return Promise.resolve(value);
    },
    removeItem(): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "state",
  version: 1,
  storage: storage,
};

const rootReducers = combineReducers({
  user: UserReducer,
  menu: MenuReducer,
  setting: SettingReducer,
  socket: SocketReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type IRootState = ReturnType<typeof store.getState>;

export type IAppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<IAppDispatch>();
