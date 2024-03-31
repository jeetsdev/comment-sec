import { createContext, useState } from "react";
import commentData from "../data/data.json";
import { ICommentContextData, ICommentData } from "../helper/interface";

export const CommentContext = createContext<ICommentContextData>({
  data: commentData,
  setData: () => {},
});

export const CommentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<ICommentData[]>(commentData);

  return (
    <CommentContext.Provider value={{ data, setData }}>
      {children}
    </CommentContext.Provider>
  );
};
