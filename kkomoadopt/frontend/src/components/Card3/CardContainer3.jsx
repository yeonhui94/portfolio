import styled from "styled-components";

const CardContainer3 = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 108px;
  opacity: 0;
  position: absolute;
  bottom: 0;
  transition: opacity 0.5s ease, transform 0.5s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-20px);
  }
`;

export default CardContainer3;
