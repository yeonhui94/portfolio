import styled from "styled-components";
import Section33 from "./Section33";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
`;

const Section = styled.div`
    flex-grow: 1; /* 각 섹션이 화면 크기에 맞게 자동으로 크기 조정 */
    margin: 0 10px; /* 섹션들 사이에 여백 추가 */
`;

const GroupSection = () => {
    return (
        <Wrapper>
            <Section>
                <Section33 />
            </Section>
            <Section>
                <Section33 />
            </Section>
            <Section>
                <Section33 />
            </Section>
        </Wrapper>
    );
};

export default GroupSection;
