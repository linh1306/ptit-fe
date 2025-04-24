"use client";

import React, { useState } from "react";
import { Card, Avatar, Button, Input, message, List } from "antd";
import { IPost } from "@app/type/schema.type";
import postApi from "@app/api/post.api";
import { useReduxData } from "@app/hooks/useReduxData.hook";
import PostItem from "./components/postItem";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import useAppMutation from "@app/hooks/useAppMutation.hook";

const PostsPage = () => {
  const [newPostContent, setNewPostContent] = useState("");
  const { user } = useReduxData();
  const {
    data: posts,
    refetch,
    isLoading,
  } = useAppQuery(postApi.getPosts, {
    queryKey: ["posts"],
  });
  const { mutate: createPost } = useAppMutation(postApi.createPost, {
    onSuccess: () => {
      message.success("Đăng bài thành công");
      setNewPostContent("");
      refetch();
    },
    onError: () => {
      message.error("Đăng bài thất bại");
    },
  });

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      message.warning("Vui lòng nhập nội dung bài đăng");
      return;
    }
    createPost({ body: { content: newPostContent } });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <Card className="shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar 
              src={user?.user?.urlImage || "/avatar.jpg"}
              size="large"
              className="border-2 border-blue-100 dark:border-gray-700"
            />
            <div>
              <span className="font-medium text-gray-800 dark:text-gray-200">{user?.user?.name}</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Chia sẻ suy nghĩ của bạn</p>
            </div>
          </div>
          <Input.TextArea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Bạn đang nghĩ gì?"
            autoSize={{ minRows: 3, maxRows: 6 }}
            className="rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
          />
          <div className="flex justify-end">
            <Button 
              type="primary" 
              onClick={handleCreatePost} 
              loading={isLoading}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 border-0 hover:from-blue-600 hover:to-indigo-600"
              size="large"
            >
              Đăng bài
            </Button>
          </div>
        </div>
      </Card>

      <List
        loading={isLoading}
        dataSource={posts}
        renderItem={(post: IPost) => (
          <PostItem key={post.id} post={post} refetch={refetch} />
        )}
        locale={{ emptyText: (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Chưa có bài viết nào</p>
          </div>
        )}}
      />
    </div>
  );
};

export default PostsPage;
