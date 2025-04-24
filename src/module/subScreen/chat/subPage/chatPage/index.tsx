"use client";

import { Avatar, Flex, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { timeDisplay } from "@app/common";
import LayoutSubPage from "@app/components/layout/LayoutSubPage";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@app/store";
import { IMessage } from "@app/type/schema.type";
import groupChatApi from "@app/api/groupChat.api";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import usePaginationParam from "@app/hooks/usePaginationParams.hook";
import { useAppSocket } from "@app/hooks/useAppSocket.hook";

export default function PChatSubScreen(props: any) {
  const { user } = useSelector((state: IRootState) => state.user);
  const groupChatId = props.id;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const { paginationQuery } = usePaginationParam();

  const { refetch } = useAppQuery(groupChatApi.getMessages, {
    queryKey: ["messages"],
    variables: { pathIds: [groupChatId], pagination: paginationQuery },
    onSuccess: (data) => {
      setMessages(data.data);
    },
  });

  const handleReceiveMessage = useCallback((data: IMessage) => {
    setMessages((prev) => [...prev, data]);
    setInputMessage("");
  }, []);

  const { isConnected, sendMessage } = useAppSocket({
    key: "CHAT",
    onEvents: {
      receiveMessage: handleReceiveMessage,
    },
  });

  const handleSendMessage = () => {
    if (!isConnected || !inputMessage.trim()) return;

    sendMessage({
      content: inputMessage,
      groupChatId: groupChatId,
    });
  };

  const getAlign = (index: number, position: "top" | "bottom") => {
    if (!messages[index]) return false;

    const currentSender = messages[index].senderId;
    const compareIndex = position === "top" ? index - 1 : index + 1;
    const compareSender = messages[compareIndex]?.senderId;

    return currentSender === compareSender;
  };
  return (
    <LayoutSubPage header={<h1>Chat</h1>}>
      <Flex vertical className="w-full h-full" justify="end" gap={10}>
        {/* Phần hiển thị tin nhắn */}
        <Flex
          vertical
          className="flex-1 overflow-y-auto py-2"
          justify="end"
          gap={3}
        >
          {messages.map((mes, index) => (
            <div key={mes.id}>
              <Flex
                data-aos="fade-down"
                data-aos-delay={(messages.length - index) * 100}
                vertical
                className="transition-all"
                key={mes.id}
                align={mes.senderId === user?.id ? "end" : "start"}
                justify="start"
              >
                {!getAlign(index, "top") && mes.senderId !== user?.id && (
                  <p className="text-[10px] font-semibold px-9 text-gray-600">
                    {mes.sender?.name}
                  </p>
                )}
                <Flex
                  gap={3}
                  className="w-full"
                  justify={mes.senderId === user?.id ? "end" : "start"}
                  align="start"
                >
                  <div className="aspect-square w-8">
                    {!getAlign(index, "top") && mes.senderId !== user?.id && (
                      <Avatar src={mes.sender?.urlImage ?? "/avatar.jpg"} />
                    )}
                  </div>
                  <Flex vertical className="group max-w-[75%]" tabIndex={0}>
                    <Flex
                      className={`rounded-xl px-2 py-1 min-w-[100px] ${
                        getAlign(index, "top") &&
                        (mes.senderId === user?.id
                          ? "rounded-tr-md"
                          : "rounded-tl-md")
                      } ${
                        getAlign(index, "bottom") &&
                        (mes.senderId === user?.id
                          ? "rounded-br-md"
                          : "rounded-bl-md")
                      } ${
                        mes.senderId === user?.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      <p>{mes.content}</p>
                    </Flex>
                    <p
                      className={`group-focus:block hidden text-[10px] font-semibold ${
                        mes.senderId === user?.id ? "text-end" : "text-start"
                      }`}
                    >
                      {timeDisplay(new Date(mes.createdAt))}
                    </p>
                  </Flex>
                </Flex>
              </Flex>
            </div>
          ))}
        </Flex>

        {/* Phần input tin nhắn */}
        <Input
          className="rounded-3xl"
          suffix={
            <SendOutlined
              onClick={handleSendMessage}
              className={
                isConnected && inputMessage.trim()
                  ? "cursor-pointer text-blue-500"
                  : "text-gray-400"
              }
            />
          }
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder={isConnected ? "Nhập tin nhắn..." : "Đang kết nối..."}
          disabled={!isConnected}
        />
      </Flex>
    </LayoutSubPage>
  );
}
