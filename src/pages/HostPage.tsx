import React, { useEffect, useState } from "react";
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

const Button = styled.button<{ disabled?: boolean }>`
  padding: 1rem 2.5rem; /* Larger padding for button */
  background-color: ${(props) => (props.disabled ? "#ccc" : "#ff385c")};
  color: white;
  border: none;
  border-radius: 25px; /* More rounded button */
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#e61e4d")};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 56, 92, 0.4); /* Focus ring */
  }
`;

const HostPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHost, setIsHost] = useState(false); // 호스트 여부 상태 추가

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (userRole === "HOST") {
      setIsHost(true);
    } else {
      setIsHost(false);
    }
  }, [navigate, location]);

  const handleBecomeHost = () => {
    if (isHost) {
      navigate("/my-accommodations"); // 호스트인 경우 내 숙소 관리 페이지로 이동
    } else {
      navigate("/host-registration"); // 호스트가 아닌 경우 호스트 등록 페이지로 이동
    }
  };

  return (
    <HostPageContainer>
      <HostContentWrapper>
        <Title>호스트가 되어보세요</Title>
        <Description>
          {isHost
            ? "이미 호스트 권한이 있습니다. 숙소를 등록하거나 관리할 수 있습니다."
            : "여행객들과 공간을 공유하고 추가 수입을 얻으세요. 시작하기 매우 쉽습니다!"}
        </Description>
        <Button
          onClick={handleBecomeHost}
          disabled={!isHost && !localStorage.getItem("accessToken")}
        >
          {isHost ? "내 숙소 관리" : "시작하기"}
        </Button>
      </HostContentWrapper>
    </HostPageContainer>
  );
};

export default HostPage;
