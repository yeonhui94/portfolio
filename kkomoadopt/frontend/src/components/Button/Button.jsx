import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledButton = styled.button`
     height: ${({ height }) => height || "auto"};  // 높이를 받도록 설정
  width: ${({ width }) => width || "auto"};  
    padding :   ${props => props.verticalPadding || "12px"}
                ${props => props.horizontalPadding || "26px"}; /* 두글자 기준 26px, 네글자 12px */
    color: ${props => props.color ? props.color : 'var(--main-color)'};
    background-color: ${props => props.backColor ? props.backColor : 'white'};
    border: 2px solid ${props => props.bg1color ? props.bg1color : 'var(--main-color)'};
    border-radius : 10px;
    font-weight: ${props => props.fontWeight ? props.fontWeight : 'none'};
    font-size : ${props => props.fontSize ? props.fontSize : 'none'};
    margin-bottom : ${props => props.marginBottom ? props.marginBottom : '0px'};
    margin-top : ${props => props.marginTop ? props.marginTop : '0px'};
    margin-left : ${props => props.marginLeft ? props.marginLeft : '0px'};
    margin-right : ${props => props.marginRight ? props.marginRight : '0px'};
    text-decoration: none; /* 링크 스타일 제거 때문에 필요합니당 */
white-space: nowrap;
    &:hover {
        color: ${props => props.hovercolor ? props.hovercolor : 'white'};/* 호버 시 텍스트는 항상 흰색 */
        background-color: ${props => props.bg1color || "var(--main-color)"}; /* 배경색 */
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none; 
    display: inline-block;
`;


function Button({
    width, height, color, hovercolor, bg1color, backColor,
    text, horizontalPadding, verticalPadding, onClick,
    fontWeight, fontSize, marginBottom, marginTop, marginLeft, marginRight, to }) {

    if (to) {
        return (
            <StyledLink to={to}>
                <StyledButton
                    width={width}
                    height={height}
                    color={color}
                    bg1color={bg1color}
                    verticalPadding={verticalPadding}
                    horizontalPadding={horizontalPadding}
                    fontWeight={fontWeight}
                    fontSize={fontSize}
                    marginBottom={marginBottom}
                    marginTop={marginTop}
                    backColor={backColor}
                    hovercolor={hovercolor}
                    onClick={onClick}
                    marginLeft={marginLeft}
                    marginRight={marginRight}
                >

                    {text}
                </StyledButton>
            </StyledLink>
        )
    }
    return (
        <StyledButton
            width={width}
            height={height}
            color={color}
            bg1color={bg1color}
            verticalPadding={verticalPadding}
            horizontalPadding={horizontalPadding}
            fontWeight={fontWeight}
            fontSize={fontSize}
            marginBottom={marginBottom}
            marginTop={marginTop}
            backColor={backColor}
            hovercolor={hovercolor}
            onClick={onClick}
            marginLeft={marginLeft}
            marginRight={marginRight}
        >
            {text}
        </StyledButton>
    );
}

export default Button;