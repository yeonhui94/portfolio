import {
  CHANGE_COMMENT_ID,
  CHANGE_COMMENT_CONTENT,
  CHANGE_COMMENT_CREATED_AT,
  CHANGE_COMMENT_UPDATED_AT,
  CHANGE_IS_DELETED,
  CHANGE_POST_UID,
  CHANGE_COMMENT_AUTHOR,
  UPDATE_ALL_FIELDS,
  RESET_STATE,
  READ_COMMENTS,
  READ_COMMENT_DETAIL,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from './action';
  
// 초기 상태 정의
export const initialState = {
  commentId: "",
  commentContent: "",
  commentCreatedAt: null,
  commentUpdatedAt: null,
  isDeleted: false,
  postUid: "",
  commentAuthor: "",
  comments: [], // 댓글 목록을 저장할 배열 추가
  commentDetail: null // 댓글 상세 정보 추가
};

// 리듀서 함수
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COMMENT_ID:
      return { ...state, commentId: action.payload };
    case CHANGE_COMMENT_CONTENT:
      return { ...state, commentContent: action.payload };
    case CHANGE_COMMENT_CREATED_AT:
      return { ...state, commentCreatedAt: action.payload };
    case CHANGE_COMMENT_UPDATED_AT:
      return { ...state, commentUpdatedAt: action.payload };
    case CHANGE_IS_DELETED:
      return { ...state, isDeleted: action.payload };
    case CHANGE_POST_UID:
      return { ...state, postUid: action.payload };
    case CHANGE_COMMENT_AUTHOR:
      return { ...state, commentAuthor: action.payload };
    case RESET_STATE:
      return initialState; // 상태 초기화
    case UPDATE_ALL_FIELDS:
      return { ...state, ...action.payload };
    // 댓글 목록 읽기
    case READ_COMMENTS:
      return { ...state, comments: action.payload };
    
    // 댓글 상세 정보 읽기
    case READ_COMMENT_DETAIL:
      return { ...state, commentDetail: action.payload };

    // 새로운 댓글 생성
    case CREATE_COMMENT:
      return { ...state, comments: action.payload };

    // 댓글 수정
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.commentId === action.payload.commentId ? action.payload : comment
        ),
        commentDetail: action.payload // 수정된 댓글의 상세 정보 업데이트
      };

    // 댓글 삭제
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.commentId !== action.payload),
        commentDetail: null // 삭제된 댓글은 상세 정보에서 제거
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.commentId !== action.payload),
        commentDetail: state.commentDetail?.commentId === action.payload ? null : state.commentDetail
      };
    default:
      return state;
  }
};