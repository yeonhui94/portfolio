import Divider from "../components/Divider";
import Dropdown2 from "../components/DropDown2";
import SearchBar from "../components/SearchBar";
import styles from "./Review.module.css";
import Card2 from "../components/Card2/Card2";
import Button from "../components/Button/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../stores/CommunityPostStore2/useStore";

const Missing = ({ gridArea }) => {
    const { state: communityState, actions: communityActions } = useStore();
    const options = ["전체보기", "최신 순", "오래된 순", "조회 수 높은 순", "조회 수 낮은 순"];
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
    const [sortOption, setSortOption] = useState("전체보기"); // 정렬 옵션 상태 추가

    // 데이터 요청 (컴포넌트가 처음 마운트될 때만 호출)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("데이터 요청 시작");
                await communityActions.readCommunityPostsByCategory("FINDCHILD");
            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }
        };

        if (communityState.communityPosts.length === 0) {  // 데이터가 비어있는 경우에만 호출
            fetchPosts();
        }
    }, [communityActions, communityState.communityPosts.length]);

    // 검색어 필터링
    const filteredPosts = (communityState.communityPosts || []).filter(post => {
        const postTitle = post.postTitle ? post.postTitle.toLowerCase() : '';
        const postContent = post.postContent ? post.postContent.toLowerCase() : '';
        const query = searchQuery.toLowerCase().trim();
        return postTitle.includes(query) || postContent.includes(query); // 검색어로 필터링
    });

    // 정렬 로직
    const sortedPosts = () => {
        let sorted = [...filteredPosts];

        if (sortOption === "최신 순") {
            sorted.sort((a, b) => new Date(b.postCreatedAt) - new Date(a.postCreatedAt));
        } else if (sortOption === "오래된 순") {
            sorted.sort((a, b) => new Date(a.postCreatedAt) - new Date(b.postCreatedAt));
        } else if (sortOption === "조회 수 높은 순") {
            sorted.sort((a, b) => b.postViewCount - a.postViewCount);
        } else if (sortOption === "조회 수 낮은 순") {
            sorted.sort((a, b) => a.postViewCount - b.postViewCount);
        }

        return sorted;
    };

    // 페이지 처리
    const postsPerPage = 12; // 한 페이지에 표시할 게시물 수
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = sortedPosts().slice(startIndex, endIndex);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    // 검색어 변경 처리 함수
    const handleSearch = (query) => {
        setSearchQuery(query);  // 검색어를 상태에 저장
//         setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 리셋
    };

    return (
        <div style={{ gridArea: gridArea }}>
            <div className={styles.rwWrapper}>
                <div className={styles.rwsubcontainer}>
                    <div className={styles.rwsubcontainer2}>
                        <Dropdown2
                            options={options}
                            defaultText="전체보기"
                            onChange={(option) => setSortOption(option)} // 정렬 옵션 변경
                        />
                        <SearchBar
                            placeholder={"글 내용 & 글 제목"}
                            width="300px"
                            onSearch={(value) => handleSearch(value)} // 검색어 입력 시 처리
                        />
                    </div>
                </div>
                <div>
                    <div className={styles.rwmaincontainer}>
                        <div className={styles.rwdivider}>
                            <Divider width={"100%"} backgroundColor={"var(--line-color)"} />
                        </div>

                        {currentPosts.length > 0 ? (
                            currentPosts.map((card) => (
                                <Link key={card.postUid}>
                                    <Card2
                                        to={`/find-child/post/${card.postUid}`}
                                        imageFile={card.postImgUrl}
                                        text1={card.postTitle}
                                        text2={card.postContent}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p className={styles.noPosts}>등록된 게시물이 없습니다.</p>
                        )}
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <div className={styles.pgncontainer} style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'50%'}}>
                        {/* 페이지네이션 버튼 */}
                        {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageClick(index + 1)}
                                        className={`${styles.pageButton} ${
                                            currentPage === index + 1 ? styles.active : ""
                                        }`}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <Link to={"/commu_find-child_wt"} className={styles.buttonContainer}>
                        <Button text={"글쓰기"} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Missing;
