"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import store, { persistor } from "@app/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "../loading";
import { ModalProvider } from "@app/context/Modal.context";
import { ConfigProvider } from "antd";
import Empty from "../empty";

const queryClient = new QueryClient();

export default function ProviderGlobal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ConfigProvider renderEmpty={Empty}>
          <ModalProvider>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <AntdRegistry>{children}</AntdRegistry>
            </PersistGate>
          </ModalProvider>
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  );
}
