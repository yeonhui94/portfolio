// action.js

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
export const RESET_STATE = "RESET_STATE";

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
