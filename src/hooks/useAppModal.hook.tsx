import { useMemo } from "react";
import {
  ModalOptions,
  useModal,
  ModalComponent,
} from "@app/context/Modal.context";

export type AppModalDef<P = {}> = {
  header: React.ReactNode | string;
  component: ModalComponent<P>;
  options?: ModalOptions;
};

export type ModalControls<T extends Record<string, AppModalDef<any>>> = {
  [K in keyof T]: T[K] extends AppModalDef<infer P>
    ? (props: P, options?: ModalOptions) => void
    : never;
} & {
  closeModal: () => void;
  closeAllModals: () => void;
};

export function useAppModal<T extends Record<string, AppModalDef<any>>>(
  modals: T
): ModalControls<T> {
  const {
    openModal: contextOpenModal,
    closeModal,
    closeAllModals,
  } = useModal();

  const modalControls = useMemo(() => {
    const result = {} as ModalControls<T>;

    result.closeModal = closeModal;
    result.closeAllModals = closeAllModals;

    Object.keys(modals).forEach((modalKey) => {
      const key = modalKey as keyof T;
      const modalData = modals[key];

      // @ts-ignore
      result[key] = (props: any, options?: ModalOptions) => {
        const header = modalData.header;
        const modalOptions = { ...modalData.options, ...options };
        const Component = modalData.component;

        return contextOpenModal({
          header,
          component: <Component {...props} onClose={() => closeModal()} />,
          options: modalOptions,
        });
      };
    });

    return result;
  }, [modals, contextOpenModal, closeModal, closeAllModals]);

  return modalControls;
}
