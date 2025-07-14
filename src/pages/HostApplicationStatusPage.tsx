import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StatusPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 2rem;
  text-align: center;
`;

const StatusContentWrapper = styled.div`
  background-color: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e61e4d;
    transform: translateY(-2px);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 56, 92, 0.4);
  }
`;

interface HostRequestStatusResponse {
  status: "NONE" | "PENDING" | "APPROVED" | "REJECTED";
  requestDate?: string;
}

const HostApplicationStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const [hostStatus, setHostStatus] =
    useState<HostRequestStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login", { state: { from: "/host-application-status" } });
      return;
    }

    const fetchHostStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/host-requests/status",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data: HostRequestStatusResponse = await response.json();
          setHostStatus(data);
        } else if (response.status === 204) {
          setHostStatus({ status: "NONE" });
        } else {
          setError("호스트 신청 상태를 불러오는데 실패했습니다.");
          setHostStatus({ status: "NONE" });
        }
      } catch (err) {
        console.error("Failed to fetch host status:", err);
        setError("네트워크 오류 또는 서버 통신 실패.");
        setHostStatus({ status: "NONE" });
      } finally {
        setLoading(false);
      }
    };

    fetchHostStatus();
  }, [navigate]);

  const getStatusMessage = () => {
    if (!hostStatus) return "";

    switch (hostStatus.status) {
      case "PENDING":
        return "호스트 신청이 접수되어 승인 대기 중입니다. 관리자 승인까지 기다려주세요.";
      case "APPROVED":
        return "축하합니다! 호스트로 승인되었습니다. 이제 숙소를 등록할 수 있습니다.";
      case "REJECTED":
        return "호스트 신청이 거부되었습니다. 자세한 내용은 관리자에게 문의하거나 다시 신청해주세요.";
      case "NONE":
        return "아직 호스트 신청 내역이 없습니다.";
      default:
        return "알 수 없는 상태입니다.";
    }
  };

  const getTitle = () => {
    if (!hostStatus) return "호스트 신청 현황";

    switch (hostStatus.status) {
      case "PENDING":
        return "호스트 신청 대기 중";
      case "APPROVED":
        return "호스트 승인 완료!";
      case "REJECTED":
        return "호스트 신청 거부";
      case "NONE":
        return "호스트 신청 현황";
      default:
        return "호스트 신청 현황";
    }
  };

  const handleButtonClick = () => {
    if (hostStatus?.status === "APPROVED") {
      navigate("/register-property"); // 숙소 등록 페이지로 이동
    } else if (hostStatus?.status === "REJECTED" || hostStatus?.status === "NONE") {
      navigate("/host-registration"); // 다시 신청 페이지로 이동
    } else {
      navigate("/"); // 홈으로 이동
    }
  };

  const getButtonText = () => {
    if (!hostStatus) return "홈으로";

    switch (hostStatus.status) {
      case "APPROVED":
        return "숙소 등록하기";
      case "REJECTED":
      case "NONE":
        return "다시 신청하기";
      default:
        return "홈으로";
    }
  };

  if (loading) {
    return (
      <StatusPageContainer>
        <StatusContentWrapper>
          <Title>상태 확인 중...</Title>
          <Message>호스트 신청 상태를 불러오는 중입니다. 잠시만 기다려주세요.</Message>
        </StatusContentWrapper>
      </StatusPageContainer>
    );
  }

  if (error) {
    return (
      <StatusPageContainer>
        <StatusContentWrapper>
          <Title>오류 발생</Title>
          <Message style={{ color: "#dc3545" }}>{error}</Message>
          <Button onClick={() => navigate("/")}>홈으로</Button>
        </StatusContentWrapper>
      </StatusPageContainer>
    );
  }

  return (
    <StatusPageContainer>
      <StatusContentWrapper>
        <Title>{getTitle()}</Title>
        <Message>{getStatusMessage()}</Message>
        {hostStatus?.requestDate && hostStatus.status !== "NONE" && (
          <Message style={{ fontSize: "0.9rem", color: "#888" }}>
            신청일: {new Date(hostStatus.requestDate).toLocaleDateString()}
          </Message>
        )}
        <Button onClick={handleButtonClick}>{getButtonText()}</Button>
      </StatusContentWrapper>
    </StatusPageContainer>
  );
};

export default HostApplicationStatusPage;
