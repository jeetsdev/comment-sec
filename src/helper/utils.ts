import { useContext } from "react";
import { CommentContext } from "../context/comment-context"
import { ICommentData } from "./interface";

export const useCommentData = () => useContext(CommentContext);


export function addNode(data: ICommentData[], parentId: string, newCommentData: ICommentData): ICommentData[] {
    return data.map((comment) => {
        if (comment.id === parentId) {
            return {
                ...comment,
                child: [...comment.child, newCommentData],
            };
        } else if (comment.child.length > 0) {
            return {
                ...comment,
                child: addNode(comment.child, parentId, newCommentData),
            };
        }
        return comment;
    })
}

export function updateNode(data: ICommentData[], currentNodeId: string, newMsg: string): ICommentData[] {
    return data.map((comment) => {
        if (comment.id === currentNodeId) {
            const updatedNode: ICommentData = { ...comment, commentMsg: newMsg }
            return updatedNode;
        } else if (comment.child.length > 0) {
            return {
                ...comment,
                child: updateNode(comment.child, currentNodeId, newMsg)
            };
        }
        return comment;
    })
}


export function deleteNode(data: ICommentData[], currentNodeId: string): ICommentData[] {
    return data.filter((comment) => {
        if (comment.id === currentNodeId) {
            return false;
        }
        else if (comment.child.length > 0) {
            comment.child = deleteNode(comment.child, currentNodeId)
        }
        return true;
    });
}