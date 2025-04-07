import React, { useState, useEffect } from "react";
import {
  Input,
  Badge,
  Avatar,
  Spin,
  Empty,
  Button,
  Tooltip
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  RightOutlined,
  UserAddOutlined,
  WechatWorkOutlined
} from "@ant-design/icons";
import groupChatApi from "@app/api/groupChat.api";
import useLazyLoadData from "@app/hooks/useLazyLoad.hook";
import { IGroupChat } from "@app/type/schema.type";
import { useDispatch } from "react-redux";
import { addSubPages } from "@app/store/slices/MenuSlice";

export default function PChat() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filters for chat types
  const filters = [
    { id: "all", label: "Tất cả" },
    { id: "group", label: "Nhóm" },
    { id: "unread", label: "Chưa đọc" },
    { id: "recent", label: "Gần đây" },
  ];

  // Load chat data with pagination
  const { data, loadMore, isLoading } = useLazyLoadData<undefined, IGroupChat>({
    fetchApi: groupChatApi.getGroupChats,
    options: { body: undefined },
  });

  useEffect(() => {
    loadMore();
  }, []);

  const handleRedirect = (id: string) => {
    dispatch(addSubPages({ key: "groupChat", props: { id } }));
  };

  const handleCreateNewChat = () => {
    if (!isCreatingChat) {
      setIsCreatingChat(true);
      return;
    }

    if (newChatName.trim()) {
      // TODO: Implement API call to create new chat
      // groupChatApi.createGroupChat({ name: newChatName });
      setNewChatName("");
      setIsCreatingChat(false);
    }
  };

  // Filter groups based on search query and selected filter
  const filteredGroups = data.filter(group => {
    const matchesSearch = group.name?.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "group") return matchesSearch;

    // For other filters, we can add logic when we have more data
    // For now, just return the search results
    return matchesSearch;
  });

  // Generate random last message and unread count for demo
  const getRandomLastMessage = (groupId: string) => {
    const messages = [
      "Xin chào mọi người!",
      "Bạn có thể giúp tôi được không?",
      "Chúng ta sẽ họp vào lúc 2 giờ chiều",
      "Cảm ơn vì thông tin",
      "Tôi đã hoàn thành nhiệm vụ"
    ];
    return messages[parseInt(groupId.charAt(0), 16) % messages.length];
  };

  const getRandomUnread = (groupId: string) => {
    return parseInt(groupId.charAt(1), 16) % 10;
  };

  const getRandomTime = (groupId: string) => {
    const hour = parseInt(groupId.charAt(2), 16) % 12 + 1;
    const minute = parseInt(groupId.charAt(3), 16) % 60;
    return `${hour}:${minute.toString().padStart(2, '0')}`;
  };

  // Handle scroll to load more data
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !isLoading) {
      loadMore();
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 w-full bg-white shadow-sm">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center">
            <WechatWorkOutlined className="text-blue-500 text-xl mr-2" />
            <h1 className="text-lg font-semibold">Nhóm Chat</h1>
          </div>
          <Tooltip title="Tạo nhóm chat mới">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={handleCreateNewChat}
              className="flex justify-center items-center"
            />
          </Tooltip>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm nhóm chat..."
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
          </div>
        </div>

        {/* New Chat Creation Form */}
        {isCreatingChat && (
          <div className="px-4 pb-3">
            <div className="flex gap-2">
              <Input
                placeholder="Tên nhóm chat mới"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                onPressEnter={handleCreateNewChat}
                className="rounded-lg"
              />
              <Button
                type="primary"
                onClick={handleCreateNewChat}
                icon={<UserAddOutlined />}
              >
                Tạo
              </Button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="px-4 pb-3 overflow-x-auto whitespace-nowrap">
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer
                  ${selectedFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 160px)" }}
        onScroll={handleScroll}
      >
        {isLoading && data.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <div
              key={group.id}
              className="px-4 py-3 bg-white border-b border-gray-100 cursor-pointer hover:bg-gray-50"
              onClick={() => handleRedirect(group.id)}
            >
              <div className="flex items-center">
                <div className="relative">
                  <Avatar
                    size={48}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                  >
                    {group.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  {getRandomUnread(group.id) > 0 && (
                    <Badge
                      count={getRandomUnread(group.id)}
                      className="absolute -top-1 -right-1"
                    />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">{group.name}</h3>
                    <span className="text-xs text-gray-500">{getRandomTime(group.id)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {getRandomLastMessage(group.id)}
                  </p>
                </div>
                <RightOutlined className="text-gray-300 ml-2" />
              </div>
            </div>
          ))
        ) : (
          <Empty
            description={searchQuery ? "Không tìm thấy nhóm chat" : "Chưa có nhóm chat nào"}
            className="mt-8"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}

        {/* Loading indicator at bottom */}
        {isLoading && data.length > 0 && (
          <div className="w-full py-4 flex justify-center">
            <Spin />
          </div>
        )}
      </div>

      {/* New Chat Button (FAB) */}
      {!isCreatingChat && (
        <button
          className="fixed right-4 bottom-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-700 transition-colors"
          onClick={handleCreateNewChat}
        >
          <PlusOutlined className="text-white text-xl" />
        </button>
      )}
    </div>
  );
}