// import { useState, useEffect } from "react";
// import styles from "../../Review.module.css";
// import SearchBar from "../../../components/SearchBar";
// import Divider from "../../../components/Divider";
// import Dropdown from "../../../components/DropDown";
// import comstyle from '../CommunityWt.module.css';
// import Button from "../../../components/Button/Button";
// import Pagenumber from "../../../components/pagenumber/Pagenumber";
// import { Link } from "react-router-dom";
// import { useStore } from "../../../stores/CommunityPostStore2/useStore";

// const Report = ({ gridArea }) => {
//   const { state: communityState, actions: communityActions } = useStore();
//   const [sortOption, setSortOption] = useState("전체보기"); // 정렬 옵션 상태 추가
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

//   const postsPerPage = 10;
//   const options = ["전체보기", "최신 순", "오래된 순", "조회 수 높은 순", "조회 수 낮은 순"];

//   // 게시물 필터링 (검색어에 맞는 게시물만 필터링)
//   const filteredPosts = (communityState.communityPosts || []).filter(post => {
//     const postTitle = post.postTitle ? post.postTitle.toLowerCase() : ''; // 안전하게 비교
//     const postContent = post.postContent ? post.postContent.toLowerCase() : ''; // 안전하게 비교
//     const query = searchQuery.toLowerCase().trim(); // 검색어 소문자 및 공백 제거
//     return postTitle.includes(query) || postContent.includes(query); // 필터링 조건
//   });

//   // 검색어 변경 시 호출되는 함수
//   const handleSearch = (query) => {
//     setSearchQuery(query); // 검색어 상태 업데이트
//   };

//   // 정렬 처리 함수
//   const handleSort = (option) => {
//     setSortOption(option); // 선택된 정렬 옵션 업데이트
//   };

//   // 정렬된 게시물 계산
//   const sortedPosts = () => {
//     let sortedPosts = [...filteredPosts];

//     if (sortOption === "최신 순") {
//       sortedPosts.sort((a, b) => new Date(b.postCreatedAt) - new Date(a.postCreatedAt)); // 최신순
//     } else if (sortOption === "오래된 순") {
//       sortedPosts.sort((a, b) => new Date(a.postCreatedAt) - new Date(b.postCreatedAt)); // 오래된 순
//     } else if (sortOption === "조회 수 높은 순") {
//       sortedPosts.sort((a, b) => b.postViewCount - a.postViewCount); // 조회 수 높은 순
//     } else if (sortOption === "조회 수 낮은 순") {
//       sortedPosts.sort((a, b) => a.postViewCount - b.postViewCount); // 조회 수 낮은 순
//     }

//     return sortedPosts;
//   };

//   // 현재 페이지에 해당하는 게시물 계산
//   const startIndex = (currentPage - 1) * postsPerPage; // 시작 인덱스
//   const endIndex = startIndex + postsPerPage; // 끝 인덱스
//   const currentPosts = sortedPosts().slice(startIndex, endIndex); // 현재 페이지 게시물

//   useEffect(() => {
//     // 게시물이 없을 때만 데이터를 불러오도록 조건 추가
//     if (communityState.communityPosts.length === 0) {
//       const fetchPosts = async () => {
//         await communityActions.readCommunityPostsByCategory("REPORT");
//       };
//       fetchPosts();
//     }
//   }, [communityState.communityPosts.length, communityActions]); // communityState.communityPosts.length만 의존성으로 추가

//   return (
//     <div style={{ gridArea }} className={comstyle.posts_container}>
//       <div className={`${styles.rwsubcontainer2} ${comstyle.inputdrop}`}>
//         <Dropdown options={options} onChange={handleSort} />
//         <SearchBar placeholder={"글 내용 & 글 제목"} width="300px" onSearch={handleSearch} />
//       </div>
//       <div className={comstyle.lin}>
//         <Divider height={"2px"} width={"100%"} backgroundColor={"var(--line-color)"} />
//       </div>
//       <div className={comstyle.subbar_post}>
//         <p className={comstyle.postnum}>번호</p>
//         <p className={comstyle.title}>제목</p>
//         <p className={comstyle.admin}>작성자</p>
//         <p className={comstyle.date}>작성일</p>
//         <p className={comstyle.views}>조회수</p>
//       </div>
//       <div className={comstyle.lin2}>
//         <Divider height={"2px"} width={"100%"} backgroundColor={"#E5E5E5"} />
//       </div>

//       {currentPosts.length > 0 ? (
//         <ul className={comstyle.postsbox}>
//           {currentPosts.map((post, index) => (
//             <Link to={`/report/post/${post.postUid}`} key={post.id}>
//               <li key={post.postUid} className={comstyle.post}>
//                 <p className={comstyle.postnumli}>{post.postId}</p>
//                 <p className={comstyle.titleli}>{post.postTitle}</p>
//                 <p className={comstyle.adminli}>{post.postAuthor}</p>
//                 <p className={comstyle.dateli}>{post.postCreatedAt}</p>
//                 <p className={comstyle.viewsli}>{post.postViewCount}</p>
//               </li>
//             </Link>
//           ))}
//         </ul>
//       ) : (
//         <p className={comstyle.postsbox}> <br /><br /> 등록된 게시물이 없습니다.</p>
//       )}

//       <div className={comstyle.buttondiv}>
//         <div className={comstyle.pagenum}>
//           <Pagenumber
//             totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
//             currentPage={currentPage}
//             handlePageClick={(page) => setCurrentPage(page)}
//           />
//         </div>
//         <Link to="/commu_report_wt" className={comstyle.report_btn}>
//           <Button text={"글쓰기"} width={"100px"} />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Report;


import { useState, useEffect } from "react";
import styles from "../../Review.module.css";
import SearchBar from "../../../components/SearchBar";
import Divider from "../../../components/Divider";
import Dropdown2 from "../../../components/DropDown2";
import comstyle from "../CommunityWt.module.css";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../../stores/CommunityPostStore2/useStore";
import { formatDate } from "../../../utils/formattedDate";

const Report = ({ gridArea }) => {
  const { state: communityState, actions: communityActions } = useStore();
  const [sortOption, setSortOption] = useState("전체보기");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const postsPerPage = 10;
  const options = ["전체보기", "최신 순", "오래된 순", "조회 수 높은 순", "조회 수 낮은 순"];

  const filteredPosts = (communityState.communityPosts || []).filter(post => {
    const postTitle = post.postTitle ? post.postTitle.toLowerCase() : "";
    const postContent = post.postContent ? post.postContent.toLowerCase() : "";
    const query = searchQuery.toLowerCase().trim();
    return postTitle.includes(query) || postContent.includes(query);
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (option) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const sortedPosts = () => {
    let sortedPosts = [...filteredPosts];

    if (sortOption === "최신 순") {
      sortedPosts.sort((a, b) => new Date(b.postCreatedAt) - new Date(a.postCreatedAt));
    } else if (sortOption === "오래된 순") {
      sortedPosts.sort((a, b) => new Date(a.postCreatedAt) - new Date(b.postCreatedAt));
    } else if (sortOption === "조회 수 높은 순") {
      sortedPosts.sort((a, b) => b.postViewCount - a.postViewCount);
    } else if (sortOption === "조회 수 낮은 순") {
      sortedPosts.sort((a, b) => a.postViewCount - b.postViewCount);
    }

    return sortedPosts;
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = sortedPosts().slice(startIndex, endIndex);

  useEffect(() => {
    if (communityState.communityPosts.length === 0) {
      const fetchPosts = async () => {
        await communityActions.readCommunityPostsByCategory("REPORT");
      };
      fetchPosts();
    }
  }, [communityState.communityPosts.length, communityActions]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div style={{ gridArea }} className={comstyle.posts_container}>
      <div className={`${styles.rwsubcontainer2} ${comstyle.inputdrop}`}>
        <Dropdown2 options={options} onChange={handleSort} />
        <SearchBar placeholder={"글 내용 & 글 제목"} width="300px" onSearch={handleSearch} />
      </div>
      <div className={comstyle.lin}>
        <Divider height={"2px"} width={"100%"} backgroundColor={"var(--line-color)"} />
      </div>
      <div className={comstyle.subbar_post}>
        <p className={comstyle.postnum}>번호</p>
        <p className={comstyle.title}>제목</p>
        <p className={comstyle.admin}>작성자</p>
        <p className={comstyle.date}>작성일</p>
        <p className={comstyle.views}>조회수</p>
      </div>
      <div className={comstyle.lin2}>
        <Divider height={"2px"} width={"100%"} backgroundColor={"#E5E5E5"} />
      </div>

      {currentPosts.length > 0 ? (
        <ul className={comstyle.postsbox}>
          {currentPosts.map((post) => (
            <Link to={`/report/post/${post.postUid}`} key={post.postUid}>
              <li className={comstyle.post}>
                <p className={comstyle.postnumli}>{post.postId}</p>
                <p className={comstyle.titleli}>{post.postTitle}</p>
                <p className={comstyle.adminli}>{post.postAuthor}</p>
                <p className={comstyle.dateli}>{formatDate(post.postCreatedAt)}</p>
                <p className={comstyle.viewsli}>{post.postViewCount}</p>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className={comstyle.postsbox}><br /><br /> 등록된 게시물이 없습니다.</p>
      )}

      <div className={comstyle.buttondiv} >
        <div className={comstyle.pagenum} style={{display:'flex',justifyContent:'center'}}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`${styles.pageButton} ${
                currentPage === index + 1 ? styles.active : ""
            }`}
              style={{display:'flex',justifyContent:'center',alignItems:'center'}}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <Link to="/commu_report_wt" className={comstyle.report_btn}>
          <Button text={"글쓰기"} width={"100px"} />
        </Link>
      </div>
    </div>
  );
};

export default Report;
