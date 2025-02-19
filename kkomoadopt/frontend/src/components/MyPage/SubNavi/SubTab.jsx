import { motion } from "framer-motion";
import styles from "../SubNavi/SubNaviBar.module.css"

function SubTab({ label, isSelected, onClick, link }) {
    return (
        <li
            onClick={onClick}
            className={styles.menuItem1}
        >
            <a
                href={link}
                style={{ textDecoration: "none", color: "inherit", fontSize: "1rem",fontWeight:"normal" }} // 링크 스타일 제거
            >
                {label}
            </a>
            {/* 클릭한 탭에만 밑줄이 나타나도록 조건부 렌더링 */}
            {isSelected && (
                <motion.div
                    layoutId="underline"
                    style={{
                        height: 4,
                        background: "#F8755B",
                        marginTop: 6,
                    }}
                    initial={{ width: 0 }}  // 처음에는 width가 0으로 시작
                    animate={{ width: "100%" }}  // 클릭 후 width를 100%로 확장
                    transition={{ duration: 0.3, ease: "easeInOut" }}  // 애니메이션 설정
                />
            )}
        </li>
    );
}

export default SubTab;
