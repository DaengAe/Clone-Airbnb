import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const HostPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px); /* Adjust height as needed */
  padding: 2rem; /* Add padding for overall spacing */
`;

const HostContentWrapper = styled.div`
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  max-width: 600px; /* Adjust max-width for better readability */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  text-align: center; /* Center text within the wrapper */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
`;

const Title = styled.h1`
  font-size: 2.5rem; /* Larger title */
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2.5rem; /* More space before button */
  line-height: 1.6;
`;

const Button = styled.button`
  padding: 1rem 2.5rem; /* Larger padding for button */
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 25px; /* More rounded button */
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e61e4d;
    transform: translateY(-2px); /* Slight lift on hover */
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 56, 92, 0.4); /* Focus ring */
  }
`;

const HostPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅 사용

  // 로그인 상태 확인 및 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
      // 현재 경로를 state로 전달하여 로그인 후 다시 돌아올 수 있도록 함
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [navigate, location]); // navigate와 location을 의존성 배열에 추가

  const handleBecomeHost = () => {
    console.log("User is now a host!");
    navigate("/host-registration");
  };

  return (
    <HostPageContainer>
      <HostContentWrapper>
        <Title>호스트가 되어보세요</Title>
        <Description>
          여행객들과 공간을 공유하고 추가 수입을 얻으세요. 시작하기 매우 쉽습니다!
        </Description>
        <Button onClick={handleBecomeHost}>시작하기</Button>
      </HostContentWrapper>
    </HostPageContainer>
  );
};

export default HostPage;
