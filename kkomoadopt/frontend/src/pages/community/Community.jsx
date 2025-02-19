import React, { useState, useEffect } from 'react';
import SubMenuBar from '../../components/submenubar/SubMenuBar';
import { Outlet, useLocation } from 'react-router-dom';

function Community({ gridArea }) {
  const location = useLocation();

  // 메뉴 아이템 정의
  const menuItems = [
    { name: '공지사항', path: '/community' },
    { name: '아이를 찾습니다', path: '/community/find-child' },
    { name: '입양 후기', path: '/community/adoption-review' },
    { name: '사고팝니다', path: '/community/resell' },
    { name: '신고합니다', path: '/community/report' },
  ];

  // selectedButton 초기값을 첫 번째 메뉴인 '공지사항'으로 설정
  const [selectedButton, setSelectedButton] = useState(menuItems[0].path);

  useEffect(() => {
    // 페이지가 새로 고침되었을 때, 경로에 맞는 버튼을 선택하도록 업데이트
    const activePath = menuItems.find((item) => item.path === location.pathname)?.path;
    if (activePath) {
      setSelectedButton(activePath);  // 현재 경로에 맞는 메뉴를 활성화
    } else {
      setSelectedButton(menuItems[0].path);  // 없으면 기본값인 '공지사항' 메뉴 선택
    }
  }, [location.pathname]); // location.pathname에 의존

  return (
    <div style={{ gridArea: gridArea }}>
      <SubMenuBar
        menuItems={menuItems}
        selectedButton={selectedButton}
        onTabClick={setSelectedButton} // 버튼 클릭 시 상태 업데이트
      />
      <Outlet />
    </div>
  );
}

export default Community;
