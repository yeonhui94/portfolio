import styled from "styled-components";
import TextBox2 from "./TextBox2.jsx"; 

const BackgroundDiv = styled.div`
  background-color: black;
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0.4;
  z-index: 2;
`;

const ImageWrapper = styled.div`
  display: grid;
  grid-template:
    "image" auto
    "text" auto
    "..." auto
    "divider" 2px
    "additional-text" auto / 1fr;
  justify-content: ${({ ps }) => (ps === "top" ? "left" : "center")};
  align-items: ${({ ps }) => (ps === "top" ? "flex-start" : "center")};
  position: relative;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-image: url(${({ url }) => url});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10px;
`;

const Divider = styled.div`
  grid-area: divider ;
  height: 2px;
  background-color: white;
  width: 90%;
  justify-self: center;
  z-index: 3;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const AdditionalTextWrapper = styled.div`
  justify-content: center;
  align-self: end;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  z-index: 3;
  padding-bottom: 10px;
`;

const ThirdText = styled.div`
  color: white;
  font-size: 0.7rem;
  font-weight : bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  justify-self: center;
  align-self: center;
  z-index: 3;
  white-space: nowrap;
  padding-top: 10px;
`;


const AdditionalText = styled.div`
  grid-area: additional-text;
  color: white;
  font-size: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  justify-self: center;
  align-self: center;
  z-index: 3;
  white-space: nowrap;
  overflow: hidden;  
  text-overflow: ellipsis;
  max-width: 20ch;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const CardImage = ({ imageFile, text, additionalText, ps, size, isFirst,thirdtext }) => {
  return (
    <ImageWrapper url={imageFile} ps={ps}>
      <BackgroundDiv />
      {isFirst && <Divider className="divider" />}
      <TextBox2 text={text} size={size}  />
      <AdditionalText className="additional-text">{additionalText}</AdditionalText>
      {thirdtext && <ThirdText>{thirdtext}</ThirdText>}
    </ImageWrapper>
  );
};

export default CardImage;  
