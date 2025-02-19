import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import Slider from "react-slick";
import img1 from "../../../assets/img2/1.jpg";
import img2 from "../../../assets/img2/2.jpg";
import img3 from "../../../assets/img2/3.jpg";
import img4 from "../../../assets/img2/4.jpg";
import styled from "styled-components";
import commust from "../Commu_post.module.css";

// styled-components로 스타일 정의
const SliderContainer = styled.div`
  width: 100%;
  height: 100%; /* 부모 div 높이 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledSlider = styled(Slider)`
  width: 100%; /* 슬라이드의 너비 설정 (화면의 80%) */
  height: 100%; /* 부모 div와 동일한 높이 *
  display: flex;
  justify-content: center;
  align-items: center;

`;

const SlideWrapper2 = styled.div`
  display: flex;
  background-repeat: no-repeat; 
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; /* 슬라이드 높이를 부모와 동일하게 설정 */]
`;

const SlideImage = styled.img`
  display:  flex;
  justify-self: center;
  align- self: center;
  max-width: 100%;  /* 최대 너비는 100% */
  max-height: 100%; /* 최대 높이는 100% */
  object-fit: cover; /* 이미지 비율을 유지하면서 영역에 맞추기 */
  object-position: center; /* 이미지를 항상 중앙에 배치 */
  position: relative;
  background-repeat: no-repeat;
  

`;

// 화살표 버튼 스타일
const ArrowButton = styled.button`
  display : block;
  width: 100px;
  height: 100px;
  background-color: transparent;
  opacity : 60%;
  border-radius: 50%;
  z-index: 100;
  color: blue; /* SVG에 적용 */

  &:focus {
    outline: none;
  }
  &:hover {
    opacity : 100%;
  }
  &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg); /* 화살표 중앙 정렬 및 회전 */
      width: 30px; /* 화살표 크기 설정 */
      height: 30px; /* 화살표 크기 설정 */
      border: 2px solid #444; /* 테두리 스타일 */
      border-top: none; /* 위쪽 테두리 제거 */
      border-right: none; /* 오른쪽 테두리 제거 */
      ${(props) =>
          props.direction === 'left'
             ? 'transform: translate(-50%, -50%) rotate(45deg);' // 왼쪽 화살표
             : 'transform: translate(-50%, -50%) rotate(-135deg);'} // 오른쪽 화살표

  }

  /* 버튼 내 텍스트 크기 조정 */

`;

function PostSlickSlide_adopt({img}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: img.length > 1, // 버튼을 보이게 설정
    customPaging: function(i) {
      return <button>{i + 1}</button>;
    },
    adaptiveHeight: true,
    prevArrow: <ArrowButton direction="left">←</ArrowButton>,
    nextArrow: <ArrowButton direction="right">→</ArrowButton>,
  };

  if (!img) return null; 
  
  return (
    <SliderContainer>
      <StyledSlider {...settings}>
      {Array.from(new Set(img)).map((image, index) => (
          <SlideWrapper2 key={index}>
            <SlideImage src={image} alt={`Slide ${index + 1}`} />
          </SlideWrapper2>
        ))}
      </StyledSlider>
    </SliderContainer>
  );
}

export default PostSlickSlide_adopt;
