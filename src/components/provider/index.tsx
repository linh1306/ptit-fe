"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import store, { persistor } from "@app/store/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "../loading";
import { ModalProvider } from "@app/context/Modal.context";

const queryClient = new QueryClient();

export default function ProviderGlobal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ModalProvider>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <AntdRegistry>{children}</AntdRegistry>
          </PersistGate>
        </ModalProvider>
      </Provider>
    </QueryClientProvider>
  );
}
