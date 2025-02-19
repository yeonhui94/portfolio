import { useReducer } from "react";
import { reducer, initialState } from "./reducer";  
import {
  changeCommentId,
  changeCommentContent,
  changeCommentCreatedAt,
  changeCommentUpdatedAt,
  changeIsDeleted,
  changePostUid,
  changeCommentAuthor,
  resetState,
  readComments,
  readCommentDetail,
  createComment,
  updateComment,
  deleteComment  
} from "./action";  

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);  // useReducer 훅을 사용

  // 액션을 디스패치할 수 있도록 하는 함수들
  const actions = {
    // 기존 상태 변경 액션들
    changeCommentId: (commentId) => dispatch(changeCommentId(commentId)),
    changeCommentContent: (commentContent) => dispatch(changeCommentContent(commentContent)),
    changeCommentCreatedAt: (commentCreatedAt) => dispatch(changeCommentCreatedAt(commentCreatedAt)),
    changeCommentUpdatedAt: (commentUpdatedAt) => dispatch(changeCommentUpdatedAt(commentUpdatedAt)),
    changeIsDeleted: (isDeleted) => dispatch(changeIsDeleted(isDeleted)),
    changePostUid: (postUid) => dispatch(changePostUid(postUid)),
    changeCommentAuthor: (commentAuthor) => dispatch(changeCommentAuthor(commentAuthor)),
    resetState: () => dispatch(resetState()),  // 상태 초기화

    // 댓글 CRUD 관련 액션들
    readComments: (postUid) => readComments(postUid)(dispatch),  // 페이지별댓글 목록 불러오기
    readCommentDetail: () => dispatch(readCommentDetail()),  // 댓글 상세 정보 불러오기
    createComment: (commentData) => dispatch(createComment(commentData)),  // 댓글 생성
    updateComment: (commentId, updatedData) => dispatch(updateComment(commentId, updatedData)),  // 댓글 수정
    deleteComment: (commentId) => dispatch(deleteComment(commentId))  // 댓글 삭제
  };

  return { state, actions }; 
};