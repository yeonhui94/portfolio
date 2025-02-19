import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import styles from "../mypage/MyPage.module.css";
import SearchBar from "../../components/SearchBar";
import Pagenumber from "../../components/pagenumber/Pagenumber";
import Button from "../../components/Button/Button";
import CheckBox from "../../components/CheckBox";
import SubNaviBar from "../../components/MyPage/SubNavi/SubNaviBar";
import Modal from "../../components/Modal/Modal";
import { useStore as AdoptionNoticeStore2 } from "../../stores/AdoptionNoticeStore2/useStore";

function AdoptionPostPage({ gridArea }) {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 선언
    const { state, actions } = AdoptionNoticeStore2();
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [sortOption, setSortOption] = useState("euthanasiaDate");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [checkedItems, setCheckedItems] = useState(null); // 선택된 체크박스를 관리
    const [status, setStatus] = useState(""); // 모달에서 변경할 입양 상태
    const [reason, setReason] = useState(""); // 모달에서 변경할 사유
    const [allPosts, setAllPosts] = useState([ // 게시물 데이터 상태로 관리
        { id: 1, category: "강아지", title: "3세/믹스견/성격 나쁨", date: "2024-11-28", status: "입양불가", reason: "입양완료", scrap: true },
        { id: 2, category: "고양이", title: "2세/먼치킨/꼬리가 몸통만함", date: "2024-11-28", status: "예약중", reason: "", scrap: false },
        { id: 3, category: "기타동물", title: "1세/이구아나/공원에서 발견", date: "2024-11-28", status: "입양 불가", reason: "안락사", scrap: true },
        { id: 4, category: "강아지", title: "4세/시바견/산책 중 사람을 잘 따름", date: "2024-11-27", status: "입양 가능", reason: "", scrap: false },
        { id: 5, category: "고양이", title: "1세/페르시안/털이 많이 빠짐", date: "2024-11-26", status: "입양 불가", reason: "안락사", scrap: false },
        { id: 6, category: "기타동물", title: "2세/토끼/털이 길고 부드러움", date: "2024-11-25", status: "예약중", reason: "", scrap: false },
        { id: 7, category: "강아지", title: "5세/푸들/다소 예민", date: "2024-11-24", status: "입양 가능", reason: "", scrap: false },
        { id: 8, category: "고양이", title: "3세/러시안 블루/조용하고 친화적", date: "2024-11-23", status: "입양 불가", reason: "안락사", scrap: false },
        { id: 9, category: "기타동물", title: "6개월/햄스터/작고 귀여움", date: "2024-11-22", status: "입양 가능", reason: "", scrap: false },
        { id: 10, category: "강아지", title: "2세/비숑프리제/활발하고 사람 좋아함", date: "2024-11-21", status: "입양가능", reason: "", scrap: false }
    ]);

    const tabs = [
        { name: "전체", category: "ALL" },
        { name: "강아지", category: "DOG" },
        { name: "고양이", category: "CAT" },
        { name: "기타동물", category: "OTHERS" }
      ];
    const options = ["입양상태", "입양가능", "입양불가", "예약중"];
    const sortOptions = [
        "ALL",  // 입양상태
        "ADOPTABLE", // 입양가능
        "NOTADOPT", // 입양불가
        "RESERVATION", // 예약중
    ];

    // 페이지가 변경될 때마다 데이터 요청
    useEffect(() => {
        if (searchQuery == null || searchQuery == '') {
            actions.getAdoptionAdminListAction(currentPage, selectedCategory, sortOption);  // 페이지 번호가 변경되면 API 호출
        } else {
            actions.getSearchAdoptionAdminListAction(currentPage, selectedCategory, sortOption, searchQuery);  // 페이지 번호가 변경되면 API 호출
        }
    }, [currentPage, selectedCategory, sortOption, searchQuery]);
    console.log(state);

    // // 입양 상태와 검색어에 따라 필터링된 데이터
    // const filteredData = Array.isArray(state.notices.notices) ? state?.notices?.notices.filter(post => {
    //     if (selectedCategory === "스크랩 보기") {
    //         return post.scrap === true &&
    //             (post.id.toString().includes(searchQuery) || post.content?.toLowerCase().includes(searchQuery.toLowerCase()));
    //     }

    //     // 카테고리와 상태에 따른 필터링
    //     const isCategoryMatch = selectedCategory === "전체" || post.category === selectedCategory;
    //     const isStatusMatch = !selectedSubCategory || post.status === selectedSubCategory;

    //     return isCategoryMatch && isStatusMatch && post.id.toString().includes(searchQuery);
    // }) : [];

    // // 페이지당 보여지는 글 수
    // const postsPerPage = 8;

    // // 현재 페이지에 맞는 카드 데이터 계산
    // const currentPosts = filteredData.slice(
    //     (currentPage - 1) * postsPerPage,
    //     currentPage * postsPerPage
    // );

    // 전체 페이지 수 계산
    const totalElements = Number(state?.notices?.totalElements);
    const totalPages = Math.ceil(isNaN(totalElements) ? 0 : totalElements / 8);

    // 탭 클릭 시 카테고리 변경
    const handleTabClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // 카테고리 변경 시 페이지 1로 리셋
    };

    // // 카테고리 필터링
    // const filteredNotices = Array.isArray(state.notices.notices) ? state?.notices?.notices.filter(item => {
    //     console.log(item)
    //     if (selectedCategory === "ALL") {
    //         return true;
    //     }
    //     return item.noticeCategory === selectedCategory;
    // }) : []; // notices가 배열이 아닌 경우 빈 배열 반환

    // 검색어 변경 처리 함수
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // 검색 시 첫 페이지로 돌아가게 설정
    };

    // 페이지네이션 처리
    const handlePageClick = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;  // 유효한 페이지 번호만 처리
        setCurrentPage(pageNumber);  // 페이지 번호 업데이트
    };

    // 체크박스 상태 변경 처리
    const handleCheckBoxChange = (id) => {
        setCheckedItems(prevState => {
            if (prevState === id) {
                return null;  // 선택된 항목 해제
            } else {
                return id;  // 새 항목 선택
            }
        });

        const selectedPost = state?.notices?.notices?.find(post => post.announcementNum === id);
        setStatus(selectedPost.status);  // 상태와 이유도 업데이트
        setReason(selectedPost.reason);
    };


    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const openInfoModal = () => setIsInfoModalOpen(true);
    const closeInfoModal = () => setIsInfoModalOpen(false);

    const handleBtn1 = (e) => {
        e.preventDefault();
        if (checkedItems) {
            openInfoModal();
        } else {
            alert("수정할 게시물을 선택해주세요.");
        }
    };

    const handleBtn2 = () => {
        navigate('/adoption-newpost'); // 글쓰기 페이지로 이동
    };

    const handleConfirmClick = () => {
        const updatedPosts = state?.notices?.notices?.map(post =>
            post.announcementNum === checkedItems
                ? { ...post, status, reason } // 선택된 게시물의 status와 reason 업데이트
                : post
        );
        setAllPosts(updatedPosts); // 상태를 업데이트하여 렌더링에 반영
        setIsInfoModalOpen(false); // 모달 닫기
        setCheckedItems(null); // 체크박스 해제
    };

    // 정렬 옵션 변경 처리
    const handleSortChange = (option) => {
        const optionIndex = options.indexOf(option);
        if (optionIndex !== -1) {
            setSortOption(sortOptions[optionIndex]);
            setOrderBy(orders[optionIndex]);
        }
    };

    return (
        <div style={{ gridArea: gridArea }}>
            <div className={styles.mpcontainer}>
                <div className={styles.SearchBar}>
                    <SearchBar
                        placeholder={"공고번호"}
                        width="300px"
                        onSearch={handleSearch}
                    />
                </div>

                <div className={styles.SubNaviBar}>
                    <SubNaviBar tabs={tabs} onChange={handleTabClick} />
                </div>

                <div className={styles.content2}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>공고번호</th>
                                <th>글제목</th>
                                <th>작성날짜</th>
                                <th>
                                    <select
                                        name="category"
                                        id="category"
                                        style={{ border: "none", fontSize: "15px", fontWeight: "bold" }}
                                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                                    >
                                        <option value="">입양 상태</option>
                                        <option value="입양가능">입양 가능</option>
                                        <option value="입양불가">입양 불가</option>
                                        <option value="예약중">예약중</option>
                                    </select>
                                </th>
                                <th>사유</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state?.notices?.notices?.map(post => {
                                // ISO 8601 문자열을 JavaScript Date 객체로 변환
                                const createdAt = new Date(post.noticeCreatedAt);

                                // 날짜와 시간을 원하는 형식으로 변환
                                const formattedDate = createdAt.toLocaleDateString('ko-KR'); // 한국 날짜 형식

                                // adoptStatus 값에 따른 문자열 변환
                                let adoptStatusText = '';
                                switch (post.adoptStatus) {
                                    case 'ADOPTABLE':
                                        adoptStatusText = '입양가능';
                                        break;
                                    case 'NOTADOPT':
                                        adoptStatusText = '입양불가';
                                        break;
                                    case 'RESERVATION':
                                        adoptStatusText = '예약중';
                                        break;
                                    default:
                                        adoptStatusText = ''; // adoptStatus 값이 없으면 빈 문자열 반환
                                        break;
                                }

                                return (
                                    <tr key={post.announcementNum}>
                                        <td>
                                            <CheckBox
                                                checked={checkedItems === post.announcementNum}
                                                onChange={() => handleCheckBoxChange(post.announcementNum)}
                                            />
                                        </td>
                                        <td>{post.announcementNum}</td>
                                        <td>{post.noticeTitle}</td>
                                        <td>{formattedDate}</td> {/* 날짜와 시간을 합쳐서 표시 */}
                                        <td>{adoptStatusText}</td>
                                        <td>{post.impossibleReason === "NULL" ? "" : post.impossibleReason}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className={styles.pgnum}>
                    <Pagenumber
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageClick}
                    />
                    <div className={styles.adminbtn}>
                        <Button onClick={handleBtn1} text={"수정"} />
                        <Button text={"글쓰기"} onClick={handleBtn2} />
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isInfoModalOpen}
                closeModal={closeInfoModal}
                modalText={"수정 하시겠습니까?"}
                inPut={
                    <>
                        <div>
                            <label> 입양상태 ▼</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="입양 가능">입양 가능</option>
                                <option value="입양 불가">입양 불가</option>
                                <option value="예약중">예약중</option>
                            </select>
                        </div>
                        <div>
                            <label> 사유를 선택하세요 ▼</label>
                            <select value={reason} onChange={(e) => setReason(e.target.value)}>
                                <option value="입양 완료">입양 완료</option>
                                <option value="안락사">안락사</option>
                                <option value="자연사">자연사</option>
                                <option value="기타">기타</option>
                                <option value="">빈칸</option>
                            </select>
                        </div>
                    </>
                }
                confirmText={"확인"}
                cancelText={"취소"}
                onConfirm={handleConfirmClick}
            />
        </div>
    );
}

export default AdoptionPostPage;
