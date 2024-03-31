import { ICommentInputType } from "./enums";

export interface ICommentInputData {
    user: string;
    commentMsg: string;
}

export interface ICommentData extends ICommentInputData {
    id: string;
    child: ICommentData[];
}

export interface ICommentInputProps {
    showCancel: boolean;
    cancelHandler?: () => void;
    currentInputValue?:string
    currentId: string;
    type?: ICommentInputType;
}


export interface ICommentContextData {
    data: ICommentData[];
    setData: React.Dispatch<React.SetStateAction<ICommentData[]>>
}
