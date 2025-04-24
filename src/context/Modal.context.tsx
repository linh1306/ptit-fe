"use client";
import { Button, Flex } from "antd";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CloseOutlined } from "@ant-design/icons";

export interface ModalOptions {
  width?: string | number;
  height?: string | number;
  closeOnOutsideClick?: boolean;
  className?: string;
}

export interface BaseModalProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export type ModalComponent<P = {}> = React.ComponentType<P & BaseModalProps>;

export interface ModalInfo {
  header: ReactNode | string;
  component: React.ReactNode;
  options?: ModalOptions;
}

export interface ModalContextType {
  openModal: (modalInfo: ModalInfo) => void;
  closeModal: (modalId?: string) => void;
  closeAllModals: () => void;
  modals: ModalInfo[];
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalContainer = () => {
  const { modals, closeModal } = useModal();

  const handleClick = (
    event: React.MouseEvent,
    closeOnOutsideClick?: boolean
  ) => {
    if (event.target === event.currentTarget && closeOnOutsideClick !== false) {
      closeModal();
    }
  };

  // Ngăn scroll khi modal hiển thị
  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modals.length]);

  return (
    <Flex
      hidden={modals.length === 0}
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50"
      justify="center"
      align="center"
    >
      {modals.map((modal, index) => (
        <Flex
          data-aos="fade-down"
          key={index}
          className={`absolute ${
            index === modals.length - 1 ? "modal-active" : "modal-inactive"
          }`}
          justify="center"
          align="center"
          onClick={(e) => handleClick(e, modal.options?.closeOnOutsideClick)}
          style={{
            zIndex: 100 + index,
            width: "100%",
            height: "100%",
          }}
        >
          <Flex
            vertical
            className={`bg-white rounded-lg shadow-xl ${
              modal.options?.className || ""
            }`}
            style={{
              width: modal.options?.width || "600px",
              height: modal.options?.height || "auto",
              maxWidth: "90vw",
              maxHeight: "90vh",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Flex
              className="w-full border-b-2 p-3"
              align="center"
              justify="space-between"
            >
              <div className="font-medium text-lg">{modal.header}</div>
              <Button
                size="small"
                className="rounded-full hover:bg-gray-100"
                icon={<CloseOutlined />}
                onClick={() => closeModal()}
              />
            </Flex>
            <Flex vertical className="p-3 overflow-auto flex-1">
              {modal.component}
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalInfo[]>([]);

  const openModal = (modalInfo: ModalInfo) => {
    setModals((prev) => [...prev, modalInfo]);
  };

  const closeModal = () => {
    setModals((prev) => prev.slice(0, -1));
  };

  const closeAllModals = () => {
    setModals([]);
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, closeAllModals, modals }}
    >
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
