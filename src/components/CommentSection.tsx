import { useCommentData } from "../helper/utils";
import Comment from "./Comment";
import "./CommentSection.css";
import { CommentInput } from "./CommentInput";

const CommentSection = () => {
  const { data } = useCommentData();
  return (
    <div className="comment_sec">
      <CommentInput showCancel={false} currentId="0" />
      <div>
        {data.length === 0 ? (
          <p>No comments</p>
        ) : (
          data.map((comment) => {
            return (
              <Comment comment={comment} key={comment.id} depthLevel={0} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default CommentSection;
