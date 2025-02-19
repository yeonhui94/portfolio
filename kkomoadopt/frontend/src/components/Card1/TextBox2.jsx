import styled from "styled-components";

const TextBoxWrapper = styled.div`
    color: white;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9); 
    font-size: ${({ fontSize }) => fontSize }; 
    z-index: 3;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis;
    width: 100%;
`;

const TextBox2 = ({ text, size }) => {
  return <TextBoxWrapper fontSize={size}>{text}</TextBoxWrapper>;
};

export default TextBox2;