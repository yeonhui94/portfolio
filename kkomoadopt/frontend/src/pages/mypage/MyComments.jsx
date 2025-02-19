// import { useEffect, useState } from "react";
// import SubNaviBar from "../../components/MyPage/SubNavi/SubNaviBar";
// import styles from "./MyPage.module.css";
// import SearchBar from "../../components/SearchBar";
// import Pagenumber from "../../components/pagenumber/Pagenumber";
// import { Link } from "react-router-dom";
// import { getMypageCommentList } from "../../service/apiService";
// const MyComments = ({ gridArea }) => {

//   const [selectedCategory, setSelectedCategory] = useState("전체");
//   const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
//   const [searchQuery, setSearchQuery] = useState('');
//   const [category1, setCategory1] = useState("");  // category1 상태 추가
//   const [myComment, setMyComment] = useState([]);

//   useEffect(()=>{
//     const getMypageCommentListAction = async () => {
//       try {
//         const response = await getMypageCommentList();
//         console.log('Comments Data:', response);  // 데이터 콘솔에 출력
//         setMyComment(response.data);
//       }
//       catch (error) {
//         console.error("입양 게시물을 불러올 수 없습니다.", error);
//       }
//     }
//     getMypageCommentListAction();
//   },[])

//   // 유저 ID 가져오기
//   const userData = localStorage.getItem("user");
//   const userId = userData ? JSON.parse(userData).userId : null;

//   const filteredUserComment = myComment.filter((post) => post.userId === userId);
//   console.log(myComment);
//   // // 검색 필터링된 데이터
//   // const filteredData = allPosts.filter(post =>
//   //   (selectedCategory === "전체" || post.category === selectedCategory) &&
//   //   (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//   //     post.content.toLowerCase().includes(searchQuery.toLowerCase()))
//   // );

//   // 페이지당 보여지는 글 수
//   const postsPerPage = 8;

//   // 현재 페이지에 맞는 게시글 데이터 계산
//   const currentPosts = filteredData.slice(
//     (currentPage - 1) * postsPerPage,
//     currentPage * postsPerPage
//   );

//   // 전체 페이지 수 계산
//   const totalPages = Math.ceil(filteredData.length / postsPerPage);

//   const tabs = [
//     { label: "전체", category: "전체" },
//     { label: "아이를 찾습니다", category: "아이를 찾습니다" },
//     { label: "입양후기", category: "입양후기" },
//     { label: "사고팝니다", category: "사고팝니다" },
//     { label: "신고합니다", category: "신고합니다" },
//   ];

//   const handleTabClick = (category) => {
//     setSelectedCategory(category);  // 클릭한 카테고리로 상태 업데이트
//     setCurrentPage(1);  // 카테고리 변경 시 페이지 1로 리셋

//     // 전체 카테고리인 경우 category1을 빈 값으로 설정
//     if (category === "전체") {
//       setCategory1("");  // 전체 카테고리에서는 category1 값 없이 처리
//     } else {
//       // 선택된 카테고리에서 category1을 찾아서 상태에 저장
//       const selectedCategoryPost = allPosts.find(post => post.category === category);
//       if (selectedCategoryPost) {
//         setCategory1(selectedCategoryPost.category1);  // 카테고리에 맞는 category1 값 저장
//       }
//     }
//   };

  
  
//   // 페이지네이션 처리
//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // 검색어 변경 처리 함수
//   const handleSearch = (query) => {
//     setSearchQuery(query);  // 검색어를 상태에 저장
//   };

//   return (
//     <div style={{ gridArea: gridArea }}>
//       <div className={styles.mpcontainer}>
//         <div className={styles.SearchBar}>
//           <SearchBar 
//             placeholder={"글 내용 & 글 제목"} 
//             width="300px" 
//             onSearch={handleSearch} />
//         </div>

//         <div className={styles.SubNaviBar}>
//           <SubNaviBar tabs={tabs} onTabClick={handleTabClick} />  {/* 서브 네비게이션 */}
//         </div>

//         <div className={styles.content2}>
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>글번호</th>
//                 <th>제목</th>
//                 <th>작성일</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* 필터링된 게시글을 페이지별로 표시 */}
//               {currentPosts.map(post => (
//                 <tr key={post.id}>
//                   <td>{post.id}</td>
//                   <td>
//                     {/* 카테고리1 값을 URL에 사용 */}
//                     <Link to={selectedCategory === "전체" ? `/${post.category1}/post/${post.id}` : `/${category1}/post/${post.id}`}>
//                       {post.title}
//                     </Link>
//                     </td>
//                   <td>{post.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* 페이지네이션 컴포넌트 */}
//         <Pagenumber
//           totalPages={totalPages}
//           currentPage={currentPage}
//           handlePageClick={handlePageClick}
//         />
//       </div>
//     </div>
//   );
// };

// export default MyComments;










import { useEffect, useState } from "react";
import SubNaviBar from "../../components/MyPage/SubNavi/SubNaviBar";
import styles from "./MyPage.module.css";
import SearchBar from "../../components/SearchBar";
import Pagenumber from "../../components/pagenumber/Pagenumber";
import { Link } from "react-router-dom";
import { getMypageCommentList, getMypageCommunityPostList } from "../../service/apiService";

const MyComments = ({ gridArea }) => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [myComment, setMyComment] = useState([]);
  const [myPost, setMyPost] = useState([]);

  // 댓글 목록과 게시글 목록 데이터 가져오기
  useEffect(() => {
    const getMypageCommentListAction = async () => {
      try {
        const response = await getMypageCommentList();
        console.log("댓글 데이터:", response); // 데이터 콘솔에 출력
        setMyComment(response.data);
      } catch (error) {
        console.error("댓글을 불러올 수 없습니다.", error);
      }
    };
    getMypageCommentListAction();

    const getMypageCommunityPostListAction = async () => {
      try {
        const response = await getMypageCommunityPostList();
        setMyPost(response.data);
      } catch (error) {
        console.log("게시글 못 불러옴", error);
      }
    };
    getMypageCommunityPostListAction();
  }, []);

  // 로그인 여부 확인
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData).userId : null;

  if (!userId) {
    return <h1>로그인이 필요합니다.</h1>; // 로그인하지 않은 경우
  }

  // 유저 ID와 일치하는 댓글 필터링
  const filteredUserComments = myComment.filter((comment) => comment.userId === userId);

  // 카테고리 및 검색어에 따른 댓글 필터링
  const filteredCategoryData = filteredUserComments.filter((comment) => {
    // 선택된 카테고리에 따른 필터링
    if (selectedCategory === "전체") return true; // 전체 카테고리
    const post = myPost.find(post => post.postUid === comment.postUid); // 댓글이 속한 게시글 찾기
    if (!post) return false; // 게시글이 없으면 필터링
    if (selectedCategory === "아이를 찾습니다") return post.postCategory === "FINDCHILD";
    if (selectedCategory === "입양후기") return post.postCategory === "ADOPTREVIEW";
    if (selectedCategory === "사고팝니다") return post.postCategory === "BUYANDSELL";
    if (selectedCategory === "신고합니다") return post.postCategory === "REPORT";
    return false;
  });

  // 검색어 필터링
  const filteredSearchData = filteredCategoryData.filter((comment) =>
    comment.commentContent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 페이지네이션 처리
  const postsPerPage = 8;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentComments = filteredSearchData.slice(indexOfFirstPost, indexOfLastPost);
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

  // 페이지네이션 처리 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 검색어 변경 처리 함수
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // 검색 시 페이지 1로 리셋
  };

  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.mpcontainer}>
        {/* 검색창 */}
        <div className={styles.SearchBar}>
          <SearchBar 
            placeholder={"댓글 내용 검색"} 
            width="300px" 
            onSearch={handleSearch} 
          />
        </div>

        {/* 서브 네비게이션 */}
        <div className={styles.SubNaviBar}>
          <SubNaviBar tabs={tabs} onTabClick={handleTabClick} />
        </div>

        {/* 댓글 목록 */}
        <div className={styles.content2}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>글 번호</th>
                <th>댓글 내용</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {/* 필터링된 댓글을 페이지별로 표시 */}
              {currentComments.length > 0 ? (
                currentComments.map((comment) => {
                  const post = myPost.find((post) => post.postUid === comment.postUid);
                  const postCategory = post?.postCategory || "전체"; // 게시글의 카테고리
                  const postId = post?.postId || "삭제된 게시글 입니다."; // 게시글의 아이디

                  return (
                    <tr key={comment.commentId}>
                      {/* 댓글이 쓰인 게시글의 아이디 표시 */}
                      <td>{postId}</td>
                      <td>
                        <Link
                          to={`/${
                            postCategory === "FINDCHILD" ? "find-child"
                            : postCategory === "ADOPTREVIEW" ? "adoption-review"
                            : postCategory === "BUYANDSELL" ? "resell"
                            : postCategory === "REPORT" ? "report"
                            : "report"
                          }/post/${post?.postUid || ""}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {comment.commentContent}
                        </Link>
                      </td>
                      <td>{new Date(comment.commentCreatedAt).toLocaleDateString()}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td></td>
                  <td>작성된 댓글이 없습니다.</td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <Pagenumber
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
        />
      </div>
    </div>
  );
};

export default MyComments;


