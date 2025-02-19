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
  UPDATE_ALL_FIELDS,
  RESET_STATE,
  READ_COMMUNITY_POSTS,  // 추가된 액션 타입
  READ_COMMUNITY_POST_DETAIL,  // 추가된 액션 타입
  CREATE_COMMUNITY_POST,  // 추가된 액션 타입
  UPDATE_COMMUNITY_POST,  // 추가된 액션 타입
  DELETE_COMMUNITY_POST  // 추가된 액션 타입

} from './action';

// 초기 상태 정의
export const initialState = {
  postUid: "",
  postId: null,
  postCategory: "",  // 기본값으로 설정
  postTitle: "",
  postContent: "",
  postCreatedAt: null,
  postUpdatedAt: null,
  postImgUrl: [],
  isDeleted: false,
  deleteReason: "",
  communityAuthor: "",
  postViewCount: 0,
  communityPosts: [], // 게시물 목록
  communityPostDetail: null, // 특정 게시물 상세 정보
};

// 리듀서 함수
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 게시물 관련 상태 변경
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
    case UPDATE_ALL_FIELDS:
      return { ...state, ...action.payload };
    // CRUD 작업 관련 상태 변경
    // {커뮤니티관련된state, communityPosts: {데이터 }}
    case READ_COMMUNITY_POSTS:
      return { ...state, communityPosts: action.payload }; // 게시물 목록
    case READ_COMMUNITY_POST_DETAIL:
      return { ...state, communityPostDetail: action.payload }; // 게시물 상세 정보
    case CREATE_COMMUNITY_POST:
      return { ...state, communityPosts: action.payload }; // 새 게시물 추가
    case UPDATE_COMMUNITY_POST:
      return { ...state, communityPostDetail: action.payload };
    case DELETE_COMMUNITY_POST:
      return {
        ...state,
        communityPosts: state.communityPosts.filter(
          (post) => post.postId !== action.payload
        ), // 삭제된 게시물 필터링
        communityPostDetail: null, // 삭제된 게시물 상세 정보 제거
      };
    // 상태 초기화
    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
};