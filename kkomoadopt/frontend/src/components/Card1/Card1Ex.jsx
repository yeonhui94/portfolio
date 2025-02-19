import React from 'react';
import img1 from '../../assets/img2/1.jpg'; 
import img2 from '../../assets/img2/2.jpg'; 
import img3 from '../../assets/img2/3.jpg'; 
import img4 from '../../assets/img2/4.jpg'; 
import Card1 from '../../components/Card1/Card1';

function Card1Ex() {
  const images = {
    main: img1, // 메인 이미지
    texts: ["Main Text"], // 메인 이미지 텍스트
    additionalTexts: ["Additional Information"], // 추가 텍스트
    others: [ // 작은 카드들
      { image: img2 },
      { image: img3 },
      { image: img4 },
    ],
  };

  return (
    <div className="App">
      <Card1 images={images} />
    </div>
  );
}

export default Card1Ex;
