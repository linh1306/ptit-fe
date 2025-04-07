"use client";
import React from "react";
import { Avatar, Flex } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { removeSubPages } from "@app/store/slices/MenuSlice";
import { useDispatch } from "react-redux";

export default function LayoutSubPage({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch(removeSubPages());
  };
  return (
    <Flex
      vertical
      className="animate-move-left absolute border-2 h-full w-full bg-bg-light dark:bg-bg-dark dark:text-text-dark"
      justify="center"
      align="center"
    >
      <Flex align="center" className="h-12 w-full border-b-2 px-3" gap={10}>
        <Avatar
          className="aspect-square"
          onClick={handleBack}
          icon={<LeftOutlined />}
        />
        {header}
      </Flex>
      <Flex className="flex-1 rounded-lg p-5 w-full bg-white">{children}</Flex>
    </Flex>
  );
}
