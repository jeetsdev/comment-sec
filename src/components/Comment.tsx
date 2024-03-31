import { useState } from "react";
import { ICommentData } from "../helper/interface";
import { CommentInput } from "./CommentInput";
import { ICommentInputType } from "../helper/enums";
import useCommentActions from "../hooks/useCommenntActions";

interface IProps {
  comment: ICommentData;
  depthLevel: number;
}

const Comment = ({ comment, depthLevel = 0 }: IProps) => {
  const [showReply, setShowReply] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const { deleteCommentAction } = useCommentActions();

  function cancelCommentInput() {
    setShowReply(false);
    setShowUpdate(false);
  }

  return (
    <div>
      <div className="comment">
        <div className="comment__top">
          <p className="user__avatar">{comment.user.slice(0, 1)}</p>
          <p>{comment.user}</p>
          <button
            onClick={() => {
              setShowReply(true);
              setShowUpdate(false);
            }}
          >
            ↩ Reply
          </button>
          <button
            onClick={() => {
              setShowReply(false);
              setShowUpdate(true);
            }}
          >
            ✍️ Edit
          </button>
          <button
            onClick={() => {
              deleteCommentAction(comment.id);
            }}
          >
            {" "}
            ❌ Delete
          </button>
        </div>
        {!showUpdate && (
          <div className="comment__bottom">{comment.commentMsg}</div>
        )}
        {(showReply || showUpdate) && (
          <div>
            <CommentInput
              showCancel={true}
              cancelHandler={cancelCommentInput}
              currentId={comment.id}
              currentInputValue={showUpdate ? comment.commentMsg : ""}
              type={
                showUpdate ? ICommentInputType.update : ICommentInputType.add
              }
            />
          </div>
        )}
      </div>
      <div className="comment__child">
        {comment.child.map((ele) => {
          return (
            <Comment comment={ele} key={ele.id} depthLevel={depthLevel + 1} />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
