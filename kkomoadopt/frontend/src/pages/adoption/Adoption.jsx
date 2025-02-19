import { Link, useNavigate } from "react-router-dom";  // Link 임포트 추가
import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import SubMenuBar from "../../components/submenubar/SubMenuBar";
import Card2 from "../../components/Card2/Card2";
import Pagenumber from "../../components/pagenumber/Pagenumber";
import styles from "../Review.module.css";
import Divider from "../../components/Divider";
import { useStore as AdoptionNoticeStore2 } from "../../stores/AdoptionNoticeStore2/useStore";
import Dropdown2 from "../../components/DropDown2";

const Adoption = ({ gridArea }) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("euthanasiaDate");
  const [orderBy, setOrderBy ] = useState("DESC")
  const [searchQuery, setSearchQuery] = useState('');
  const [changeScraps, setChangeScraps] = useState(0);
  const { state, actions } = AdoptionNoticeStore2();
  const navigate = useNavigate()
  const storedUser = localStorage.getItem('user');

  const options = ["전체보기", "최신 순", "오래된 순", "조회 수 높은 순", "조회 수 낮은 순"];
  const sortOptions = [
    "euthanasiaDate",  // 전체보기
    "noticeCreatedAt", // 최신 순
    "noticeCreatedAt", // 오래된 순
    "noticeViewCount", // 조회 수 높은 순
    "noticeViewCount"  // 조회 수 낮은 순
  ];
  const orders = [
    "DESC", // 전체보기
    "ASC",  // 최신 순
    "DESC", // 오래된 순
    "DESC", // 조회 수 높은 순
    "ASC"   // 조회 수 낮은 순
  ];
  console.dir(state);
      // 페이지가 변경될 때마다 데이터 요청
    useEffect(() =>  {
        if(searchQuery == null || searchQuery == '' ) {
          actions.getAdoptionPostListAction(currentPage, selectedCategory, sortOption, orderBy);  // 페이지 번호가 변경되면 API 호출
        } else {
          actions.getAdoptionSearchPostListAction(currentPage, selectedCategory, sortOption, orderBy,searchQuery) ;  // 페이지 번호가 변경되면 API 호출
        }
      
    }, [currentPage, selectedCategory, sortOption, orderBy,searchQuery,changeScraps]);

  // 카테고리 필터링
  const filteredNotices = Array.isArray(state.notices.notices) ? state.notices.notices.filter(item => {
    console.log(item)
    if (selectedCategory === "ALL") {
      return true;
    }
    return item.noticeCategory === selectedCategory;
  }) : []; // notices가 배열이 아닌 경우 빈 배열 반환

  // 총 페이지 수 계산
// 숫자로 변환하고 NaN이 될 경우 기본값 0으로 설정
const totalElements = Number(state.notices.totalElements); // or parseInt(state.totalElements, 10)
const totalPages = Math.ceil(isNaN(totalElements) ? 0 : totalElements / 12);

  // 메뉴 항목 설정
  const menuItems = [
    { name: "전체", category: "ALL" },
    { name: "강아지", category: "DOG" },
    { name: "고양이", category: "CAT" },
    { name: "기타동물", category: "OTHERS" }
  ];

  // 카테고리 클릭 처리
  const handleTabClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);  // 카테고리 변경 시 페이지를 1로 리셋
  };

  // 페이지 클릭 처리
  const handlePageClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;  // 유효한 페이지 번호만 처리
    setCurrentPage(pageNumber);  // 페이지 번호 업데이트
  };

  // 정렬 옵션 변경 처리
  const handleSortChange = (option) => {
    const optionIndex = options.indexOf(option);
    if (optionIndex !== -1) {
      setSortOption(sortOptions[optionIndex]);
      setOrderBy(orders[optionIndex]);
    }
  };

  const searchTest = query => {
    setSearchQuery(query)
    setCurrentPage(1)
  }


  const toggleScrap = (announcementNum, index) => {
    if (!storedUser) {
      alert("스크랩은 로그인 후 사용할 수 있습니다.");
      navigate("/login");
      return;
    }

    // 서버에 스크랩 상태 변경 요청
    actions.changeMyScrap(announcementNum);
    let value = changeScraps;
    // 상태 갱신 (강제 리렌더링 트리거)
    setChangeScraps(++value)

    // storedUser를 객체로 변환
    const user = JSON.parse(storedUser);
    const scraps = user.scraps || []; // 기존 scraps 배열 가져오기

    // 해당 스크랩 번호 추가/제거
    const updatedScraps = scraps.includes(announcementNum)
      ? scraps.filter((num) => num !== announcementNum) // 이미 존재하면 제거
      : [...scraps, announcementNum]; // 없으면 추가

    // 로컬 스토리지에 업데이트된 user 데이터 저장
    const updatedUser = { ...user, scraps: updatedScraps };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  state

  return (
    <div style={{ gridArea: gridArea }}>
      <SubMenuBar
        menuItems={menuItems}
        selectedButton={selectedCategory}
        onTabClick={handleTabClick}
      />
      <div className={styles.rwWrapper}>
        <div className={styles.rwsubcontainer}>
          <div className={styles.rwsubcontainer2}>
            <Dropdown2
              options={options}
              orders={orders}
              defaultText="전체보기"
              onChange={handleSortChange}
            />
            <SearchBar
              placeholder={"품종 검색"}
              onSearch={searchTest}
              width="300px"
            />
          </div>
        </div>
        <div className={styles.rwmaincontainer}>
          <div className={styles.rwdivider}>
            <Divider width={"100%"} backgroundColor={"var(--line-color)"} />
          </div>
          {filteredNotices.map((item, index) => (
              <Card2
                imageFile={item.noticeImgUrl}
                text1={item.noticeTitle}
                text2={`입양종료 날짜:${item.euthanasiaDate}`}
                isScraped={state.notices?.scrapList ? state.notices?.scrapList.includes(item.announcementNum):false}
                adoptNum= {item.announcementNum}
                onDetailPage={(adoptNum)=> {gotoDetailPage(adoptNum)}}
                onScrapToggle={(event) => toggleScrap(item.announcementNum, index)}
              />
          ))}
        </div>
        <div className={styles.endcontainer}>
        <Pagenumber
              totalPages={totalPages}  // 총 페이지 수
              currentPage={currentPage}  // 현재 페이지 번호
              onPageChange={handlePageClick}  // 페이지 변경 시 처리
            />
        </div>
      </div>
    </div>
  );
};

export default Adoption;
