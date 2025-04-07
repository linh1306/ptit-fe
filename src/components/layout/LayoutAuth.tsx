"use client";
import React from "react";
import { Flex } from "antd";
import Image from "next/image";

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      className="relative h-screen w-screen overflow-hidden bg-blue-100"
      justify="center"
      align="center"
    >
      <Image
        className="w-screen h-screen"
        src={"/backgroud-auth.jpg"}
        width={2000}
        height={500}
        alt="image"
      />
      <Flex className="absolute rounded-lg p-5 min-h-72 min-w-96 bg-white">
        {children}
      </Flex>
    </Flex>
  );
}
