"use client";
import React, { useState } from "react";
import { CommentOutlined, EllipsisOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import { Avatar, Card, Modal, List, Input, Button, Dropdown, Space, message } from "antd";
import { IPost, IComment } from "@app/type/schema.type";
import useApiMutation from "@app/hooks/useApiMutation.hook";
import postApi from "@app/api/post.api";

const { TextArea } = Input;

// Giả định API service để like/unlike post và lấy comments
const postService = {
  likePost: async (postId: string, userId: string) => {
    // Thay thế bằng API call thực tế
    return await fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    }).then(res => res.json());
  },
  unlikePost: async (postId: string, userId: string) => {
    // Thay thế bằng API call thực tế
    return await fetch(`/api/posts/${postId}/unlike`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    }).then(res => res.json());
  },
  getComments: async (postId: string) => {
    // Thay thế bằng API call thực tế
    return await fetch(`/api/posts/${postId}/comments`).then(res => res.json());
  },
  addComment: async (postId: string, userId: string, content: string) => {
    // Thay thế bằng API call thực tế
    return await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, content })
    }).then(res => res.json());
  }
};

const PostItem = ({ post, getPosts }: { post: IPost, getPosts: () => void }) => {
  const currentUserId = post.user?.id || "";
  const isLiked = post.likes.includes(currentUserId);
  
  // State cho modal và comments
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState<IComment[]>(post.comments || []);
  const [commentText, setCommentText] = useState("");
  
  // Like/Unlike mutation
  const { mutate: likePost } = useApiMutation(postApi.likePost, {
    onSuccess: () => {
      getPosts()
    },
    onError: () => {
      message.error("Thích bài thất bại");
    },
  });
  
  // Add comment mutation
  const { mutate: createComment } = useApiMutation(postApi.createComment, {
    onSuccess: () => {
      getPosts();
      setCommentText("");
    },
    onError: () => {
      message.error("Bình luận thất bại");
    },
  });
  
  const handleLikePost = () => {
    likePost({ pathIds: [post.id] });
  };
  
  // Xử lý hiển thị modal comments
  const handleCommentClick = async () => {
    setIsModalOpen(true);
    // Nếu comments chưa được tải, tải từ API
    if (!post.comments || post.comments.length === 0) {
      try {
        const loadedComments = await postService.getComments(post.id);
        setComments(loadedComments);
      } catch (error) {
        console.error("Failed to load comments:", error);
      }
    }
  };
  
  const handleCreateComment = () => {
    const content = commentText;
    if (!content?.trim()) {
      message.warning("Vui lòng nhập nội dung bình luận");
      return;
    }
    createComment({ pathIds: [post.id], body: { content } });
  };
  
  // Menu cho nút ellipsis
  const dropdownItems = [
    {
      key: '1',
      label: 'Lưu bài viết',
    },
    {
      key: '2',
      label: 'Báo cáo',
    },
    {
      key: '3',
      label: 'Ẩn bài viết',
    },
  ];
  
  // Định nghĩa các action cho card
  const getActions = () => {
    return [
      <div key="like" onClick={() => handleLikePost()} style={{ cursor: 'pointer' }}>
        <Space>
          {isLiked ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
          <span>{post.likes?.length || 0}</span>
        </Space>
      </div>,
      <div key="comment" onClick={handleCommentClick} style={{ cursor: 'pointer' }}>
        <Space>
          <CommentOutlined />
          <span>{comments.length}</span>
        </Space>
      </div>,
      <Dropdown key="ellipsis" menu={{ items: dropdownItems }} placement="bottomRight">
        <EllipsisOutlined />
      </Dropdown>,
    ];
  };

  return (
    <>
      <Card 
        className="w-full mx-auto mb-4" 
        actions={getActions()} 
        style={{ minWidth: 300 }}
      >
        <Card.Meta
          avatar={<Avatar src={post.user?.urlImage || "/avatar.jpg"} />}
          title={post.user?.name}
          description={
            <>
              <p className="mb-4">{post.content}</p>
              {/* {post. && (
                <div className="rounded-md overflow-hidden mb-3">
                  <img
                    src={post.image}
                    alt="Post attachment"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )} */}
            </>
          }
        />
      </Card>

      {/* Modal hiển thị comments */}
      <Modal
        title="Bình luận"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <List
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={comment.user?.urlImage || "/avatar.jpg"} />}
                title={comment.user?.name}
                description={comment.content}
              />
            </List.Item>
          )}
        />
        <div style={{ marginTop: 16 }}>
          <TextArea
            rows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Viết bình luận của bạn..."
          />
          <Button 
            type="primary" 
            onClick={() => handleCreateComment()} 
            style={{ marginTop: 8, float: 'right' }}
          >
            Đăng
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PostItem;