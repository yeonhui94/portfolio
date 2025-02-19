import styled from "styled-components";
// import CardImage from "./CardImage";
import CardImage3 from "./CardImage3";
import CardContainer3 from "./CardContainer3";
import CardWrapper3 from "./CardWrapper3";

const CardWrapper = styled.div`
  width: 260px;
  height: 427px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  transition:transform 0.5s ease-in-out;

  &:hover {
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
  overflow : visible;
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
  transition: opacity 0.5s ease, transform 0.5s ease;  //작은 카드들 

  &:hover {
    opacity: 1;
    transform: translateY(-20px);
  }
`;

const Card3 = ({ images }) => {
  return (
    <CardWrapper3 >
      {/* 메인카드 분리 */}
      <StyledCard className="styled-card large-card">
        <CardImage3
          imageFile={images.main}
          text={images.texts[0]}
          ps={"top"}
          size={"1.5rem"}
          additionalText={images.additionalTexts[0]}
          fontSize={"1rem"}
          isFirst={true}
        />
      </StyledCard>

      {/* 작은 이미지 컨테이너로 묶음 */}
      <CardContainer3 className="card-container">
        {images.others.map((card, index) => (
          <StyledCard key={index} className="styled-card small-card" width="72px" height="72px">
            {index === images.others.length - 1 ? (
              <CardImage3
                imageFile={card.image}
                thirdtext={"자세히 보기"} // 마지막 카드에만 '자세히 보기' 추가
                isFirst={false}
              />
            ) : (
              <CardImage3 imageFile={card.image} text={""} />
            )}
          </StyledCard>
        ))}
      </CardContainer3>
    </CardWrapper3>
  );
};

export default Card3;
