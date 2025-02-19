import styled from "styled-components";
// import Header from "../container/header/Header";
// import Footer from "../../container/Footer";
import Divider from "../../../components/Divider";
import styles from "../CommunityWt.module.css";
import { Form, Outlet } from "react-router-dom";
import Uploadfile from "../adopt_review/Uploadfile";
import Button from "../../../components/Button/Button";
import wtstyles from "../CommunityWt.module.css";

const Missing_CommunityWt = ({ gridArea}) => {
  return (
    <Form 
    style={{gridArea : gridArea}} className={styles.Container}>
        {/* 제목과 인풋박스를 묶은 부분 */}
        <div className={styles.inputContainer}>
          <h3>제목</h3>
          <input type="text" className={styles.input} />
        </div>

        {/* 이미지와 파일첨부 버튼 */}
        <div className={styles.inputContainer}>
          <h3>이미지 (필수)</h3>
          <Uploadfile/>
        </div>

        {/* 내용 입력 */}
        <div className={styles.textAreaContainer}>
          <h3>내용</h3>
          <textarea className={styles.textArea} defaultValue={`\n동물 종류:\n\n잃어버린 날짜:\n잃어버린 장소:\n\n연락처:\n필수정보:\n알아야할 내용:\n\n사진첨부\n`} />
        </div>

        {/* 등록 버튼 */}
        <a className={wtstyles.submitButtonContainer}>
          <Button className={wtstyles.smallButton} text={"등록"} width={"100px"} fontSize={"20px"}/>
        </a>
    </Form>
  );
};
export default Missing_CommunityWt;
