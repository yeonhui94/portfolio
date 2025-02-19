import React from 'react';
import img1 from '../../assets/CardImage/1.jpg'; 
import img2 from '../../assets/CardImage/1.jpg'; 
import img3 from '../../assets/CardImage/1.jpg'; 
import img4 from '../../assets/CardImage/1.jpg'; 
import Card3 from './Card3';

function Card3Ex() {
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
      <Card3 images={images} />
    </div>
  );
}

export default Card3Ex;
