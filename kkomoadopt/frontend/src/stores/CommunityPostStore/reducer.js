// reducer.js

import {
  CHANGE_POST_UID,
  CHANGE_POST_ID,
  CHANGE_POST_CATEGORY,
  CHANGE_POST_TITLE,
  CHANGE_POST_CONTENT,
  CHANGE_POST_CREATED_AT,
  CHANGE_POST_UPDATED_AT,
  CHANGE_POST_IMG_URL,
  CHANGE_IS_DELETED,
  CHANGE_DELETE_REASON,
  CHANGE_COMMUNITY_AUTHOR,
  CHANGE_POST_VIEW_COUNT,
  RESET_STATE
} from './action';

// 초기 상태 정의
export const initialState = {
  postUid: "",
  postId: null,
  postCategory: "", // 기본값으로 설정
  postTitle: "",
  postContent: "",
  postCreatedAt: null,
  postUpdatedAt: null,
  postImgUrl: [],
  isDeleted: false,
  deleteReason: "",
  communityAuthor: "",
  postViewCount: 0
};

// 리듀서 함수
export const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_POST_UID:
      return { ...state, postUid: action.payload };
    case CHANGE_POST_ID:
      return { ...state, postId: action.payload };
    case CHANGE_POST_CATEGORY:
      return { ...state, postCategory: action.payload };
    case CHANGE_POST_TITLE:
      return { ...state, postTitle: action.payload };
    case CHANGE_POST_CONTENT:
      return { ...state, postContent: action.payload };
    case CHANGE_POST_CREATED_AT:
      return { ...state, postCreatedAt: action.payload };
    case CHANGE_POST_UPDATED_AT:
      return { ...state, postUpdatedAt: action.payload };
    case CHANGE_POST_IMG_URL:
      return { ...state, postImgUrl: action.payload };
    case CHANGE_IS_DELETED:
      return { ...state, isDeleted: action.payload };
    case CHANGE_DELETE_REASON:
      return { ...state, deleteReason: action.payload };
    case CHANGE_COMMUNITY_AUTHOR:
      return { ...state, communityAuthor: action.payload };
    case CHANGE_POST_VIEW_COUNT:
      return { ...state, postViewCount: action.payload };
    case RESET_STATE:
      return initialState;  // 상태를 초기화
    default:
      return state;
  }
};
