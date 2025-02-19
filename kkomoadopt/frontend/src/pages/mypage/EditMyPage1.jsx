import Divider from '../../components/Divider';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button/Button';
import styles from '../../pages/mypage/EditMyPage1.module.css';
import { useState,useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function EditMyPage1({ gridArea }) {

    const location = useLocation(); // 현재 경로를 가져옴

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [correctPassword, setCorrectPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setCorrectPassword(parsedUser.password); // 저장된 비밀번호 설정
        }
    }, []);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== correctPassword) {
            setError('비밀번호가 일치하지 않습니다.');
        } else {
            setError('');
            if (location.pathname.includes('admin')) {
                navigate('/mypage/admin/edit-profile2'); // 관리자 경로로 이동
            } else {
                navigate('/mypage/user/edit-profile2'); // 사용자 경로로 이동
            }
        }
    };

    return (
        <div className={styles.EditMyPageDiv1} style={{ gridArea: gridArea }}>
            <div style={{ gridArea: "title1" }}>
                <Divider text="본인확인" fontweight="midium" marTop="20px" />
            </div>

            <div className={styles.SecondDividerWrapper} style={{ gridArea: "title2" }}>
                <p style={{fontSize : "20px"}}>본인확인을 위해 비밀번호를 입력해주세요.</p>
            </div>

            <form className={styles.input1Form} onSubmit={handleSubmit} style={{ gridArea: "input1" }}>
                <InputBox
                    style={{ gridArea: "input2" }}
                    itype="password"
                    fontSize="20px"
                    text="비밀번호"
                    backgroundColor="white"
                    height="105px" width="97%"
                    border="none" borderBottom="none"
                    marginBottom="40px"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {error && <p className={styles.ErrorMessage}>{error}</p>}  {/* 오류 메시지 표시 */}
                <Button
                    style={{ gridArea: "btn1" }}
                    text="확인"
                    height="44px"
                    width="100px"
                    fontSize="15px"
                    marginLeft="10px"
                    marginTop="52px"
                    horizontalPadding="12px"
                    type="submit"  // 버튼 클릭 시 폼 제출
                    onClick={handleSubmit}
                />
            </form>
            <Outlet />
        </div>
    );
}

export default EditMyPage1;
