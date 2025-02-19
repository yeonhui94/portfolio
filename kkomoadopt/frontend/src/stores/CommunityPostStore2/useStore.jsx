import { useReducer } from "react";
import { reducer, initialState } from "./reducer";  // reducer와 초기 상태를 import
import {
  changePostUid,
  changePostId,
  changePostCategory,
  changePostTitle,
  changePostContent,
  changePostCreatedAt,
  changePostUpdatedAt,
  changePostImgUrl,
  changeIsDeleted,
  changeDeleteReason,
  changeCommunityAuthor,
  changePostViewCount,
  resetState,
  readCommunityPosts,
  readCommunityPostDetail,
  createCommunityPostAction,
  updateCommunityPostAction,
  deleteCommunityPostAction,
  readCommunityPostsByCategory
} from "./action";  // 액션 크리에이터들을 import
import { getCommunityPostsByCategory } from "../../service/apiService";

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);  // useReducer 훅을 사용

  

  // 액션을 디스패치할 수 있도록 하는 함수들
  const actions = {
    changePostUid: (postUid) => dispatch(changePostUid(postUid)),
    changePostId: (postId) => dispatch(changePostId(postId)),
    changePostCategory: (postCategory) => dispatch(changePostCategory(postCategory)),
    changePostTitle: (postTitle) => dispatch(changePostTitle(postTitle)),
    changePostContent: (postContent) => dispatch(changePostContent(postContent)),
    changePostCreatedAt: (postCreatedAt) => dispatch(changePostCreatedAt(postCreatedAt)),
    changePostUpdatedAt: (postUpdatedAt) => dispatch(changePostUpdatedAt(postUpdatedAt)),
    changePostImgUrl: (postImgUrl) => dispatch(changePostImgUrl(postImgUrl)),
    changeIsDeleted: (isDeleted) => dispatch(changeIsDeleted(isDeleted)),
    changeDeleteReason: (deleteReason) => dispatch(changeDeleteReason(deleteReason)),
    changeCommunityAuthor: (communityAuthor) => dispatch(changeCommunityAuthor(communityAuthor)),
    changePostViewCount: (postViewCount) => dispatch(changePostViewCount(postViewCount)),
    resetState: () => dispatch(resetState()),  // 상태 초기화

    // CRUD 액션들
    readCommunityPosts: (posts) => readCommunityPosts(posts)(dispatch),
    readCommunityPostDetail: (postUid) => readCommunityPostDetail(postUid)(dispatch),
    // createCommunityPostAction: (postData) => dispatch(createCommunityPost(postData)),
    updateCommunityPostAction: (postData) => dispatch(updateCommunityPost(postData)),
    deleteCommunityPostAction: (postUid) => deleteCommunityPostAction(postUid)(dispatch),
    createCommunityPostAction: (postData, files) => createCommunityPostAction(postData, files)(dispatch),
    // updateCommunityPostAction: (postData) => dispatch(updateCommunityPost(postData)),
    // deleteCommunityPostAction: (postId) => dispatch(deleteCommunityPost(postId)),
    readCommunityPostsByCategory: (category) => readCommunityPostsByCategory(category)(dispatch)
//     deleteCommunityPostAction: (postUid) => deleteCommunityPostAction(postUid)(dispatch),
  };

  return { state, actions };  // 상태와 액션들을 반환
};