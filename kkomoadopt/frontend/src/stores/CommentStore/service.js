// import axios from "axios";

// // API 클라이언트 설정
// const apiClient = axios.create({
//   baseURL: 'http://localhost:5173',
//   timeout: 5000,
//   headers: { 'Content-Type': 'application/json' }
// });

// // 코멘트 목록 불러오기
// export const fetchComments = async () => {
//   try {
//     const response = await apiClient.get("/"); // 코멘트 목록을 가져오는 GET 요청
//     return response.data; // 코멘트 데이터 반환
//   } catch (error) {
//     console.error("Failed to fetch comments", error);
//     throw error; // 에러 처리
//   }
// };

// // 특정 코멘트 불러오기
// export const fetchCommentById = async (commentId) => {
//   try {
//     const response = await apiClient.get(`/${commentId}`); // 특정 코멘트를 가져오는 GET 요청
//     return response.data; // 코멘트 데이터 반환
//   } catch (error) {
//     console.error("Failed to fetch comment", error);
//     throw error; // 에러 처리
//   }
// };

// // 코멘트 생성
// export const createComment = async (commentData) => {
//   try {
//     const response = await apiClient.post("/", commentData); // 코멘트를 생성하는 POST 요청
//     return response.data; // 생성된 코멘트 반환
//   } catch (error) {
//     console.error("Failed to create comment", error);
//     throw error; // 에러 처리
//   }
// };

// // 코멘트 수정
// export const updateComment = async (commentId, updatedData) => {
//   try {
//     const response = await apiClient.put(`/${commentId}`, updatedData); // 코멘트를 수정하는 PUT 요청
//     return response.data; // 수정된 코멘트 반환
//   } catch (error) {
//     console.error("Failed to update comment", error);
//     throw error; // 에러 처리
//   }
// };

// // 코멘트 삭제
// export const deleteComment = async (commentId) => {
//   try {
//     await apiClient.delete(`/${commentId}`); // 코멘트를 삭제하는 DELETE 요청
//   } catch (error) {
//     console.error("Failed to delete comment", error);
//     throw error; // 에러 처리
//   }
// };
