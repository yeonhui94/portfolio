import styled from "styled-components";

const StyledCard = styled.div`
  width: ${({ width }) => width || "260px"};
  height: ${({ height }) => height || "427px"};
  border-radius: 10px;
  position: relative;
  margin-top: ${({ top }) => top || "0"};
  min-width: ${({ minWidth }) => minWidth || "0"};
  min-height: ${({ minHeight }) => minHeight || "0"};
  display: ${({ display }) => display || "block"};
  flex-wrap: wrap;
  transition: height 0.5s ease;

  &.styled-card.small-card {
    height: ${({ height }) => height || "72px"};
  }

  &.styled-card.large-card {
    transition: height 0.5s ease;
  }
`;

export default StyledCard;
