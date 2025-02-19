import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubNaviBar from "../../components/MyPage/SubNavi/SubNaviBar";
import SearchBar from "../../components/SearchBar";
import styles from "./MyPage.module.css";
import { getMypageCommunityPostList } from "../../service/apiService";
import { formatDate } from "../../utils/formattedDate";

const Mypost = ({ gridArea }) => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [myPost, setMyPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 8; // 페이지당 보여줄 게시글 수

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMypageCommunityPostList();
        console.log("게시글 데이터:", response);
        setMyPost(response.data); // 전체 게시글 데이터 설정
      } catch (error) {
        console.error("게시글 데이터를 불러오는데 실패했습니다.", error);
        setMyPost([]); // 에러 발생 시 빈 배열로 초기화
      }
    };

    fetchData();
  }, []);

  // 유저 ID 가져오기
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData).userId : null;

  if (!userId) {
    return <h1>로그인이 필요합니다.</h1>;
  }

  // 유저 ID와 일치하는 게시글 필터링
  const filteredUserPosts = myPost.filter((post) => post.userId === userId);

  // selectedCategory에 따라 데이터 선택
  const filteredCategoryData = filteredUserPosts.filter((post) => {
    if (selectedCategory === "전체") return true; // 전체 카테고리
    if (selectedCategory === "아이를 찾습니다")
      return post.postCategory === "FINDCHILD";
    if (selectedCategory === "입양후기")
      return post.postCategory === "ADOPTREVIEW";
    if (selectedCategory === "사고팝니다")
      return post.postCategory === "BUYANDSELL";
    if (selectedCategory === "신고합니다")
      return post.postCategory === "REPORT";
    return false;
  });

  // 검색어 필터링
  const filteredSearchData = filteredCategoryData.filter((post) =>
    post.postTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 페이지네이션 처리
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredSearchData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredSearchData.length / postsPerPage);

  // 서브 네비게이션 탭 설정
  const tabs = [
    { label: "전체", category: "전체" },
    { label: "아이를 찾습니다", category: "아이를 찾습니다" },
    { label: "입양후기", category: "입양후기" },
    { label: "사고팝니다", category: "사고팝니다" },
    { label: "신고합니다", category: "신고합니다" },
  ];

  // 탭 클릭 핸들러
  const handleTabClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 페이지 리셋
  };

  // 페이지 클릭 핸들러
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 검색 핸들러
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // 검색 시 페이지 리셋
  };

  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.mpcontainer}>
        {/* 검색창 */}
        <div className={styles.SearchBar}>
          <SearchBar
            placeholder={"글 제목을 검색하세요"}
            width="300px"
            onSearch={handleSearch}
          />
        </div>

        {/* 서브 네비게이션 */}
        <div className={styles.SubNaviBar}>
          <SubNaviBar tabs={tabs} onTabClick={handleTabClick} />
        </div>

        {/* 게시글 목록 */}
        <div className={styles.content2}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>글번호</th>
                <th>제목</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => (
                  <tr key={index}>
                    <td>{post.postId}</td>
                    <td>
                      <Link
                        to={`/${
                          post.postCategory === "FINDCHILD" ? 'find-child'
                          :post.postCategory === "ADOPTREVIEW" ? 'adoption-review'
                          :post.postCategory === "BUYANDSELL" ? 'resell'
                          :post.postCategory === "REPORT" ? 'report' : 'report'
                        }/post/${post.postUid}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {post.postTitle}
                      </Link>
                    </td>
                    <td>{formatDate(post.postCreatedAt)}</td>
                    <td>{post.postViewCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">작성된 게시글이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className={styles.pagination}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={currentPage === index + 1 ? styles.activePage : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypost;
