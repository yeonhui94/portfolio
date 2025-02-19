import React from "react";
import styled from "styled-components";
import Card1 from "../../components/Card1/Card1"; // Card1 컴포넌트를 import합니다.
import { Link } from "react-router-dom";
import Card3 from "../../components/Card3/Card3";

const LinkStyled = styled(Link)`
  margin-inline: 0;
`;

const Section3 = ({ currentSlide, allImages }) => {
  const boxWidth = 260; // 슬라이드 하나의 가로 너비

  const imageData = [
    {  id :1,
      main: allImages[2], 
      others: [
        { image: allImages[1] },
        { image: allImages[3] },
        { image: allImages[2] },
      ],
      texts: ["3세/믹스견/애교 많은 성격"], 
      additionalTexts: ["입양종료 날짜:2025-12-20"] 
    },
    { id :2,
      main: allImages[4], 
      others: [
        { image: allImages[3] },
        { image: allImages[4] },
        { image: allImages[6] },
      ],
      texts: ["2세/믹스견/차분한 성격"], 
      additionalTexts: ["입양종료 날짜:2025-12-02"] 
    },
    { id :3,
      main: allImages[13], 
      others: [
        { image: allImages[13] },
        { image: allImages[14] },
        { image: allImages[15] },
      ],
      texts: ["3세/믹스견/사교적인 성격"], 
      additionalTexts: ["입양종료 날짜:2025-11-25"] 
    },
    { id :4,
      main: allImages[2], 
      others: [
        { image: allImages[1] },
        { image: allImages[2] },
        { image: allImages[3] },
      ],
      texts: ["5세/믹스견/차분한 성격"], 
      additionalTexts: ["입양종료 날짜:2025-10-15"] 
    },
    { id :5,
      main: allImages[7], 
      others: [
        { image: allImages[7] },
        { image: allImages[8] },
        { image: allImages[9] },
      ],
      texts: ["6세/믹스묘/조용함"], 
      additionalTexts: ["입양종료 날짜:2025-11-01"] 
    },
    { id :6,
      main: allImages[10], 
      others: [
        { image: allImages[10] },
        { image: allImages[11] },
        { image: allImages[12] },
      ],
      texts: ["4세/믹스묘/차분함"], 
      additionalTexts: ["입양종료 날짜:2025-11-05"] 
    }
  ];

  return (
    <SliderWrapper style={{boxShadow : "0 4px 8px rgba(0, 0, 0, 0.9)", borderRadius: "10px"}}>
      <SliderContainer currentSlide={currentSlide} boxWidth={boxWidth}>
        {imageData.map((slideData, index) => (
          <LinkStyled to={`/adoption-review/post/${slideData.id}`} key={slideData.id}>
          <Slide key={index} boxWidth={boxWidth}>
            <Card3 images={slideData} />
          </Slide>
          </LinkStyled>
        ))}
      </SliderContainer>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  width: 260px;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentSlide, boxWidth }) => `translateX(-${currentSlide * boxWidth}px)`};
`;

const Slide = styled.div`
  width: ${({ boxWidth }) => boxWidth}px;
  flex-shrink: 0;
`;

export default Section3;
