"use client";

import { Avatar, Flex, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { timeDisplay } from "@app/common";
import LayoutSubPage from "@app/components/layout/LayoutSubPage";
import { useCallback, useEffect, useState } from "react";
import { useSocketChat } from "@app/hooks/useSocket.hook";
import { useSelector } from "react-redux";
import { IRootState } from "@app/store/store";
import { IMessage } from "@app/type/schema.type";
import groupChatApi from "@app/api/groupChat.api";
import useApiMutation from "@app/hooks/useApiMutation.hook";

export default function PChatSubScreen(props: any) {
  const { user } = useSelector((state: IRootState) => state.user);
  const groupChatId = props.id;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const { mutate: getMessages } = useApiMutation(groupChatApi.getMessages, {
    onSuccess: (data) => setMessages(data.data),
    setQueryData: {
      queryKey: ["messages"]
    }
  });

  useEffect(() => {
    if (groupChatId) {
      getMessages({
        body: {
          groupChatId
        }
      });
    };
  }, [groupChatId]);

  const handleReceiveMessage = useCallback((data: IMessage) => {
    setMessages((prev) => [...prev, data]);
    setInputMessage("");
  }, []);

  const { isConnected, sendMessage } = useSocketChat({
    key: 'CHAT',
    onReceiveMessage: handleReceiveMessage,
  });

  const handleSendMessage = () => {
    if (!isConnected || !inputMessage.trim()) return;

    sendMessage({
      content: inputMessage,
      groupChatId: groupChatId
    });
  };

  const shouldShowSenderName = (currentMessage: IMessage, index: number) => {
    // Không hiển thị tên nếu là tin nhắn của chính mình
    if (currentMessage.senderId === user?.id) return false;

    // Nếu là tin nhắn đầu tiên hoặc người gửi khác với tin nhắn trước đó
    if (index === 0 || currentMessage.senderId !== messages[index - 1]?.senderId) {
      return true;
    }

    return false;
  };

  return (
    <LayoutSubPage header={<h1>Chat</h1>}>
      <Flex vertical className="w-full h-full" gap={10}>
        {/* Phần hiển thị tin nhắn */}
        <Flex
          vertical
          className="flex-1 overflow-y-auto py-2"
          justify="end"
          gap={3}
        >
          {messages.map((item, index) => (
            <Flex
              vertical
              className="transition-all"
              key={item.id}
              align={item.senderId === user?.id ? "end" : "start"}
              justify="start"
            >
              {shouldShowSenderName(item, index) && (
                <p className="text-[10px] px-3 text-gray-600">
                  {item.sender?.name}
                </p>
              )}
              <Flex
                gap={3}
                className="w-full"
                justify={item.senderId === user?.id ? "end" : "start"}
                align="end"
              >
                <div className="aspect-square w-8">
                  {!shouldShowSenderName(item, index) ? null : (
                    <Avatar src={item.sender?.urlImage ?? '/avatar.jpg'} />
                  )}
                </div>
                <Flex vertical className="group max-w-[75%]" tabIndex={0}>
                  <p
                    className={`group-focus:block hidden text-[10px] px-3 ${item.senderId === user?.id ? "text-end" : "text-start"
                      }`}
                  >
                    {timeDisplay(new Date(item.createdAt))}
                  </p>
                  <Flex
                    className={`rounded-2xl px-2 py-1 ${item.senderId === user?.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                      }`}
                  >
                    <p>{item.content}</p>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Flex>

        {/* Phần input tin nhắn */}
        <Input
          className="rounded-3xl"
          suffix={
            <SendOutlined
              onClick={handleSendMessage}
              className={isConnected && inputMessage.trim() ? "cursor-pointer text-blue-500" : "text-gray-400"}
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