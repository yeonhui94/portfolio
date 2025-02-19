// service.js
import axios from "axios";

// API 기본 설정
const apiClient = axios.create({
  baseURL: 'http://localhost:5173', 
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchNotices = async () => {
  try {
      const response = await apiClient.get('/'); // 게시물 목록을 가져오는 GET 요청
      return response.data;
  } catch (error) {
      console.error('Failed to fetch notices', error);
      throw error; // 오류 처리
  }
};

// 커뮤니티 포스트 가져오기
export const fetchPost = async (postId) => {
  try {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;  // 데이터 반환
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw error;
  }
};

// 커뮤니티 포스트 생성
export const createPost = async (postData) => {
  try {
    const response = await apiClient.post("/posts", postData);
    return response.data;  // 생성된 포스트 반환
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};

// 커뮤니티 포스트 수정
export const updatePost = async (postId, updatedData) => {
  try {
    const response = await apiClient.put(`/posts/${postId}`, updatedData);
    return response.data;  // 수정된 포스트 반환
  } catch (error) {
    console.error("Failed to update post:", error);
    throw error;
  }
};

// 커뮤니티 포스트 삭제
export const deletePost = async (postId) => {
  try {
    await apiClient.delete(`/posts/${postId}`);
    return true;  // 삭제 성공
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw error;
  }
};
