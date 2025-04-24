"use client";
import React from "react";
import {
  CommentOutlined,
  EllipsisOutlined,
  LikeOutlined,
  LikeFilled,
} from "@ant-design/icons";
import { Avatar, Card, Dropdown, Space, message } from "antd";
import { IPost } from "@app/type/schema.type";
import useAppMutation from "@app/hooks/useAppMutation.hook";
import postApi from "@app/api/post.api";
import { useAppModal } from "@app/hooks/useAppModal.hook";
import modals from "../modal";
const dropdownItems = [
  {
    key: "1",
    label: "Lưu bài viết",
  },
  {
    key: "2",
    label: "Báo cáo",
  },
  {
    key: "3",
    label: "Ẩn bài viết",
  },
];
const PostItem = ({ post, refetch }: { post: IPost; refetch: () => void }) => {
  const currentUserId = post.user?.id || "";
  const isLiked = post.likes.includes(currentUserId);
  const modal = useAppModal(modals);

  const { mutate: likePost } = useAppMutation(postApi.likePost, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      message.error("Thích bài thất bại");
    },
  });

  const handleLikePost = () => {
    likePost({ pathIds: [post.id] });
  };

  const handleCommentClick = () => {
    modal.comments({ postId: post.id || "" });
  };

  const getActions = () => {
    return [
      <div
        key="like"
        onClick={() => handleLikePost()}
        className="flex items-center justify-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer py-2"
      >
        {isLiked ? (
          <LikeFilled className="text-blue-500" />
        ) : (
          <LikeOutlined />
        )}
        <span className={`${isLiked ? 'text-blue-500' : ''}`}>
          {post.likes?.length || 0}
        </span>
      </div>,
      <div
        key="comment"
        onClick={handleCommentClick}
        className="flex items-center justify-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer py-2"
      >
        <CommentOutlined />
        <span>{post.comments?.length || 0}</span>
      </div>,
      <Dropdown
        key="ellipsis"
        menu={{ items: dropdownItems }}
        placement="bottomRight"
        className="hover:text-blue-500 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-center py-2">
          <EllipsisOutlined />
        </div>
      </Dropdown>,
    ];
  };

  return (
    <>
      <Card
        className="w-full mx-auto mb-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        actions={getActions()}
        style={{ minWidth: 300 }}
        bodyStyle={{ padding: '1.5rem' }}
      >
        <Card.Meta
          avatar={
            <Avatar 
              src={post.user?.urlImage || "/avatar.jpg"} 
              size="large"
              className="border-2 border-blue-100 dark:border-gray-700"
            />
          }
          title={
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-gray-200">{post.user?.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
          }
          description={
            <div className="mt-3">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{post.content}</p>
              {/* {post.image && (
                <div className="rounded-lg overflow-hidden mt-4">
                  <img
                    src={post.image}
                    alt="Post attachment"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )} */}
            </div>
          }
        />
      </Card>
    </>
  );
};

export default PostItem;
