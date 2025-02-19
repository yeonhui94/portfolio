import styled from "styled-components";
import arrowIcon from "./icon/arrow.svg";

const StyledDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--line-color);
  border-radius: 50px;
  position: fixed; /* 화면에 고정 */
  bottom: 20px;   
  right: 20px;     
  cursor: pointer;
  z-index: 10;     /* 다른 요소 위에 오도록 설정 */
`;


const StyledImg = styled.img`
    
    width : 35px;
    height: 35px;
`



function TopButton() {
  // 화면 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 이동
    });
  };

  return (
    <>
      <StyledDiv onClick={scrollToTop}>
        <StyledImg src={arrowIcon} alt="scroll to top" />
      </StyledDiv>
    </>
  );
}

export default TopButton;