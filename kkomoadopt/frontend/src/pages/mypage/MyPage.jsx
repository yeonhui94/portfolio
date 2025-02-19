import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserNavi from '../../components/MyPage/MypageNaviBar/User/UserNavi'; // UserNavi 컴포넌트 경로에 맞게 설정
import AdminNavi from "../../components/MyPage/MypageNaviBar/Adim/AdminNavi"; // AdminNavi 컴포넌트 경로에 맞게 설정
import Profile from "../../components/MyPage/Profile/Profile";
import styles from "./MyPage.module.css";
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMypageAdoptList } from "../../service/apiService";

function MyPage({ gridArea }) {
  const location = useLocation(); // 현재 경로를 가져옴
  const isAdminPage = location.pathname.includes('admin'); // 경로가 /mypage/admin으로 포함되어 있는지 확인
  const [profileImage, setProfileImage] = useState('');
  const [profileLetter, setProfileLetter] = useState('');
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const getMypageAdoptListAction = async () => {
      try {
        const response = await getMypageAdoptList();
        console.log('Notices Data:', response);  // 데이터 콘솔에 출력
      }
      catch (error) {
        console.error("입양 게시물을 불러올 수 없습니다.", error);
      }
    }
    getMypageAdoptListAction();

    // const getMypageCommentListAction = async () => {
    //   try {
    //     const response = await getMypageCommentList();
    //     console.log('Comments Data:', response);  // 데이터 콘솔에 출력
    //   }
    //   catch (error) {
    //     console.error("입양 게시물을 불러올 수 없습니다.", error);
    //   }
    // }
    // getMypageCommentListAction();

    // const getMypageCommunityPostListAction = async () => {
    //   try {
    //     const response = await getMypageCommunityPostList();
    //     console.log('Communities Data:', response);  // 데이터 콘솔에 출력
    //   }
    //   catch (error) {
    //     console.error("입양 게시물을 불러올 수 없습니다.", error);
    //   }
    // }
    // getMypageCommunityPostListAction();

    // const getMypageQnAListAction = async () => {
    //   try {
    //     const response = await getMypageQnAList();
    //     console.log('Qnas Data:', response);  // 데이터 콘솔에 출력
    //   }
    //   catch (error) {
    //     console.error("입양 게시물을 불러올 수 없습니다.", error);
    //   }
    // }
    // getMypageQnAListAction();

    // const getMypageVisitRequestListAction = async () => {
    //   try {
    //     const response = await getMypageVisitRequestList();
    //     console.log('VisitRequest Data:', response);  // 데이터 콘솔에 출력
    //   }
    //   catch (error) {
    //     console.error("입양 게시물을 불러올 수 없습니다.", error);
    //   }
    // }
    // getMypageVisitRequestListAction();

    const storedAdoptData = localStorage.getItem('adoption');
    const storedUserData = localStorage.getItem('user');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

    if (parsedUserData) {
      setUserData(parsedUserData);
      setProfileImage(parsedUserData.userImgUrl);
      setProfileLetter(parsedUserData.profileText);  // 기본 텍스트 설정
    }
  }, []);

  // userData가 로드되지 않으면 로딩 화면 표시
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mpWrapper}>
      <div className={styles.Profile}>
        {/* 공통적인 프로필 정보 렌더링 */}
        <Profile
          name={isAdminPage ? '관리자' : userData.nickname}
          text1={isAdminPage ? '관리자입니다.' : userData.profileText ? userData.profileText : '프로필이 없습니다'}
          btnName1={isAdminPage ? '관리자 정보 변경' : '프로필 변경'}
          btnName2={'로그아웃'}
          profileImageUrl={profileImage}
          profileLetter={profileLetter}
          btnLink1={isAdminPage ? '/mypage/admin/edit-profile1' : "/mypage/user/change-profile"}
        />
      </div>

      <div className={styles.mpsmallWrapper}>
        {/* 경로에 맞는 네비게이션을 렌더링 */}
        {isAdminPage ? <AdminNavi /> : <UserNavi />}
        {/* 자식 라우트를 Outlet으로 렌더링 */}
        <Outlet context={{ setProfileImage, setProfileLetter }} />
      </div>
    </div>
  );
}

export default MyPage;
