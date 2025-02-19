import { useEffect, useState } from "react";
import SubNaviBar from "../../components/MyPage/SubNavi/SubNaviBar";
import styles from "./MyPage.module.css";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";
import { getMypageQnAList, getMypageVisitRequestList } from "../../service/apiService";
import { formatDate } from "../../utils/formattedDate"; 
const Csdetail = ({ gridArea }) => {
    const [qnaList, setQnaList] = useState([]); // 온라인 문의 데이터
    const [visitRequestList, setVisitRequestList] = useState([]); // 방문 상담 데이터
    const [selectedCategory, setSelectedCategory] = useState("온라인 문의");
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const getMypageQnaListAction = async () => {
            try {
                const response = await getMypageQnAList();
                console.log('QNA DATA: ', response);
                setQnaList(response.data);
            } catch (error) {
                console.log('qna 불러 올 수 없음', error);
            }
        };
        getMypageQnaListAction();

        const getMypageVisitRequestListAction = async () => {
            try {
                const response = await getMypageVisitRequestList();
                console.log('Visit Request Data: ', response);
                setVisitRequestList(response.data);
            } catch (error) {
                console.log('방문상담신청 못 부름', error);
            }
        };
        getMypageVisitRequestListAction();
    }, []);

    // 로컬스토리지에서 userId 가져오기
    const userData = localStorage.getItem('user');
    const userId = userData ? JSON.parse(userData).userId : null;

   // 유저의 ID와 일치하는 데이터만 필터링
   const filteredQnaList = qnaList.filter(post => post.userId === userId);
   const filteredVisitRequestList = visitRequestList.filter(post => post.userId === userId);

   // selectedCategory에 따라 데이터 선택
   const filteredData = selectedCategory === "온라인 문의" ? filteredQnaList : filteredVisitRequestList;

//    // 검색어를 포함한 데이터 필터링
   const filteredSearchData = filteredData.filter(post =>
       post.qnaTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.visitPurpose?.toLowerCase().includes(searchQuery.toLowerCase())
   );

    const tabs = [
        { label: "온라인 문의", category: "온라인 문의" },
        { label: "방문상담 신청", category: "방문상담 신청" }
    ];

    const handleTabClick = (category) => {
        setSelectedCategory(category);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setSearchQuery("");
    };

    return (
        <div style={{ gridArea: gridArea }}>
            <div className={styles.mpcontainer}>
                <div className={styles.SearchBar}>
                    <SearchBar 
                        placeholder={"글 내용 & 글 제목"} 
                        width="300px" 
                        onSearch={handleSearch} 
                    />
                </div>
                <div className={styles.subNaviBar}>
                    <SubNaviBar tabs={tabs} onTabClick={handleTabClick} />
                </div>

                <div className={styles.content2}>
                    {/* 데이터가 없을 경우 "문의 없음" 표시 */}
                    {filteredData.length === 0 ? (
                        <h1>문의 없음</h1>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    {selectedCategory === "온라인 문의" && (
                                        <>
                                            <th>글번호</th>
                                            <th>제목</th>
                                            <th>작성일</th>
                                            <th>답변상태</th>
                                        </>
                                    )}
                                    {selectedCategory === "방문상담 신청" && (
                                        <>
                                            <th>글번호</th>
                                            <th>연락처</th>
                                            <th>상담 목적</th>
                                            <th>예약일</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {/* 필터링된 데이터 출력 */}
                                {filteredSearchData.map((post, index) => (
                                    <tr key={index}>
                                        {selectedCategory === "온라인 문의" && (
                                            <>
                                                <td>{post.qnaId}</td>
                                                <td>
                                                    <Link to={`/customer_qna/result/${post.qnaId}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'normal' }}>
                                                        {post.qnaTitle}
                                                    </Link>
                                                </td>
                                                <td>{formatDate(post.qnaCreatedAt)}</td>
                                                <td>{post.qnaState === "ANSCOMPLETE" ? "답변완료" : "답변대기"}</td>
                                            </>
                                        )}
                                        {selectedCategory === "방문상담 신청" && (
                                            <>
                                                <td>{post.requestId}</td>
                                                <td>{post.phoneNum}</td>
                                                <td>{post.visitPurpose}</td>
                                                <td>{post.visitDate}</td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Csdetail;
