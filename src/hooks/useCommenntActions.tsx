import { ICommentData, ICommentInputData } from "../helper/interface";
import {
  addNode,
  deleteNode,
  updateNode,
  useCommentData,
} from "../helper/utils";

export default function useCommentActions() {
  const { data, setData } = useCommentData();

  function postCommentAction(postData: ICommentInputData, parentId: string) {
    const newCommentData: ICommentData = {
      ...postData,
      id: Date.now().toString(),
      child: [],
    };
    let updatedData;
    if (parentId === "0") {
      //! Adding directly inside main node
      updatedData = [...data, newCommentData];
    } else {
      updatedData = addNode(data, parentId, newCommentData);
    }
    if (updatedData !== undefined) {
      setData([...updatedData]);
      return;
    }
    throw new Error("Failed to post comment");
  }

  function updateCommentAction(newMsg: string, currentNodeId: string) {
    const updatedData = updateNode(data, currentNodeId, newMsg);
    console.log(updatedData);

    if (updatedData !== undefined) {
      setData([...updatedData]);
      return;
    }
    throw new Error("Failed to Update comment");
  }

  function deleteCommentAction(currentNodeId: string) {
    const updatedData = deleteNode(data, currentNodeId);
    console.log(updatedData);
    if (updatedData !== undefined) {
      setData([...updatedData]);
      return;
    }
    throw new Error("Failed to Delete comment");
  }

  return { postCommentAction, updateCommentAction, deleteCommentAction };
}
