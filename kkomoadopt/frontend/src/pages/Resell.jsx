import { useState, useEffect } from "react";
import styles from "./Review.module.css";
import SearchBar from "../components/SearchBar";
import Divider from "../components/Divider";
import Dropdown2 from "../components/DropDown2";
import Card2 from "../components/Card2/Card2";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import { useStore } from "../stores/CommunityPostStore2/useStore";

const Resell = ({ gridArea }) => {
    const { state: communityState, actions: communityActions } = useStore();
    const [sortOption, setSortOption] = useState("전체보기");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;
    const options = ["전체보기", "최신 순", "오래된 순", "조회 수 높은 순", "조회 수 낮은 순"];

    useEffect(() => {
        const fetchPosts = async () => {
            await communityActions.readCommunityPostsByCategory("BUYANDSELL");
        };
        fetchPosts();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);  // 검색어를 상태에 저장
//         setCurrentPage(1);
    };

    const filteredPosts = (communityState.communityPosts || []).filter(post => {
        const postTitle = post.postTitle ? post.postTitle.toLowerCase() : "";
        const postContent = post.postContent ? post.postContent.toLowerCase() : "";
        const query = searchQuery.toLowerCase().trim();
        return postTitle.includes(query) || postContent.includes(query);
    });

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

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <div style={{ gridArea: gridArea }}>
            <div className={styles.rwWrapper}>
                <div className={styles.rwsubcontainer}>
                    <div className={styles.rwsubcontainer2}>
                        <Dropdown2
                            options={options} 
                            defaultText="전체보기"
                            onChange={(option) => setSortOption(option)}
                        />
                        <SearchBar 
                            placeholder={"글 내용 & 글 제목"} 
                            width="300px"               
                            onSearch={handleSearch} 
                        />
                    </div>
                </div>

                <div className={styles.rwmaincontainer}>
                    <div className={styles.rwdivider}>
                        <Divider width={"100%"} backgroundColor={"var(--line-color)"} />
                    </div>

                    {currentPosts.length > 0 ? (
                        currentPosts.map((card) => (
                            <Link key={card.postUid}>
                                <Card2
                                    to={`/resell/post/${card.postUid}`}
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

                {/* 페이지네이션 버튼 직접 구현 */}
                <div className={styles.btnContainer}>
                    <div className={styles.pgncontainer} style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'50%'}} >
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageClick(index + 1)}
                                className={`${styles.pageButton} ${
                                    currentPage === index + 1 ? styles.active : ""
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <Link to="/commu_resell_wt">
                        <div className={styles.buttonContainer}>
                            <Button text={"글쓰기"} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Resell;
