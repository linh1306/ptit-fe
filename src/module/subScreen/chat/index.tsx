import React, { useState, useEffect } from "react";
import {
  Input,
  Badge,
  Avatar,
  Empty,
  Button,
  Tooltip,
  List,
  Segmented,
  Flex,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  RightOutlined,
  UserAddOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
import groupChatApi from "@app/api/groupChat.api";
import useLazyLoadData from "@app/hooks/useLazyLoad.hook";
import { IGroupChat } from "@app/type/schema.type";
import { useDispatch } from "react-redux";
import { addSubPages } from "@app/store/slices/MenuSlice";
import { Loading } from "@app/components/loading";
import { useAppModal } from "@app/hooks/useAppModal.hook";
import modals from "./subPage/modal/index.modal";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import usePaginationParam from "@app/hooks/usePaginationParams.hook";

const filters = [
  { value: undefined, label: "All" },
  { value: "group", label: "Nhóm" },
  { value: "classroom", label: "Lớp học" },
  { value: "community", label: "Cộng đồng" },
];

export default function PChat() {
  const dispatch = useDispatch();
  const modal = useAppModal(modals);

  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState<IGroupChat[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
    undefined
  );

  const { pagination, paginationQuery, setPagination, resetPagination } =
    usePaginationParam();

  const { isLoading, refetch } = useAppQuery(groupChatApi.getGroupChats, {
    queryKey: ["groups"],
    variables: {
      body: undefined,
      pagination: paginationQuery,
      params: {
        key: searchQuery,
        type: selectedFilter,
      },
    },
    onSuccess: (data) => {
      if (pagination.page < (data.metadata?.total ?? 0)) {
        setGroups((prev) => [...prev, ...data.data]);
        setPagination(data.metadata ?? pagination);
      }
    },
  });

  const handleClickGroup = (id: string) => {
    dispatch(addSubPages({ key: "groupChat", props: { id } }));
  };

  const handleCreateNewChat = () => {
    modal.createGroupChat({
      onSuccess: () => {
        refetch();
      },
    });
    return;
  };

  const handleChangeSearch = (value: string) => {
    setSearchQuery(value);
    setGroups([]);
    resetPagination();
  };

  const handleChangeFilter = (value: any) => {
    setSelectedFilter(value);
    setGroups([]);
    resetPagination();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop <= clientHeight &&
      !isLoading &&
      (pagination?.total ?? 0) > groups.length
    ) {
      refetch();
    }
  };

  return (
    <Flex vertical gap={6} className="w-full h-full">
      <Flex gap={6}>
        <Input
          placeholder="Tìm kiếm nhóm chat..."
          className="px-3 bg-gray-100 border-none"
          value={searchQuery}
          onChange={(e) => handleChangeSearch(e.target.value)}
          allowClear
        />
        <Tooltip title="Tạo nhóm chat mới">
          <Button
            type="primary"
            className="aspect-square"
            icon={<UserAddOutlined />}
            onClick={handleCreateNewChat}
          />
        </Tooltip>
      </Flex>

      <Segmented
        options={filters}
        onChange={(value) => handleChangeFilter(value)}
      />

      <div className="overflow-y-auto" onScroll={handleScroll}>
        <List
          loading={{
            spinning: isLoading,
            indicator: <Loading />,
          }}
          itemLayout="horizontal"
          dataSource={groups}
          renderItem={(item, index) => (
            <List.Item
              className="cursor-pointer"
              onClick={() => handleClickGroup(item.id)}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={item.name}
                description={item.lastMessage || "Hãy bắt đầu cuộc trò chuyện"}
              />
            </List.Item>
          )}
        />
      </div>
    </Flex>
  );
}
