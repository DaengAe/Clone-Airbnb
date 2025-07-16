import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

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

interface AccommodationStatusResponse {
  id: number;
  name: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  processedAt?: string;
  rejectionReason?: string; // 거절 이유 필드 추가
}

const AccommodationStatusPage: React.FC = () => {
  const { accommodationId } = useParams<{ accommodationId: string }>();
  const navigate = useNavigate();
  const [accommodationStatus, setAccommodationStatus] =
    useState<AccommodationStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!token || userRole !== "HOST") {
      alert("호스트만 접근 가능합니다.");
      navigate("/login", { replace: true });
      return;
    }

    if (!accommodationId) {
      setError("숙소 ID가 제공되지 않았습니다.");
      setLoading(false);
      return;
    }

    const fetchAccommodationStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/accommodations/${accommodationId}/status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data: AccommodationStatusResponse = await response.json();
          setAccommodationStatus(data);
        } else if (response.status === 204) {
          setError("해당 숙소의 상태를 찾을 수 없습니다.");
        } else if (response.status === 403) {
          setError("접근 권한이 없습니다.");
        } else {
          const errorData = await response.json();
          setError(errorData.message || "숙소 상태를 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("Failed to fetch accommodation status:", err);
        setError("네트워크 오류 또는 서버 통신 실패.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationStatus();
  }, [accommodationId, navigate]);

  const getStatusMessage = () => {
    if (!accommodationStatus) return "";

    switch (accommodationStatus.status) {
      case "PENDING":
        return `숙소 '${accommodationStatus.name}'의 등록 신청이 접수되어 승인 대기 중입니다.`;
      case "APPROVED":
        return `축하합니다! 숙소 '${accommodationStatus.name}'가 성공적으로 승인되었습니다.`;
      case "REJECTED":
        return `숙소 '${accommodationStatus.name}'의 등록 신청이 거부되었습니다.`;
      default:
        return "알 수 없는 상태입니다.";
    }
  };

  const getTitle = () => {
    if (!accommodationStatus) return "숙소 등록 현황";

    switch (accommodationStatus.status) {
      case "PENDING":
        return "숙소 등록 대기 중";
      case "APPROVED":
        return "숙소 등록 승인 완료!";
      case "REJECTED":
        return "숙소 등록 거부";
      default:
        return "숙소 등록 현황";
    }
  };

  const handleButtonClick = () => {
    if (accommodationStatus?.status === "APPROVED") {
      navigate("/host/my-accommodations"); // 내 숙소 목록 페이지로 이동 (가정)
    } else if (accommodationStatus?.status === "REJECTED") {
      navigate(`/register-property/${accommodationId}`); // 다시 등록 페이지로 이동 (ID 포함)
    } else {
      navigate("/my-accommodations"); // 목록으로 이동
    }
  };

  const getButtonText = () => {
    if (!accommodationStatus) return "홈으로";

    switch (accommodationStatus.status) {
      case "APPROVED":
        return "내 숙소 목록 보기";
      case "REJECTED":
        return "다시 등록하기";
      default:
        return "목록으로";
    }
  };

  if (loading) {
    return (
      <StatusPageContainer>
        <StatusContentWrapper>
          <Title>상태 확인 중...</Title>
          <Message>
            숙소 등록 상태를 불러오는 중입니다. 잠시만 기다려주세요.
          </Message>
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
        {accommodationStatus?.createdAt && (
          <Message style={{ fontSize: "0.9rem", color: "#888" }}>
            신청일:{" "}
            {new Date(accommodationStatus.createdAt).toLocaleDateString()}
          </Message>
        )}
        {accommodationStatus?.processedAt && (
          <Message style={{ fontSize: "0.9rem", color: "#888" }}>
            처리일:{" "}
            {new Date(accommodationStatus.processedAt).toLocaleDateString()}
          </Message>
        )}
        {accommodationStatus?.status === "REJECTED" && accommodationStatus.rejectionReason && (
          <Message style={{ fontSize: "0.9rem", color: "#dc3545", fontWeight: "bold" }}>
            거절 이유: {accommodationStatus.rejectionReason}
          </Message>
        )}
        <Button onClick={handleButtonClick}>{getButtonText()}</Button>
      </StatusContentWrapper>
    </StatusPageContainer>
  );
};

export default AccommodationStatusPage;
