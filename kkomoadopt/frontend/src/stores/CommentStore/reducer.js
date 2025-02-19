// // reducer.js

// import {
//     CHANGE_COMMENT_ID,
//     CHANGE_COMMENT_CONTENT,
//     CHANGE_COMMENT_CREATED_AT,
//     CHANGE_COMMENT_UPDATED_AT,
//     CHANGE_IS_DELETED,
//     CHANGE_POST_UID,
//     CHANGE_COMMENT_AUTHOR,
//     RESET_STATE
//   } from './action';
  
//   // 초기 상태 정의
//   export const initialState = {
//     commentId: "",
//     commentContent: "",
//     commentCreatedAt: null,
//     commentUpdatedAt: null,
//     isDeleted: false,
//     postUid: "",
//     commentAuthor: ""
//   };
  
//   // 리듀서 함수
//   export const reducer = (state, action) => {
//     switch (action.type) {
//       case CHANGE_COMMENT_ID:
//         return { ...state, commentId: action.payload };
//       case CHANGE_COMMENT_CONTENT:
//         return { ...state, commentContent: action.payload };
//       case CHANGE_COMMENT_CREATED_AT:
//         return { ...state, commentCreatedAt: action.payload };
//       case CHANGE_COMMENT_UPDATED_AT:
//         return { ...state, commentUpdatedAt: action.payload };
//       case CHANGE_IS_DELETED:
//         return { ...state, isDeleted: action.payload };
//       case CHANGE_POST_UID:
//         return { ...state, postUid: action.payload };
//       case CHANGE_COMMENT_AUTHOR:
//         return { ...state, commentAuthor: action.payload };
//       case RESET_STATE:
//         return initialState; // 상태 초기화
//       default:
//         return state;
//     }
//   };
  