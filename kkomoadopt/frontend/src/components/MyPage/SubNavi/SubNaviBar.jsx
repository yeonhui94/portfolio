import { useState } from "react";
import SubTabRow from "./SubTapbRow";
import { LayoutGroup } from "framer-motion";

function SubNaviBar({ tabs, onTabClick, selectedCategory }) {
    const [selectedTab, setSelectedTab] = useState(0); // 현재 선택된 탭의 인덱스를 관리하는 상태

    const handleTabClick = (category, index) => {
        setSelectedTab(index);  // 클릭한 탭의 인덱스를 설정
        onTabClick(category);    // 카테고리 변경
    };

    return (
        <div>
            <LayoutGroup> {/* 애니메이션을 그룹화 */}
                <SubTabRow
                    items={tabs} // 탭 목록 전달
                    selectedTab={selectedTab} // 현재 선택된 탭 전달
                    onSelect={setSelectedTab} // 탭 선택 시 호출될 함수 전달
                    onTabClick={handleTabClick} // 탭 클릭 시 카테고리 변경
                    selectedCategory={selectedCategory}
                />
            </LayoutGroup>
        </div>
    );
}

export default SubNaviBar;
