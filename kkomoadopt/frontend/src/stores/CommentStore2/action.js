import {
  getComments,
  getCommentDetail,
  createCommentAPI,
  updateCommentAPI,
  deleteCommentAPI
} from '../../service/apiService'

// action.js

// Action Types
export const CHANGE_COMMENT_ID = "CHANGE_COMMENT_ID";
export const CHANGE_COMMENT_CONTENT = "CHANGE_COMMENT_CONTENT";
export const CHANGE_COMMENT_CREATED_AT = "CHANGE_COMMENT_CREATED_AT";
export const CHANGE_COMMENT_UPDATED_AT = "CHANGE_COMMENT_UPDATED_AT";
export const CHANGE_IS_DELETED = "CHANGE_IS_DELETED";
export const CHANGE_POST_UID = "CHANGE_POST_UID";
export const CHANGE_COMMENT_AUTHOR = "CHANGE_COMMENT_AUTHOR";
export const UPDATE_ALL_FIELDS = "UPDATE_ALL_FIELDS";
export const RESET_STATE = "RESET_STATE";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const READ_COMMENTS = "READ_COMMENTS";
export const READ_COMMENT_DETAIL = "READ_COMMENT_DETAIL";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";


// Action Creators
export const changeCommentId = (commentId) => ({ type: CHANGE_COMMENT_ID, payload: commentId });
export const changeCommentContent = (commentContent) => ({ type: CHANGE_COMMENT_CONTENT, payload: commentContent });
export const changeCommentCreatedAt = (commentCreatedAt) => ({ type: CHANGE_COMMENT_CREATED_AT, payload: commentCreatedAt });
export const changeCommentUpdatedAt = (commentUpdatedAt) => ({ type: CHANGE_COMMENT_UPDATED_AT, payload: commentUpdatedAt });
export const changeIsDeleted = (isDeleted) => ({ type: CHANGE_IS_DELETED, payload: isDeleted });
export const changePostUid = (postUid) => ({ type: CHANGE_POST_UID, payload: postUid });
export const changeCommentAuthor = (commentAuthor) => ({ type: CHANGE_COMMENT_AUTHOR, payload: commentAuthor });
export const resetState = () => ({ type: RESET_STATE });
export const updateAllFields = (fields) => ({
  type: UPDATE_ALL_FIELDS,
  payload: fields
});

//커뮤니티 페이지 클릭 시 댓글리스트 불러오기
export const readComments = (postUid) => async (dispatch) => {
  try {
    const response = await getComments(postUid);  // API 호출: 댓글 목록 가져오기

    if (response.status === 200) {
      dispatch({
        type: READ_COMMENTS,
        payload: response.data,  // 댓글 목록 데이터
      });
      return "ok"
    };
  } catch (error) {
    console.error("댓글 목록을 불러올 수 없습니다.", error);
  }
};

// 특정 댓글의 상세 정보를 읽어오는 액션 생성자
export const readCommentDetail = (commentId) => async (dispatch) => {
  try {
    const response = await getCommentDetail(commentId);  // API 호출: 댓글 상세 정보 가져오기
    dispatch({
      type: READ_COMMENT_DETAIL,
      payload: response.data,  // 댓글 상세 데이터
    });
  } catch (error) {
    console.error("댓글 상세 정보를 불러올 수 없습니다.", error);
  }
};

// 새로운 댓글을 생성하는 액션 생성자
export const createComment = (commentData) => async (dispatch) => {
  try {
    const response = await createCommentAPI(commentData);  // API 호출: 새로운 댓글 생성
    dispatch({
      type: CREATE_COMMENT,
      payload: response.data,  // 생성된 댓글 데이터
    });
  } catch (error) {
    console.error("댓글을 생성할 수 없습니다.", error);
    throw error;
  }
};

// 기존 댓글을 수정하는 액션 생성자
export const updateComment = (commentId, updatedData) => async (dispatch) => {
  try {
    const response = await updateCommentAPI(commentId, updatedData);  // API 호출: 댓글 수정
    dispatch({
      type: UPDATE_COMMENT,
      payload: response.data,  // 수정된 댓글 데이터
    });
  } catch (error) {
    console.error("댓글을 업데이트할 수 없습니다.", error);
  }
};

// 댓글을 삭제하는 액션 생성자
export const deleteComment = (commentId) => async (dispatch) => {
  try {
    await deleteCommentAPI(commentId);  // API 호출: 댓글 삭제
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,  // 삭제된 댓글의 ID
    });
  } catch (error) {
    console.error("댓글을 삭제할 수 없습니다.", error);
  }
};