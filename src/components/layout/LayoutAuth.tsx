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
      className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100"
      justify="center"
      align="center"
    >
      <div className="absolute inset-0 w-full h-full">
        <Image
          className="w-full h-full object-cover opacity-70"
          src={"/backgroud-auth.jpg"}
          width={2000}
          height={1000}
          alt="background"
          priority
        />
      </div>
      <Flex 
        className="absolute rounded-xl p-8 min-h-[450px] max-w-[600px] min-w-[420px] backdrop-blur-md bg-white/80 shadow-lg
        border border-white/20 transition-all duration-300 hover:shadow-xl"
      >
        <div className="w-full">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600
            flex items-center justify-center shadow-lg">
            <Image
              src="/avatar.jpg"
              width={56}
              height={56}
              alt="logo"
              className="rounded-full"
            />
          </div>
          {children}
        </div>
      </Flex>
    </Flex>
  );
}
