import { useState } from "react";
import SubTab from "./SubTab.jsx";

function SubTabRow({ items, selectedTab, onSelect, onTabClick, selectedCategory }) {

    const handleTabClick = (category, index) => {
        onTabClick(category, index);  // 클릭 시 카테고리 변경
    };

    return (  
        <ul style={{ display: "flex", padding: 0 , outline: "none"}}>
            {items.map((item, index) => (
                <SubTab
                    key={index}
                    label={item.label}
                    link={item.link}  // 링크 사용 여부 확인
                    isSelected={selectedTab === index}  // 클릭한 탭만 밑줄 표시
                    onClick={() => handleTabClick(item.category, index)}  // 클릭 시 카테고리 변경
                />
            ))}
        </ul>
    );
}

export default SubTabRow;
