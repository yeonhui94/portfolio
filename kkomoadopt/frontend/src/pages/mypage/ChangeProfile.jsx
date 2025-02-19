import Divider from "../../components/Divider";
import Uploadfile from "../community/adopt_review/Uploadfile";
import Button from "../../components/Button/Button"
import styles from "./Changeprofile.module.css";
import InputField from "../../components/InputField";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const ChangeProfile = () => {

    const [fileData, setFileData] = useState([]);
    // const [profileImage, setProfileImage] = useState(null);
    const {setProfileImage : updateProfileImgae , setProfileLetter: updateProfileLetter } = useOutletContext();
    const [letterData, setLetterData] = useState('');

    // useEffect(()=>{
    //     //로컬스토리지에서 이미지 불러오기
    //     const storedImage = localStorage.getItem('profileImage');
    //     if (storedImage) {
    //         setProfileImage(storedImage);
    //     }
    // }, []);

    // 파일 정보가 변경될 때마다 실행되는 함수
    const handleFileChange = (files) => {
        console.log('선택된 파일:', files); 
        setFileData(files); // 선택된 파일 데이터 저장
    };

    const handleLetterChange = (letter)=>{
        console.log("소개글 입력" , letter.target.value);
        setLetterData(letter.target.value);
    }

//     const handleSaveProfile=()=>{
//         console.log('저장할 파일 데이터:', fileData);
//     // 파일 데이터가 존재하는지 확인
//     if (fileData && fileData.length > 0) {
//         const reader = new FileReader();
//         reader.onload = () => {
//             localStorage.setItem('profileImage', reader.result); // 로컬스토리지에 이미지 저장
//             updateProfileImgae(reader.result); // 상태 업데이트
//             console.log("이미지 파일 저장 완료");
//         };

//         reader.readAsDataURL(fileData[0]); // 첫 번째 파일을 읽기
//     } else {
//         console.log("파일 선택 안됨");
//     }

//     console.log("변경된 소개글", letterData);
//     if(letterData && letterData.length > 0){
//         localStorage.setItem('profileLetter', letterData); // 로컬스토리지에 소개글 저장
//         updateProfileLetter(letterData); // 상태 업데이트
//         console.log('소개글 변경');
//     } else {
//         console.log("소개글이 비어 있음");
//     }
// };
const handleSaveProfile = () => {
    console.log('저장할 파일 데이터:', fileData);

    // 파일 데이터가 존재하는지 확인
    if (fileData && fileData.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
            // 로컬스토리지에서 'user' 객체를 가져옵니다.
            const storedUserData = localStorage.getItem('user');
            const parsedUserData = storedUserData ? JSON.parse(storedUserData) : {};

            // 'user' 객체의 userImgUrl을 업데이트
            parsedUserData.userImgUrl = reader.result;
            localStorage.setItem('user', JSON.stringify(parsedUserData)); // 수정된 'user' 객체를 다시 로컬스토리지에 저장

            updateProfileImgae(reader.result); // 상태 업데이트
            console.log("이미지 파일 저장 완료");
        };

        reader.readAsDataURL(fileData[0]); // 첫 번째 파일을 읽기
    } else {
        console.log("파일 선택 안됨");
    }

    console.log("변경된 소개글", letterData);

    if (letterData && letterData.length > 0) {
        // 로컬스토리지에서 'user' 객체를 가져옵니다.
        const storedUserData = localStorage.getItem('user');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : {};

        // 'user' 객체의 profileText를 업데이트
        parsedUserData.profileText = letterData;
        localStorage.setItem('user', JSON.stringify(parsedUserData)); // 수정된 'user' 객체를 다시 로컬스토리지에 저장

        updateProfileLetter(letterData); // 상태 업데이트
        console.log('소개글 변경');
    } else {
        console.log("소개글이 비어 있음");
    }
};


    return (
        <div className={styles.chfWrapper} >
            <Divider text={"프로필 변경"} fontweight={"midium"} ></Divider>
            <div className={styles.chfsmWrapper}>
                <div className={styles.chfsmWrapper1}>
                    <div className={styles.divider}  >
                        <Divider text={"프로필 사진"} height={"2px"} fontSize={"1rem"} fontweight={"midium"} width={"100%"} backgroundColor={"var(--line-color)"}></Divider>
                    </div>
                    <div>
                        <Uploadfile
                            maxFiles={1}  // 파일 1개만 선택 가능
                            showImagePreview={true}  // 이미지 미리보기 활성화
                            onChange={(files)=>handleFileChange(files)}  // 파일 목록이 변경되면 호출될 함수
                        />
                    </div>
                </div>
                <div className={styles.chfsmWrapper2}>
                    <div className={styles.divider}  >
                        <Divider text={"프로필 소개글"} height={"2px"} fontSize={"1rem"} fontweight={"midium"} width={"100%"} backgroundColor={"var(--line-color)"}></Divider>
                    </div>
                    <InputField onChange={handleLetterChange} maxLength={15} width={"-webkit-fill-available"} placeholder={"소개글을 입력해주세요.(최대 15자)"} height={"auto"}></InputField>
                </div>
            </div>
            <div className={styles.chfsmWrapper2}>
                <Button text={"수정"} width={"100%"} onClick={handleSaveProfile}></Button>
            </div>
        </div>
    )
};
export default ChangeProfile;