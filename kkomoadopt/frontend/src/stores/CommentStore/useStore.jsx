// // useStore.jsx
// import { useReducer } from "react";
// import { reducer, initialState } from "./reducer";  // reducer와 초기 상태를 import
// import {
//   changeCommentId,
//   changeCommentContent,
//   changeCommentCreatedAt,
//   changeCommentUpdatedAt,
//   changeIsDeleted,
//   changePostUid,
//   changeCommentAuthor,
//   resetState
// } from "./action";  // 액션 크리에이터를 import

// export const useStore = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);  // useReducer 훅을 사용

//   // 액션을 디스패치할 수 있도록 하는 함수들
//   const actions = {
//     changeCommentId: (commentId) => dispatch(changeCommentId(commentId)),
//     changeCommentContent: (commentContent) => dispatch(changeCommentContent(commentContent)),
//     changeCommentCreatedAt: (commentCreatedAt) => dispatch(changeCommentCreatedAt(commentCreatedAt)),
//     changeCommentUpdatedAt: (commentUpdatedAt) => dispatch(changeCommentUpdatedAt(commentUpdatedAt)),
//     changeIsDeleted: (isDeleted) => dispatch(changeIsDeleted(isDeleted)),
//     changePostUid: (postUid) => dispatch(changePostUid(postUid)),
//     changeCommentAuthor: (commentAuthor) => dispatch(changeCommentAuthor(commentAuthor)),
//     resetState: () => dispatch(resetState())  // 상태 초기화
//   };

//   return { state, actions };  // 상태와 액션들을 반환
// };
