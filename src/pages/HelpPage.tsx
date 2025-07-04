import React from "react";
import styled from "styled-components";

const HelpPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 120px); /* Adjust height as needed */
  padding: 2rem;
  background-color: #f7f7f7;
`;

const HelpContentWrapper = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  line-height: 1.6;
  color: #333;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #ff385c;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const List = styled.ul`
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
`;

const ContactInfo = styled.div`
  margin-top: 3rem;
  text-align: center;
  font-size: 1.1rem;
  color: #555;
`;

const HelpPage: React.FC = () => {
  return (
    <HelpPageContainer>
      <HelpContentWrapper>
        <Title>도움말</Title>

        <SectionTitle>환영합니다!</SectionTitle>
        <Paragraph>
          저희 에어비앤비 클론 사이트를 이용해 주셔서 감사합니다. 이곳은 숙소를
          찾고 예약하거나, 자신의 공간을 공유하여 호스트가 될 수 있는
          플랫폼입니다.
        </Paragraph>

        <SectionTitle>주요 기능</SectionTitle>
        <List>
          <ListItem>
            <strong>숙소 검색 및 예약:</strong> 다양한 필터를 사용하여 원하는
            숙소를 쉽게 찾고 예약할 수 있습니다.
          </ListItem>
          <ListItem>
            <strong>호스트 되기:</strong> 자신의 여유 공간을 등록하여
            여행객들에게 제공하고 수입을 창출할 수 있습니다.
          </ListItem>
          <ListItem>
            <strong>숙소 등록:</strong> 호스트가 된 후, 자신의 숙소에 대한 상세
            정보(사진, 주소, 가격, 편의 시설 등)를 등록할 수 있습니다.
          </ListItem>
          <ListItem>
            <strong>로그인/회원가입:</strong> 안전하고 편리하게 계정을 생성하고
            로그인하여 모든 기능을 이용할 수 있습니다.
          </ListItem>
        </List>

        <SectionTitle>자주 묻는 질문 (FAQ)</SectionTitle>
        <List>
          <ListItem>
            <strong>Q: 숙소 예약은 어떻게 하나요?</strong>
            <br />
            A: 메인 페이지에서 원하는 숙소를 검색한 후, 상세 페이지에서 예약
            가능 여부를 확인하고 예약 버튼을 클릭하여 진행할 수 있습니다.
          </ListItem>
          <ListItem>
            <strong>Q: 호스트가 되려면 어떻게 해야 하나요?</strong>
            <br />
            A: 로그인 후 '호스트 되기' 페이지로 이동하여 간단한 절차를 거치면
            호스트로 등록될 수 있습니다.
          </ListItem>
          <ListItem>
            <strong>Q: 숙소 등록 시 필요한 정보는 무엇인가요?</strong>
            <br />
            A: 숙소 이름, 주소(시/도, 시/군/구, 상세 주소), 1박당 가격, 침실 수,
            편의 시설, 숙소 사진 등이 필요합니다.
          </ListItem>
        </List>

        <ContactInfo>
          <Paragraph>더 궁금한 점이 있으시면 언제든지 문의해주세요.</Paragraph>
          <Paragraph>이메일: support@airbnbclone.com</Paragraph>
        </ContactInfo>
      </HelpContentWrapper>
    </HelpPageContainer>
  );
};

export default HelpPage;
