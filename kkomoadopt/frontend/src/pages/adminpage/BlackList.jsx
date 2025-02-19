import { useState , useEffect} from "react";
import styles from "../mypage/MyPage.module.css";
import SearchBar from "../../components/SearchBar";
import Pagenumber from "../../components/pagenumber/Pagenumber";
import Button from "../../components/Button/Button";
import CheckBox from "../../components/CheckBox";  // CheckBox 임포트
import Modal from "../../components/Modal/Modal";
import axios from "axios";  // axios 임포트
import {useStore as UserStore} from "../../stores/UserStore2/useStore"


function Blacklist({ gridArea }) {
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [searchQuery, setSearchQuery] = useState('');
    const [checkedItems, setCheckedItems] = useState({});  // 체크박스 상태를 관리

    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 열기 상태
    const [selectedUsers, setSelectedUsers] = useState([]) // 모달 열면 체크된 사람들 보여줄 상태

    //테스트 데이터
    const [allPosts, setAllPosts] = useState([  // 게시물 예시 데이터
        { name: "지소엽", nickname: "재벌3세", number: "010-1234-1234", email: "soyeob@naver.com", isBlacklisted: true, blacklistReason: "음담패설", addedDate: new Date().toISOString() },
        { name: "조연희", nickname: "조랭삼", number: "010-2255-6688", email: "yeonhui@naver.com", isBlacklisted: true, blacklistReason: "음담패설", addedDate: new Date().toISOString() },
        { name: "장은지", nickname: "덴버", number: "010-4525-5553", email: "eunji@naver.com", isBlacklisted: true, blacklistReason: "음담패설", addedDate: new Date().toISOString() },
        // 다른 사용자들 추가
    ]);

    useEffect(()=> {
        actions.getBlackList(currentPage,searchQuery)
    },[currentPage,searchQuery,checkedItems,selectedUsers])

    const { state, actions } = UserStore();

    // 검색 필터링된 데이터
    const filteredData = allPosts.filter(post =>
        (post.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // 페이지당 보여지는 글 수
    const postsPerPage = 8;

    // 현재 페이지에 맞는 카드 데이터 계산
    const currentPosts = filteredData.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(state.userDataList.totalElements/ postsPerPage);

    // 검색어 변경 처리 함수
    const handleSearch = (query) => {
        setSearchQuery(query);  // 검색어를 상태에 저장
        setCurrentPage(1); // 검색 시 첫 페이지로 돌아가게 설정
    };

    // 페이지네이션 처리
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 체크박스 상태 변경 처리
    const handleCheckBoxChange = (nickname) => {
        setCheckedItems((prevState) => {
            const newCheckedItems = { ...prevState, [nickname]: !prevState[nickname] };
            // 체크된 사용자들 추출
            const selectedUsersList = Object.keys(newCheckedItems).filter(key => newCheckedItems[key]);
            setSelectedUsers(selectedUsersList); // 선택된 사용자 목록 업데이트
            return newCheckedItems;
        });
    };

    // 블랙리스트에서 사용자 제거 및 상태 업데이트
    const handleRemoveFromBlacklist = () => {
        const updatedPosts = allPosts.map(post => {
            if (selectedUsers.includes(post.nickname) && post.isBlacklisted) {
                return { ...post, isBlacklisted: false, status: "normal" }; // 상태를 "normal"로 변경
            }
            return post;
        });

        setAllPosts(updatedPosts); // 변경된 사용자 목록 상태 업데이트
        setIsModalOpen(false); // 모달 닫기
        setSelectedUsers([]); // 선택된 사용자 목록 초기화
    };

    // 블랙리스트 추가 또는 탈퇴 버튼 클릭 시 모달 열기
    const handleSubmit = async () => {
        try {
            // 실제 API 엔드포인트로 요청 보내기 (블랙리스트 삭제 처리)
            console.log(selectedUsers)
            let result = await actions.delBlackList({
                blackList : selectedUsers
            })

            if(result) {
                setSelectedUsers([])
            }
        } catch (error) {
            console.error("Error in API request:", error);
        }
    };

    // 모달에서 확인 버튼 클릭 시 처리
    const handleConfirm = () => {
        handleRemoveFromBlacklist(); // 선택된 사용자들을 일반 사용자로 전환하는 함수 호출
        fetchAllPosts(); // 블랙리스트 사용자 목록을 새로 고침
    };

    // 서버에서 블랙리스트 사용자 목록을 가져오는 함수
    const fetchAllPosts = async () => {
        try {
            const response = await axios.get("/api/blacklist"); // 블랙리스트 사용자 목록을 API로부터 가져오기
            setAllPosts(response.data); // 받은 데이터를 상태에 업데이트
        } catch (error) {
            console.error("Error fetching all posts:", error);
        }
    };

    return (
        <div style={{ gridArea: gridArea }}>
            <div className={styles.mpcontainer}>
                <div className={styles.SearchBar}>
                    <SearchBar
                        placeholder={"닉네임 & 이메일"}
                        width="300px"
                        onSearch={handleSearch} />
                </div>

                <div className={styles.content2}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>선택</th>
                                <th>이름</th>
                                <th>닉네임</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>사유</th>
                                <th>추가된 날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                        {state?.userDataList ? state?.userDataList?.content.map(post => (
                                <tr key={post.email}> {/* key는 이메일로 설정 */}
                                    <td>
                                        <CheckBox
                                            checked={!!checkedItems[post.nickname]}
                                            onChange={() => handleCheckBoxChange(post.nickname)}
                                        />
                                    </td>
                                    <td>{post.name}</td>
                                    <td>{post.nickname}</td>
                                    <td>{post.email}</td>
                                    <td>{post.phoneNumber}</td>
                                    <td>{post?.blacklists[0]?.blackReason}</td>
                                    <td>{post?.blacklists[0]?.blackedDate}</td>
                                </tr>
                            )) : null}
                        </tbody>
                    </table>
                </div>

                <div className={styles.pgnum}>
                    <Pagenumber
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageClick={handlePageClick}
                    />
                    <div className={styles.adminbtn}>
                        <Button text={"삭제"} onClick={handleSubmit} />
                    </div>
                </div>

                {/* 모달 컴포넌트 */}
                <Modal
                    isOpen={isModalOpen}
                    modalText={`블랙리스트에서 삭제할 사용자: ${selectedUsers.join(", ")}`}
                    closeModal={() => setIsModalOpen(false)}
                    handleConfirm={handleConfirm} // handleConfirm 함수 전달
                    selectedUsers={selectedUsers} // 선택된 사용자들 전달
                    confirmText="확인"
                    cancelText="취소"
                />
            </div>
        </div>
    );
}

export default Blacklist;
