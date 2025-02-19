import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Divider from '../../components/Divider';
import InputBox from '../../components/InputBox';
import styles from '../../pages/mypage/EditMyPage2.module.css';
import { nicknamePattern, pwPattern } from "../../utils/regExp"; // 유효성 검사 패턴 가져오기
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

function EditMyPage2({ gridArea }) {

    const location = useLocation(); // 현재 경로를 가져옴
    const isAdminPage = location.pathname.includes('admin'); // 경로가 /mypage/admin으로 포함되어 있는지 확인
    // 관리자를 확인하고, 유저 페이지에서 수정하도록 구현

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData(parsedUser  || '');
            setNickname(parsedUser.nickname || '');
            setPhoneNumber(parsedUser.phoneNumber || '');
        }
    }, []);

    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [nicknameValid, setNicknameValid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(null);
    const [passwordError, setPasswordError] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setNicknameError('');
    };
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleDuplicateCheck = (e) => {
        e.preventDefault();
        if (nickname === userData.nickname) {
            setNicknameValid(false);
            setNicknameError('사용할 수 없는 닉네임 입니다.');
            return;
        }

        if (nickname === '관리자' && userData.nickname !== '관리자') {
            setNicknameValid(false);
            setNicknameError('닉네임 "관리자"는 사용할 수 없습니다.');
            return;
        }

        if (nickname.match(nicknamePattern)) {
            setNicknameValid(true);
            setNicknameError('');
        } else {
            setNicknameValid(false);
            setNicknameError('사용할 수 없는 닉네임 입니다.');
        }
    };

    const handlePassword = (e) => {
        const inputPassword = e.target.value;
        setPassword1(inputPassword);
        if (inputPassword === userData.password) {
            setPasswordMessage('비밀번호가 일치합니다');
        } else {
            setPasswordMessage('비밀번호가 일치하지 않습니다');
        }
    };

    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);

        if (!pwPattern.test(passwordValue)) {
            setPasswordError("비밀번호는 최소 8자 이상 16자 이하, 숫자와 문자가 모두 포함되어야 합니다.");
        } else {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (event) => {
        const confirmPass = event.target.value;
        setConfirmPassword(confirmPass);

        if (password === confirmPass) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nickname.match(nicknamePattern)) {
            alert('닉네임이 유효하지 않습니다.');
            return;
        }
        if (!pwPattern.test(password)) {
            alert('비밀번호가 유효하지 않습니다.');
            return;
        }
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 로컬스토리지의 사용자 정보 업데이트
        const updatedUserData = { ...userData, nickname, password,phoneNumber };
        localStorage.setItem('user', JSON.stringify(updatedUserData));

        alert('수정 되었습니다.');
        navigate('/mypage/user/edit-profile1');
    };
    const openInfoModal = () => setIsInfoModalOpen(true);
    const closeInfoModal = () => setIsInfoModalOpen(false);

    const handleBtn1 = (e) => {
        e.preventDefault();
        openInfoModal();
        
    };

    const handleConfirmClick = () => {
        localStorage.removeItem('user');
        navigate('/secession');
        closeInfoModal();
    };

    return (
        <div style={{ gridArea: gridArea }}>
            <div style={{ gridArea: "title1" }}>
                <Divider text={isAdminPage ? "관리자정보 수정" : "회원정보 수정"} fontweight="midium" marTop="20px" />
            </div>
            <form>
                <div className={styles.EditMyPageDiv2}>
                    <div className={styles.SecondDividerWrapper1}>
                        <p style={{ fontSize: "1.2rem" }}>기본정보</p>
                    </div>

                    <form className={styles.input1Form}>
                        <InputBox style={{ gridArea: "input2" }}
                            itype="text" fontSize="20px"
                            text="닉네임" backgroundColor="white"
                            height="105px" width="350px"
                            border="none" borderBottom="none"
                            marginBottom="40px"
                            value={nickname}
                            onChange={handleNicknameChange} />

                        <Button style={{ gridArea: "btn1" }}
                            text="중복확인" height="44px"
                            width="100px" fontSize="15px"
                            marginTop="51px" horizontalPadding="12px"
                            marginLeft="-25px"
                            onClick={handleDuplicateCheck}
                            type="button" />

                        {nicknameError && (
                            <p style={{ position: "absolute", gridArea: "text", color: 'red', fontSize: '10px', marginLeft: "20px", marginTop: "100px" }}>
                                {nicknameError}
                            </p>
                        )}
                        {nicknameValid && (
                            <p style={{ position: "absolute", gridArea: "text", color: 'green', fontSize: '10px', marginLeft: "20px", marginTop: "100px" }}>
                                사용이 가능한 닉네임 입니다.
                            </p>
                        )}
                    </form>

                    <div className={styles.input2}>
                        <InputBox style={{ marginTop: "20px", gridArea: "contents3" }}
                            itype="tel" text="휴대폰 번호"
                            backgroundColor="white" height="97px"
                            width="350px" marginBottom="40px"
                            border="none" borderBottom="none"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            />
                    </div>

                    <div className={styles.SecondDividerWrapper2}>
                        <p style={{ fontSize: "1.2rem" }}>비밀번호 변경</p>
                    </div>

                    <div className={styles.input3}>
                        <div>
                            <InputBox
                                itype="password" text="현재 비밀번호"
                                backgroundColor="white" height="97px"
                                width="350px" marginBottom="20px"
                                border="none" borderBottom="none"
                                value={password1}
                                onChange={handlePassword} />

                            {passwordMessage && (
                                <p style={{
                                    position: "absolute", color: passwordMessage === '비밀번호가 일치합니다' ? 'green' : 'red',
                                    fontSize: '10px', marginLeft: "20px", marginTop: "-25px"
                                }}>
                                    {passwordMessage}
                                </p>
                            )}
                        </div>
                        <InputBox
                            itype="password" text="변경 비밀번호"
                            backgroundColor="white" height="97px"
                            width="350px" marginBottom="20px"
                            border="none" borderBottom="none"
                            value={password}
                            onChange={handlePasswordChange} />

                        {passwordError && <p style={{
                            color: "red", fontSize: "10px",
                            position: "absolute", marginTop: "-25px", marginLeft: "18px"
                        }}>
                            {passwordError}
                        </p>}

                        <InputBox
                            itype="password" text="변경 비밀번호 확인"
                            backgroundColor="white" height="97px"
                            width="350px" marginBottom="40px"
                            border="none" borderBottom="none"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange} />
                        {passwordMatch !== null && (
                            <p
                                style={{
                                    color: passwordMatch ? "green" : "red",
                                    fontSize: '10px', position: "absolute",
                                    marginTop: "-45px", marginLeft: "20px"
                                }}
                            >
                                {passwordMatch ? "비밀번호가 일치합니다" : "비밀번호가 일치하지 않습니다"}
                            </p>
                        )}
                    </div>

                    <Button text="수정" width="100%" marginLeft="10px" marginBottom="40px" onClick={handleSubmit} />
                </div>
            </form>

            {!isAdminPage && (
                <div>
                    <div className={styles.SecondDividerWrapper2}>
                        <p style={{ fontSize: "1.2rem" }}>회원 탈퇴</p>
                    </div>
                    <Button color="#444444" bg1color="#444444" text="회원 탈퇴"
                        width="100%" arginLeft="10px" marginTop="60px" marginBottom="20px"
                        onClick={handleBtn1} />
                </div>
            )}

            {!isAdminPage && (
                <Modal
                    isOpen={isInfoModalOpen}
                    closeModal={closeInfoModal}
                    modalText="탈퇴 하시겠습니까?"
                    confirmText={"확인"}
                    cancelText={"취소"}
                    onConfirm={handleConfirmClick} />
            )}
            <Outlet />
        </div>
    );
}

export default EditMyPage2;