import {
  getCommunityPosts,
  getCommunityPostDetail,
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
  getCommunityPostsByCategory
} from '../../service/apiService';

// Action Types
export const CHANGE_POST_UID = "CHANGE_POST_UID";
export const CHANGE_POST_ID = "CHANGE_POST_ID";
export const CHANGE_POST_CATEGORY = "CHANGE_POST_CATEGORY";
export const CHANGE_POST_TITLE = "CHANGE_POST_TITLE";
export const CHANGE_POST_CONTENT = "CHANGE_POST_CONTENT";
export const CHANGE_POST_CREATED_AT = "CHANGE_POST_CREATED_AT";
export const CHANGE_POST_UPDATED_AT = "CHANGE_POST_UPDATED_AT";
export const CHANGE_POST_IMG_URL = "CHANGE_POST_IMG_URL";
export const CHANGE_IS_DELETED = "CHANGE_IS_DELETED";
export const CHANGE_DELETE_REASON = "CHANGE_DELETE_REASON";
export const CHANGE_COMMUNITY_AUTHOR = "CHANGE_COMMUNITY_AUTHOR";
export const CHANGE_POST_VIEW_COUNT = "CHANGE_POST_VIEW_COUNT";
export const UPDATE_ALL_FIELDS = "UPDATE_ALL_FIELDS";
export const RESET_STATE = "RESET_STATE";

// CRUD 관련 액션 타입들 추가
export const READ_COMMUNITY_POSTS = "READ_COMMUNITY_POSTS";
export const READ_COMMUNITY_POST_DETAIL = "READ_COMMUNITY_POST_DETAIL";
export const CREATE_COMMUNITY_POST = "CREATE_COMMUNITY_POST";
export const UPDATE_COMMUNITY_POST = "UPDATE_COMMUNITY_POST";
export const DELETE_COMMUNITY_POST = "DELETE_COMMUNITY_POST";

// Action Creators
export const changePostUid = (postUid) => ({ type: CHANGE_POST_UID, payload: postUid });
export const changePostId = (postId) => ({ type: CHANGE_POST_ID, payload: postId });
export const changePostCategory = (postCategory) => ({ type: CHANGE_POST_CATEGORY, payload: postCategory });
export const changePostTitle = (postTitle) => ({ type: CHANGE_POST_TITLE, payload: postTitle });
export const changePostContent = (postContent) => ({ type: CHANGE_POST_CONTENT, payload: postContent });
export const changePostCreatedAt = (postCreatedAt) => ({ type: CHANGE_POST_CREATED_AT, payload: postCreatedAt });
export const changePostUpdatedAt = (postUpdatedAt) => ({ type: CHANGE_POST_UPDATED_AT, payload: postUpdatedAt });
export const changePostImgUrl = (postImgUrl) => ({ type: CHANGE_POST_IMG_URL, payload: postImgUrl });
export const changeIsDeleted = (isDeleted) => ({ type: CHANGE_IS_DELETED, payload: isDeleted });
export const changeDeleteReason = (deleteReason) => ({ type: CHANGE_DELETE_REASON, payload: deleteReason });
export const changeCommunityAuthor = (communityAuthor) => ({ type: CHANGE_COMMUNITY_AUTHOR, payload: communityAuthor });
export const changePostViewCount = (postViewCount) => ({ type: CHANGE_POST_VIEW_COUNT, payload: postViewCount });
export const resetState = () => ({ type: RESET_STATE });
export const updateAllFields = (fields) => ({
  type: UPDATE_ALL_FIELDS,
  payload: fields
});

// CRUD 관련 액션 생성자

// 1. 커뮤니티 게시물 목록 조회
export const readCommunityPosts = () => async (dispatch) => {
  try {
    const response = await getCommunityPosts();  // API 호출: 게시물 목록 가져오기
    dispatch({
      type: READ_COMMUNITY_POSTS,
      payload: response.data,  // 게시물 목록 데이터
    });
  } catch (error) {
    console.error("커뮤니티 게시물 목록을 불러올 수 없습니다.", error);
  }
};

// 커뮤니티 카테고리로 조회 
export const readCommunityPostsByCategory = (category) => async (dispatch) => {
  try {
    const response = await getCommunityPostsByCategory(category);

    if (response.status === 200) {
      dispatch({
        type: READ_COMMUNITY_POSTS,
        payload: response.data
      });
      return "ok"
    };
  } catch (error) {
    console.error("커뮤니티 게시물 목록을 불러올 수 없습니다.", error)
  }
}


// 2. 특정 커뮤니티 게시물 상세 조회
export const readCommunityPostDetail = (postUid) => async (dispatch) => {
  try {
    const response = await getCommunityPostDetail(postUid);  // API 호출: 게시물 상세 정보 가져오기

    if (response.status === 200) {
      dispatch({
        type: READ_COMMUNITY_POST_DETAIL,
        payload: response.data,  // 게시물 상세 데이터
      });
      return "ok"
    };
  } catch (error) {
    console.error("커뮤니티 게시물 상세 정보를 불러올 수 없습니다.", error);
  }
};

// 3. 커뮤니티 게시물 생성
export const createCommunityPostAction = (postData, files) => async (dispatch) => {
  try {
    const response = await createCommunityPost(postData, files);  // API 호출: 새로운 커뮤니티 게시물 생성
    dispatch({
      type: CREATE_COMMUNITY_POST,
      payload: response.data,  // 생성된 게시물 데이터
    });
  } catch (error) {
    console.error("커뮤니티 게시물을 생성할 수 없습니다.", error);
  }
};

// 4. 커뮤니티 게시물 수정
export const updateCommunityPostAction = (postUid, updatedData) => async (dispatch) => {
  try {
    const response = await updateCommunityPost(postUid, updatedData);  // API 호출: 게시물 수정
    dispatch({
      type: UPDATE_COMMUNITY_POST,
      payload: response.data,  // 수정된 게시물 데이터
    });
  } catch (error) {
    console.error("커뮤니티 게시물을 수정할 수 없습니다.", error);
  }
};

// 5. 커뮤니티 게시물 삭제
export const deleteCommunityPostAction = (postUid) => async (dispatch) => {
  try {
    await deleteCommunityPost(postUid);  // API 호출: 게시물 삭제
    dispatch({
      type: DELETE_COMMUNITY_POST,
      payload: postUid,  // 삭제된 게시물의 UID
    });
  } catch (error) {
    console.error("커뮤니티 게시물을 삭제할 수 없습니다.", error);
  }
};
