import styled from "styled-components";
import img1 from "../../../assets/img2/1.jpg";
import img2 from "../../../assets/img2/2.jpg";
import img3 from "../../../assets/img2/3.jpg";
import Slider from "react-slick";
import ControlButton from "../../../container/section4/components/ControlButton";
import { useEffect, useRef, useState } from "react";

// styled-components에서 스타일 정의
const BoxWrap = styled.div`
    width: 100px; /* 적절한 크기로 수정 */
    height: 100px; /* 적절한 크기로 수정 */
    background-image: url(${({ url }) => url});

    background-size: cover; /* 이미지가 컨테이너에 맞게 크기 조정 */
    background-repeat: no-repeat; /* 이미지 반복 방지 */
    margin: 10px; /* 이미지 간격 조정 */
`;

const BoxWrap2 = styled.div`
    display : flex;
    flex-direction: row;
`
const Report_Imgbox = () => {
    // 이미지 배열
    const imgFiles = [img1, img2, img3];


    const [slideIndex, setSlideIndexState] = useState(0);
    const sliderRef = useRef(null)


    const slideimg = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: true,
        arrows: true,
        
      };

        // 다음 슬라이드로 이동
  const next = () => {
    sliderRef.current.slickNext();
    setSlideIndexState((prevIndex) => (prevIndex + 1) % imgFiles.length);
  };

  // 이전 슬라이드로 이동
  const previous = () => {
    sliderRef.current.slickPrev();
    setSlideIndexState((prevIndex) => (prevIndex - 1 + imgFiles.length) % imgFiles.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      next();
    }, 30000); 
    return () => clearInterval(intervalId); 
  }, [slideIndex]);

    return (
        <div>
        <Slider ref={sliderRef} {...slideimg}>
        <div style={{ display: "flex", flexDirection : "column"}}> 
            {imgFiles.map((img, index) => (
                <BoxWrap key={index} url={img} /> 
            ))}
        </div>
        </Slider>
                <div>
                <ControlButton direction="prev" onClick={previous}/>
                <ControlButton direction="next" onClick={next} />
              </div>
            </div>
    );
};

export default Report_Imgbox;
