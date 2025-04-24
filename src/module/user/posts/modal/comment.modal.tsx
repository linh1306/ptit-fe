import postApi from "@app/api/post.api";
import { BaseModalProps } from "@app/context/Modal.context";
import useAppMutation from "@app/hooks/useAppMutation.hook";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import { Avatar, Button, List, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export interface ICommentModalProps extends BaseModalProps {
  postId: string;
}

export default function CommentModal({ postId }: ICommentModalProps) {
  const { data: comments, refetch } = useAppQuery(postApi.getCommentsByPostId, {
    queryKey: ["comments", postId],
    variables: {
      pathIds: [postId],
    },
  });
  const [commentText, setCommentText] = useState("");

  const { mutate: createComment } = useAppMutation(postApi.createComment, {
    onSuccess: () => {
      refetch();
      setCommentText("");
    },
    onError: () => {
      message.error("Bình luận thất bại");
    },
  });

  const handleCreateComment = () => {
    const content = commentText;
    if (!content?.trim()) {
      message.warning("Vui lòng nhập nội dung bình luận");
      return;
    }
    createComment({ pathIds: [postId], body: { content } });
  };

  return (
    <div>
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
          style={{ marginTop: 8, float: "right" }}
        >
          Đăng
        </Button>
      </div>
    </div>
  );
}
