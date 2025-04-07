"use client";

import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Input, List, message } from "antd";
import { IPost } from "@app/type/schema.type";
import postApi from "@app/api/post.api";
import { useReduxData } from "@app/hooks/useReduxData.hook";
import useApiMutation from "@app/hooks/useApiMutation.hook";
import PostItem from "./components/postItem";

const PostsPage = () => {
  const [newPostContent, setNewPostContent] = useState("");
  const { user } = useReduxData();
  const { data: posts, mutate: getPosts, isLoading } = useApiMutation(postApi.getPosts, {
    setQueryData: {
      queryKey: ['posts']
    },
  });
  const { mutate: createPost } = useApiMutation(postApi.createPost, {
    onSuccess: () => {
      message.success("Đăng bài thành công");
      setNewPostContent("");
      getPosts({});
    },
    onError: () => {
      message.error("Đăng bài thất bại");
    },
  });

  useEffect(() => {
    getPosts({});
  }, []);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      message.warning("Vui lòng nhập nội dung bài đăng");
      return;
    }
    createPost({ body: { content: newPostContent } });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Card>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Avatar src={user?.user?.urlImage || "/avatar.jpg"} />
            <span>{user?.user?.name}</span>
          </div>
          <Input.TextArea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Bạn đang nghĩ gì?"
            autoSize={{ minRows: 3 }}
          />
          <Button
            type="primary"
            onClick={handleCreatePost}
            loading={isLoading}
          >
            Đăng bài
          </Button>
        </div>
      </Card>

      <List
        dataSource={posts}
        renderItem={(post: IPost) => (
          <PostItem key={post.id} post={post} getPosts={()=>getPosts({})} />
        )}
      />
    </div>
  );
};

export default PostsPage;
