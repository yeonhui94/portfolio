import styled from "styled-components";
import CardImage from "./CardImage";
import { useEffect, useState } from "react";

const CardWrapper = styled.div`
  display: block;
  width: 260px;
  height: 427px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;

  &:hover {
    .mainwrapper {
      height: 427px;
    }
    .styled-card.large-card {
      height: 319px;
    }

    .card-container {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.5s;
    }

    .divider,
    .additional-text {
      opacity: 0;
    }
  }
`;

const StyledCard = styled.div`
  width: ${({ width }) => width || "260px"};
  height: ${({ height }) => height || "427px"};
  border-radius: 10px;
  position: relative;
  overflow: visible;
  margin-top: ${({ top }) => top || "0"};
  min-width: ${({ minWidth }) => minWidth || "0"};
  min-height: ${({ minHeight }) => minHeight || "0"};
  display: ${({ display }) => display || "block"};
  flex-wrap: wrap;

  &.styled-card.small-card {
    width: ${({ width }) => width || "72px"};
    height: ${({ height }) => height || "72px"};
  }

  &.styled-card.large-card {
    transition: height 0.5s ease;
  }
`;

const CardContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 108px;
  opacity: 0;
  position: absolute;
  bottom: 0;
  transition: opacity 0.5s ease, transform 0.5s ease;  // 작은 카드들 

  &:hover {
    opacity: 1;
    transform: translateY(-20px);
  }
`;

const Card1 = ({ images, text, additionaltext }) => {
  const [smimage, setSmallimage] = useState("");  // 첫 번째 이미지를 위한 상태
  const [smimage2, setSmallimage2] = useState([]); // 나머지 이미지를 위한 상태

  useEffect(() => {
    if (images && Array.isArray(images)) {
      setSmallimage(images[0]); // 첫 번째 이미지를 설정
      setSmallimage2(images.slice(1, 4)); // 1번째부터 3번째까지의 이미지를 설정
    }
  }, [images]); // images 배열이 변경될 때마다 실행

  return (
    <CardWrapper className="mainwrapper">
      {/* 메인카드 분리 */}
      <StyledCard className="styled-card large-card">
        <CardImage
          imageFile={smimage}  // 첫 번째 이미지
          text={text || ""}
          ps={"top"}
          size={"1.5rem"}
          additionalText={additionaltext || ""}
          fontSize={"1rem"}
          isFirst={true}
        />
      </StyledCard>

      {/* 작은 이미지 컨테이너로 묶음 */}
      <CardContainer className="card-container">
        {Array.isArray(smimage2) && smimage2.length > 0 ? (
          smimage2.map((card, index) => (
            <StyledCard key={index} className="styled-card small-card" width="72px" height="72px">
              {index === smimage2.length - 1 ? (
                <CardImage
                  imageFile={card}  // 마지막 카드에 대한 이미지
                  thirdtext={"자세히 보기"} // 마지막 카드에만 '자세히 보기' 추가
                  isFirst={false}
                />
              ) : (
                <CardImage imageFile={card} text={""} />  // 나머지 이미지들
              )}
            </StyledCard>
          ))
        ) : (
          <p>No additional images available</p> // 추가 이미지가 없을 경우
        )}
      </CardContainer>
    </CardWrapper>
  );
};

export default Card1;
