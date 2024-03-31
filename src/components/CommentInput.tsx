import { useEffect, useState } from "react";
import useCommentActions from "../hooks/useCommenntActions";
import { ICommentInputType } from "../helper/enums";
import { ICommentInputProps } from "../helper/interface";

export const CommentInput = ({
  showCancel,
  cancelHandler,
  currentId,
  currentInputValue = "",
  type = ICommentInputType.add,
}: ICommentInputProps) => {
  const [postData, setPostData] = useState<string>(currentInputValue);
  const { postCommentAction, updateCommentAction } = useCommentActions();

  useEffect(() => {
    setPostData(currentInputValue);
  }, [currentInputValue]);

  return (
    <div className="post__sec">
      <textarea
        name=""
        id=""
        value={postData}
        placeholder="What's in your mind?"
        onChange={(event) => setPostData(event.target.value)}
      />
      <div className="post__control">
        <button
          disabled={postData.trim().length === 0}
          onClick={() => {
            if (type === ICommentInputType.add) {
              postCommentAction(
                {
                  commentMsg: postData,
                  user: "Test",
                },
                currentId
              );
            }
            if (type === ICommentInputType.update) {
              updateCommentAction(postData, currentId);
            }

            setPostData("");
            cancelHandler && cancelHandler();
          }}
        >
          {type === ICommentInputType.add ? "Post" : "Update"}
        </button>
        {showCancel && (
          <button onClick={() => cancelHandler && cancelHandler()}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
