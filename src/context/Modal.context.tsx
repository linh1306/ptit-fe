"use client";
import { Button, Flex } from "antd";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { CloseOutlined } from "@ant-design/icons";

interface ModalContextType {
  openModal: (header: ReactNode | string, modal: React.ReactNode) => void;
  closeModal: () => void;
  modals: ReactNode[];
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalContainer = () => {
  const { modals, closeModal } = useModal();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  return (
    <Flex
      hidden={modals.length === 0}
      className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50"
      justify="center"
      align="center"
      onClick={handleClick}
    >
      <Flex className="relative min-w-[600px] h-80 w-80 bg-white rounded-lg">
        {modals}
      </Flex>
    </Flex>
  );
};
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ReactNode[]>([]);

  const openModal = (header: ReactNode, modal: ReactNode) => {
    const customModal = (
      <Flex
        vertical
        key={modals.length}
        className="absolute move-up top-0 w-full"
      >
        <Flex
          className="w-full border-b-2 p-3"
          align="center"
          justify="space-between"
        >
          {header}
          <Button
            size="small"
            className="rounded-full"
            icon={<CloseOutlined />}
            onClick={closeModal}
          />
        </Flex>
        <Flex className="p-3">{modal}</Flex>
      </Flex>
    );
    setModals((props) => [...props, customModal]);
  };
  const closeModal = () => setModals((props) => props.slice(0, -1));

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modals }}>
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
