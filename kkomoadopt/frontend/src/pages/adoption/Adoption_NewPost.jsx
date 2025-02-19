import { useEffect, useState } from "react";
import Divider from "../../components/Divider";
import InputBox from "../../components/InputBox";
import Uploadfile from "../community/adopt_review/Uploadfile";
import styles from "./AdoptNewPost.module.css";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { Outlet, useNavigate } from "react-router-dom";
import { useStore as AdoptionNoticeStore2 } from "../../stores/AdoptionNoticeStore2/useStore";
import axios from "axios";

const Adoption_NewPost = ({ gridArea }) => {
    const { state, actions } = AdoptionNoticeStore2();
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 열기 상태
    const [formData, setFormData] = useState({
         files: [] // 파일 데이터
    });

    const navigate = useNavigate();

    // 파일 정보가 변경될 때마다 실행되는 함수
    const handleFileChange = (files) => {
        setFormData((prevData) => ({
            ...prevData,
            files // 파일을 formData에 추가
        }));
    };

    const [text, setText] = useState("");

    const handleInputChange = (e) => {
        console.log(e)
        const { name, value } = e.target;

        console.log(name, value)

        setFormData((prevData) => ({
            ...prevData,
            [name]: e.target.value // name을 기준으로 상태 업데이트
        }));

        setText(value);

        // 텍스트의 내용에 따라 textarea 높이를 자동으로 조정
        e.target.style.height = 'auto';  // 높이를 'auto'로 설정해서 기본 높이로 리셋
        e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞춰 높이 설정
    };


    // 폼 데이터를 서버로 전송하는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
        
            if (key !== 'files') {
                formDataObj.append(key, formData[key]);
            }
        });

        // 파일 처리 부분 수정
        if (formData?.files  && formData.files.length > 0) {
            formData.files.forEach(file => {
                formDataObj.append('files', file);
            });
        }

        for (let pair of formDataObj.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }


        console.log(formDataObj)

        // createAdoptionPostAction 액션을 호출하여 게시물 생성
          let result =await actions.createAdoptionPostAction(formDataObj);

        if(result.data.success ) {
                setIsModalOpen(true)
            } else {
                alert('공지글 저장에 실패했습니다.');
            }    
     
    };

    // 모달에서 확인 버튼 클릭 시 페이지 이동
    const handleConfirm = async (e) => {
        e.preventDefault();  // 기본 폼 제출 방지
        closeModal();  // 모달 닫기
        state.notices = []
        await handleSubmit(e); // 서버에 데이터 전송 후 이동
        navigate("/adoption");  // '입양' 페이지로 이동
    };

    // 모달을 닫는 함수
    const closeModal = () => {
        setIsModalOpen(false);  // 모달 닫기
    };

    // InputBox 설정 정보 배열
    const inputFields = [
        { name:'noticeTitle',  text: "제목", placeholder: "예시 : 3세 / 믹스견 / 소심함", border1: "1px solid var(--mainpage-dark)", border: "none" },
        { name:'noticeCategory',text: "카테고리", placeholder: "강아지, 고양이, 기타동물 중 입력해주세요.", backgroundColor1: "var(--sub-color)" },
        { name:'animalType',text: "품종", placeholder: "예시 : 믹스견", backgroundColor1: "var(--sub-color)" },
        { name:'announcementNum',text: "공고 번호", placeholder: "예시 : 2025-05-10T09:00:00", backgroundColor1: "var(--sub-color)" },
        { name:'euthanasiaDate',text: "공고마감 날짜", placeholder: "예시 : 2024-12-30", backgroundColor1: "var(--sub-color)" }
    ];

    // 각 textarea에 대한 설정 배열
    const fields = [
        { name:'noticeContent', label: "내용", placeholder: "" },
        
    ];

    return (
        <div style={{ gridArea }}>
            <div className={styles.postheader}>
                <Divider text={"입양"} width={"100%"} textAlign={"center"} paddingbt={"10px"} fontSize={"1.5rem"} />

                {/* InputBox 컴포넌트를 map을 사용해 반복 렌더링 */}
                {inputFields.map((field, index) => (
                    <InputBox
                        key={index}
                        value={formData[field.text]}
                        backgroundColor={field.backgroundColor1 || "white"}
                        padding2={"none"}
                        onChange={handleInputChange}
                        border1={field.border1 || "none"}
                        padding3={"5px"}
                        name={field.name}
                        text={field.text}
                        placeholder={field.placeholder}
                        height={"auto"}WW
                        borderBottom={"1px solid #ededed"}
                        border={field.border || "1px solid #ededed"}
                        radius={"none"}
                        width1={"none"}
                    />
                ))}

                <Uploadfile
                    maxFiles={4}  // 파일 1개만 선택 가능
                    showImagePreview={false}  // 이미지 미리보기 활성화
                    onChange={handleFileChange}  // 파일 목록이 변경되면 호출될 함수
                />

                <div className={styles.textarea}>
                    <p className={styles.p}>내용</p>
                    {/* 반복되는 textarea 요소들 */}
                    <div className={styles.textareaWrapper}>
                        {fields.map((field, index) => (
                            <div key={index} className={styles.fixedTextWrapper}>
                                <span className={styles.fixedText}>{field.label}: </span>
                                <textarea
                                    className={styles.textareaField}
                                    name={field.name} // name 속성 추가
                                    value={formData[field.label]} // 상태에서 해당 값 바인딩
                                    placeholder={field.placeholder}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                    </div>

                </div>
                <div className={styles.postbtn}>
                    <Button text={"등록"} onClick={handleSubmit} />
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                modalText="입양 게시물이 등록되었습니다."
                confirmText="확인"
                cancelText="취소"
                onConfirm={handleConfirm} //입양페이지로 이동
            />
            <Outlet />
        </div>

    );
}

export default Adoption_NewPost;
