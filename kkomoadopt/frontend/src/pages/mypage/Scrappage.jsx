// import React, { useState, useEffect } from "react";
// import Card2 from "../../components/Card2/Card2";
// import SubNaviBar from "../../components/MyPage/SubNavi/SubNaviBar";
// import styles from "./MyPage.module.css";
// import { Link } from "react-router-dom";
// import { getMypageAdoptList } from "../../service/apiService";
// import SearchBar from "../../components/SearchBar";
// import { useStore as AdoptionNoticeStore2 } from "../../stores/AdoptionNoticeStore2/useStore";

// const Scrappage = ({ gridArea }) => {
//   const [selectedCategory, setSelectedCategory] = useState("전체");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState(""); // 검색어 저장
  
//   const [scrapedPosts, setScrapedPosts] = useState([]); // 스크랩된 게시물만 저장
//   const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 게시물
//   const [scrapedAnnouncementNums, setScrapedAnnouncementNums] = useState([]);
//   const [currentPosts, setCurrentPosts] = useState([]); 

//   const [changeScraps, setChangeScraps] = useState(0);

//   const { state, actions } = AdoptionNoticeStore2();

//   const itemsPerPage = 4; // 페이지당 아이템 수


//   const tlqkf = () => setFk(prev => !prev);

//   // 모든 게시물 가져오기 및 스크랩된 게시물 필터링
//   useEffect(() => {
//     const fetchAdoptionPosts = async () => {
//       try {
//         const response = await getMypageAdoptList();
//         const adoptionPosts = response.data; // 모든 게시물 데이터 가져오기
//         console.log("Adoption Posts:", adoptionPosts); // 모든 입양 게시물 출력

//         // 로컬 스토리지에서 유저 데이터 가져오기
//         const storedUserData = localStorage.getItem("user");
//         const userData = storedUserData ? JSON.parse(storedUserData) : null;
//         const userScraps = userData?.scraps || [];

//         // 스크랩된 게시물 필터링
//         const scraped = adoptionPosts.filter((post) =>
//           userScraps.includes(post.announcementNum) // announcementNum을 사용해서 필터링
//         );

//         // announcementNum만 저장
//         const scrapedAnnouncementNums = scraped.map((post) => post.announcementNum);

//         console.log("Scraped Announcement Numbers:", scrapedAnnouncementNums); // 스크랩된 announcementNum만 출력

//         setScrapedPosts(scraped); // 스크랩된 게시물 저장
//         setScrapedAnnouncementNums(scrapedAnnouncementNums); // announcementNum만 저장
//         setFilteredPosts(scraped); // 초기에는 스크랩된 게시물만 보여줌
//       } catch (error) {
//         console.error("Failed to fetch adoption posts:", error);
//       }
//     };

//     fetchAdoptionPosts();
//   }, [changeScraps]);

//   // 현재 페이지의 게시물 계산
//   useEffect(() => {
//     const currentPosts = filteredPosts.slice(
//       (currentPage - 1) * itemsPerPage,
//       currentPage * itemsPerPage
//     );
//     setCurrentPosts(currentPosts); // 상태 업데이트
//   }, [filteredPosts, currentPage, changeScraps]);

//   const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

//   // 페이지 클릭 처리
//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // 페이지 번호 버튼을 위한 배열 생성
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   const handleSearch = (query) => {
//     setSearchQuery(query); // 검색어 상태 업데이트
//     const filtered = scrapedPosts.filter((post) =>
//       post.noticeTitle.toLowerCase().includes(query.toLowerCase()) // noticeTitle로 필터링
//     );
//     setFilteredPosts(filtered); // 필터링된 게시물만 보여줌
//     setCurrentPage(1); // 검색 후 첫 페이지로 돌아가게 설정
//   };

//   const handleTabClick = (category) => {
//     setSelectedCategory(category);
//     setCurrentPage(1); // 카테고리 변경 시 페이지 1로 리셋

//     if (category === "전체") {
//       setFilteredPosts(scrapedPosts); // 전체를 선택하면 모든 게시물 보여줌
//     } else {
//       const filtered = scrapedPosts.filter(
//         (post) => post.noticeCategory === category // noticeCategory로 필터링
//       );
//       setFilteredPosts(filtered);
//     }
//   };

//   const tabs = [
//     { label: "전체", category: "전체" },
//     { label: "강아지", category: "DOG" },
//     { label: "고양이", category: "CAT" },
//     { label: "기타동물", category: "OTHERS" },
//   ];

//   const toggleScrap = (announcementNum,index) => {
//     let value = changeScraps;
//     setChangeScraps(++value)
//     // 로컬 스토리지에서 유저 데이터 가져오기
//     const storedUserData = localStorage.getItem("user");
//     const user = storedUserData ? JSON.parse(storedUserData) : null;

//     if (!user) {
//       console.error("유저 데이터가 로컬 스토리지에 없습니다.");
//       return;
//     }

//     const scraps = user.scraps || []; // 기존 scraps 배열 가져오기

//     // 해당 스크랩 번호 추가/제거
//     const updatedScraps = scraps.includes(announcementNum)
//       ? scraps.filter((num) => num !== announcementNum) // 이미 존재하면 제거
//       : [...scraps, announcementNum]; // 없으면 추가

//     // 로컬 스토리지에 업데이트된 user 데이터 저장
//     const updatedUser = { ...user, scraps: updatedScraps };
//     localStorage.setItem("user", JSON.stringify(updatedUser));

//     // UI에 즉시 반영되도록 스크랩 게시물 상태 업데이트
//     const updatedScrapedPosts = scrapedPosts.filter((post) =>
//       updatedScraps.includes(post.announcementNum)
//     );
//     setScrapedPosts(updatedScrapedPosts);

//     // 현재 선택된 카테고리에 따라 필터링된 게시물 업데이트
//     const filtered =
//       selectedCategory === "전체"
//         ? updatedScraps
//         : updatedScraps.filter((post) => post.noticeCategory === selectedCategory);
//     setFilteredPosts(filtered);
//   };

//   // const toggleScrap = (announcementNum, index) => {
//   //   // 로컬 스토리지에서 유저 데이터 가져오기
//   //   const storedUserData = localStorage.getItem("user");
//   //   const user = storedUserData ? JSON.parse(storedUserData) : null;
  
//   //   const scraps = user.scraps || []; // 기존 scraps 배열 가져오기
//   //   let value = changeScraps;
//   //   setChangeScraps(++value)
//   //   // 해당 스크랩 번호 추가/제거
//   //   const updatedScraps = scraps.includes(announcementNum)
//   //     ? scraps.filter((num) => num !== announcementNum) // 이미 존재하면 제거
//   //     : [...scraps, announcementNum]; // 없으면 추가
  
//   //   // 로컬 스토리지에 업데이트된 user 데이터 저장
//   //   const updatedUser = { ...user, scraps: updatedScraps };
//   //   localStorage.setItem("user", JSON.stringify(updatedUser));
  
//   //   // 스크랩 상태를 반영하여 UI 업데이트
//   //   const updatedFilteredPosts = selectedCategory === "전체"
//   //     ? updatedScraps
//   //     : updatedScraps.filter((post) => post.noticeCategory === selectedCategory);
  
//   //   setFilteredPosts(updatedFilteredPosts);

//   // };

//   useEffect(()=>{
//     currentPosts.map((item,index) => {
//       console.log(index+":::::::::::::");
//       console.dir(item);
//     })
//   })
  
//   return (
//     <div style={{ gridArea: gridArea }}>
//       <div className={styles.mpcontainer}>
//         <div className={styles.SearchBar}>
//           <SearchBar placeholder={"품종 검색"} onSearch={handleSearch} width="300px" />
//         </div>

//         <div className={styles.SubNaviBar}>
//           <SubNaviBar tabs={tabs} onTabClick={handleTabClick} />
//         </div>
//         <div className={styles.content}>
//           {currentPosts.map((item,index) => (
//             <Card2
//               key={item.announcementNum}
//               imageFile={item.noticeImgUrl} 
//               text1={item.noticeTitle} // 제목
//               text2={`공고종료 : ${item.euthanasiaDate}`} // 종료 날짜
//               adoptNum= {item.announcementNum}
//               // isScraped={item.announcementNum ? item.announcementNum.includes(item.announcementNum):false}
//               isScraped={
//                 // item과 item.announcementNum이 유효하고, scrapedAnnouncementNums가 배열일 때만 includes를 실행
//                 Array.isArray(scrapedAnnouncementNums) && item.announcementNum && scrapedAnnouncementNums.includes(item.announcementNum)
//               }
//               onDetailPage={(adoptNum)=> {gotoDetailPage(adoptNum)}}
//               onScrapToggle={(event) => toggleScrap(item.announcementNum, index)}
//             />
//           ))}
//         </div>
//         <div className={styles.pagination}>
//           <div className={styles.side2} />
//           {pageNumbers.map((number) => (
//             <button
//               key={number}
//               className={`${styles.pageButton} ${currentPage === number ? styles.active : ""}`}
//               onClick={() => handlePageClick(number)}
//             >
//               {number}
//             </button>
//           ))}
//           <div className={styles.rightside2} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scrappage;

// import React, { useState, useEffect, useCallback } from "react";
// import Card2 from "../../components/Card2/Card2";
// import SubNaviBar from "../../components/MyPage/SubNavi/SubNaviBar";
// import styles from "./MyPage.module.css";
// import { getMypageAdoptList } from "../../service/apiService";
// import SearchBar from "../../components/SearchBar";
// import { useStore as AdoptionNoticeStore2 } from "../../stores/AdoptionNoticeStore2/useStore";
// //sadasd
// const Scrappage = ({ gridArea }) => {
//   const [selectedCategory, setSelectedCategory] = useState("전체");
//   const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
//   const [scrapedPosts, setScrapedPosts] = useState([]); // 스크랩된 게시물
//   const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 게시물
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 4; // 페이지당 아이템 수
//   const { state, actions } = AdoptionNoticeStore2();

//   // 스크랩 데이터 업데이트 헬퍼 함수
//   const updateUserScrapData = useCallback((announcementNum) => {
//     const storedUserData = localStorage.getItem("user");
//     const user = storedUserData ? JSON.parse(storedUserData) : null;

//     if (!user) {
//       console.error("유저 데이터가 로컬 스토리지에 없습니다.");
//       return [];
//     }

//     const scraps = user.scraps || [];
//     const updatedScraps = scraps.includes(announcementNum)
//       ? scraps.filter((num) => num !== announcementNum)
//       : [...scraps, announcementNum];

//     const updatedUser = { ...user, scraps: updatedScraps };
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     return updatedScraps;
//   }, []);

//   // 모든 게시물 가져오기 및 스크랩된 게시물 필터링
//   useEffect(() => {
//     const fetchAdoptionPosts = async () => {
//       try {
//         const response = await getMypageAdoptList();
//         const adoptionPosts = response.data;

//         const storedUserData = localStorage.getItem("user");
//         const userData = storedUserData ? JSON.parse(storedUserData) : null;
//         const userScraps = userData?.scraps || [];

//         const scraped = adoptionPosts.filter((post) =>
//           userScraps.includes(post.announcementNum)
//         );

//         setScrapedPosts(scraped);
//       } catch (error) {
//         console.error("Failed to fetch adoption posts:", error);
//       }
//     };

//     fetchAdoptionPosts();
//   }, []);

//   // 검색, 카테고리 필터링 로직
//   useEffect(() => {
//     const filtered = scrapedPosts
//       .filter((post) =>
//         selectedCategory === "전체" || post.noticeCategory === selectedCategory
//       )
//       .filter((post) =>
//         post.noticeTitle.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     setFilteredPosts(filtered);
//   }, [scrapedPosts, selectedCategory, searchQuery]);

//   // 현재 페이지 게시물 계산
//   const currentPosts = filteredPosts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleTabClick = (category) => {
//     setSelectedCategory(category);
//     setCurrentPage(1);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };

//   // const toggleScrap = useCallback((announcementNum) => {
//   //   const updatedScraps = updateUserScrapData(announcementNum);
//   //   const updatedScrapedPosts = scrapedPosts.filter((post) =>
//   //     updatedScraps.includes(post.announcementNum)
//   //   );

//   //   setScrapedPosts(updatedScrapedPosts);
//   // }, [scrapedPosts, updateUserScrapData]);

//   const toggleScrap = useCallback(
//     (announcementNum) => {
//       const storedUserData = localStorage.getItem("user");
//       if (!storedUserData) {
//         alert("스크랩은 로그인 후 사용할 수 있습니다.");
//         navigate("/login");
//         return;
//       }
  
//       // 서버에 스크랩 상태 변경 요청
//       actions.changeMyScrap(announcementNum);
  
//       // 로컬 스토리지에서 유저 데이터 가져오기
//       const user = JSON.parse(storedUserData);
//       const scraps = user.scraps || [];
  
//       // 해당 스크랩 번호 추가/제거
//       const updatedScraps = scraps.includes(announcementNum)
//         ? scraps.filter((num) => num !== announcementNum)
//         : [...scraps, announcementNum];
  
//       // 로컬 스토리지에 업데이트된 유저 데이터 저장
//       const updatedUser = { ...user, scraps: updatedScraps };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
  
//       // 상태 업데이트 및 리렌더링
//       const updatedScrapedPosts = scrapedPosts.filter((post) =>
//         updatedScraps.includes(post.announcementNum)
//       );
//       setScrapedPosts(updatedScrapedPosts);
//     },
//     [scrapedPosts, actions]
//   );

//   const tabs = [
//     { label: "전체", category: "전체" },
//     { label: "강아지", category: "DOG" },
//     { label: "고양이", category: "CAT" },
//     { label: "기타동물", category: "OTHERS" },
//   ];

//   return (
//     <div style={{ gridArea: gridArea }}>
//       <div className={styles.mpcontainer}>
//         <div className={styles.SearchBar}>
//           <SearchBar placeholder={"품종 검색"} onSearch={handleSearch} width="300px" />
//         </div>

//         <div className={styles.SubNaviBar}>
//           <SubNaviBar tabs={tabs} onTabClick={handleTabClick} />
//         </div>

//         {/* <div className={styles.content}>
//           {currentPosts.map((item) => (
//             <Card2
//               key={item.announcementNum}
//               imageFile={item.noticeImgUrl}
//               text1={item.noticeTitle}
//               text2={`공고종료 : ${item.euthanasiaDate}`}
//               adoptNum={item.announcementNum}
//               isScraped={true}
//               onDetailPage={(adoptNum) => console.log(`Detail page: ${adoptNum}`)}
//               onScrapToggle={() => toggleScrap(item.announcementNum)}
//             />
//           ))}
//         </div> */}
//         <div className={styles.content}>
//           {currentPosts.length > 0 ? (
//             currentPosts.map((item) => (
//               <Card2
//                 key={item.announcementNum}
//                 imageFile={item.noticeImgUrl}
//                 text1={item.noticeTitle}
//                 text2={`공고종료 : ${item.euthanasiaDate}`}
//                 adoptNum={item.announcementNum}
//                 isScraped={true}
//                 onDetailPage={(adoptNum) => console.log(`Detail page: ${adoptNum}`)}
//                 onScrapToggle={() => toggleScrap(item.announcementNum)}
//               />
//             ))
//           ) : (
//             <h1 className={styles.noScrapMessage}>스크랩한 게시물이 없습니다.</h1>
//           )}
//         </div>

//         <div className={styles.pagination}>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
//             <button
//               key={number}
//               className={`${styles.pageButton} ${currentPage === number ? styles.active : ""}`}
//               onClick={() => handlePageClick(number)}
//             >
//               {number}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scrappage;

import React, { useState, useEffect, useCallback } from "react";
import Card2 from "../../components/Card2/Card2";
import SubNaviBar from "../../components/MyPage/SubNavi/SubNaviBar";
import styles from "./MyPage.module.css";
import { getMypageAdoptList } from "../../service/apiService";
import SearchBar from "../../components/SearchBar";
import { useStore as AdoptionNoticeStore2 } from "../../stores/AdoptionNoticeStore2/useStore";
//sadasd
const Scrappage = ({ gridArea }) => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [scrapedPosts, setScrapedPosts] = useState([]); // 스크랩된 게시물
  const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 게시물
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4; // 페이지당 아이템 수
  const { state, actions } = AdoptionNoticeStore2();

  // 스크랩 데이터 업데이트 헬퍼 함수
  const updateUserScrapData = useCallback((announcementNum) => {
    const storedUserData = localStorage.getItem("user");
    const user = storedUserData ? JSON.parse(storedUserData) : null;

    if (!user) {
      console.error("유저 데이터가 로컬 스토리지에 없습니다.");
      return [];
    }

    const scraps = user.scraps || [];
    const updatedScraps = scraps.includes(announcementNum)
      ? scraps.filter((num) => num !== announcementNum)
      : [...scraps, announcementNum];

    const updatedUser = { ...user, scraps: updatedScraps };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedScraps;
  }, []);

  // 모든 게시물 가져오기 및 스크랩된 게시물 필터링
  useEffect(() => {
    const fetchAdoptionPosts = async () => {
      try {
        const response = await getMypageAdoptList();
        const adoptionPosts = response.data;

        const storedUserData = localStorage.getItem("user");
        const userData = storedUserData ? JSON.parse(storedUserData) : null;
        const userScraps = userData?.scraps || [];

        const scraped = adoptionPosts.filter((post) =>
          userScraps.includes(post.announcementNum)
        );

        setScrapedPosts(scraped);
      } catch (error) {
        console.error("Failed to fetch adoption posts:", error);
      }
    };

    fetchAdoptionPosts();
  }, []);

  // 검색, 카테고리 필터링 로직
  useEffect(() => {
    const filtered = scrapedPosts
      .filter((post) =>
        selectedCategory === "전체" || post.noticeCategory === selectedCategory
      )
      .filter((post) =>
        post.noticeTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );

    setFilteredPosts(filtered);
  }, [scrapedPosts, selectedCategory, searchQuery]);

  // 현재 페이지 게시물 계산
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // const toggleScrap = useCallback((announcementNum) => {
  //   const updatedScraps = updateUserScrapData(announcementNum);
  //   const updatedScrapedPosts = scrapedPosts.filter((post) =>
  //     updatedScraps.includes(post.announcementNum)
  //   );

  //   setScrapedPosts(updatedScrapedPosts);
  // }, [scrapedPosts, updateUserScrapData]);

  const toggleScrap = useCallback(
    (announcementNum) => {
      const storedUserData = localStorage.getItem("user");
      if (!storedUserData) {
        alert("스크랩은 로그인 후 사용할 수 있습니다.");
        navigate("/login");
        return;
      }
  
      // 서버에 스크랩 상태 변경 요청
      actions.changeMyScrap(announcementNum);
  
      // 로컬 스토리지에서 유저 데이터 가져오기
      const user = JSON.parse(storedUserData);
      const scraps = user.scraps || [];
  
      // 해당 스크랩 번호 추가/제거
      const updatedScraps = scraps.includes(announcementNum)
        ? scraps.filter((num) => num !== announcementNum)
        : [...scraps, announcementNum];
  
      // 로컬 스토리지에 업데이트된 유저 데이터 저장
      const updatedUser = { ...user, scraps: updatedScraps };
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      // 상태 업데이트 및 리렌더링
      const updatedScrapedPosts = scrapedPosts.filter((post) =>
        updatedScraps.includes(post.announcementNum)
      );
      setScrapedPosts(updatedScrapedPosts);
    },
    [scrapedPosts, actions]
  );

  const tabs = [
    { label: "전체", category: "전체" },
    { label: "강아지", category: "DOG" },
    { label: "고양이", category: "CAT" },
    { label: "기타동물", category: "OTHERS" },
  ];

  return (
    <div style={{ gridArea: gridArea }}>
      <div className={styles.mpcontainer}>
        <div className={styles.SearchBar}>
          <SearchBar placeholder={"품종 검색"} onSearch={handleSearch} width="300px" />
        </div>

        <div className={styles.SubNaviBar}>
          <SubNaviBar tabs={tabs} onTabClick={handleTabClick} />
        </div>

        {/* <div className={styles.content}>
          {currentPosts.map((item) => (
            <Card2
              key={item.announcementNum}
              imageFile={item.noticeImgUrl}
              text1={item.noticeTitle}
              text2={`공고종료 : ${item.euthanasiaDate}`}
              adoptNum={item.announcementNum}
              isScraped={true}
              onDetailPage={(adoptNum) => console.log(`Detail page: ${adoptNum}`)}
              onScrapToggle={() => toggleScrap(item.announcementNum)}
            />
          ))}
        </div> */}
        <div className={styles.content}>
          {currentPosts.length > 0 ? (
            currentPosts.map((item) => (
              <Card2
                key={item.announcementNum}
                imageFile={item.noticeImgUrl}
                text1={item.noticeTitle}
                text2={`공고종료 : ${item.euthanasiaDate}`}
                adoptNum={item.announcementNum}
                isScraped={true}
                onDetailPage={(adoptNum) => console.log(`Detail page: ${adoptNum}`)}
                onScrapToggle={() => toggleScrap(item.announcementNum)}
              />
            ))
          ) : (  
            <p className={styles.noScrapMessage}>스크랩한 게시물이 없습니다.</p>
          )}
        </div>

        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={`${styles.pageButton} ${currentPage === number ? styles.active : ""}`}
              onClick={() => handlePageClick(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scrappage;
