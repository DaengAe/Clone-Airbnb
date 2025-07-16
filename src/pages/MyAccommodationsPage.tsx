import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface AccommodationStatusResponse {
  id: number;
  name: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  processedAt?: string;
}

const MyAccommodationsContainer = styled.div`
  padding: 2rem;
  min-height: calc(100vh - 120px);
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const AccommodationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const AccommodationCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const AccommodationInfo = styled.div`
  font-size: 1rem;
  color: #555;
`;

const StatusBadge = styled.span<{ status: "PENDING" | "APPROVED" | "REJECTED" }>`
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  background-color: ${(props) =>
    props.status === "APPROVED"
      ? "#28a745"
      : props.status === "PENDING"
      ? "#ffc107"
      : "#dc3545"};
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-top: 2rem;
`;

const getKoreanStatus = (status: "PENDING" | "APPROVED" | "REJECTED") => {
  switch (status) {
    case "PENDING":
      return "승인 대기중";
    case "APPROVED":
      return "승인됨";
    case "REJECTED":
      return "거부됨";
    default:
      return status;
  }
};

const MyAccommodationsPage: React.FC = () => {
  const [accommodations, setAccommodations] = useState<AccommodationStatusResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchMyAccommodations = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!token || userRole !== "HOST") {
      alert("호스트만 접근 가능합니다.");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/accommodations/my-accommodations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data: AccommodationStatusResponse[] = await response.json();
        setAccommodations(data);
      } else if (response.status === 204) {
        setAccommodations([]); // No content, so no accommodations
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "숙소 목록을 불러오는데 실패했습니다."
        );
      }
    } catch (err) {
      console.error("Failed to fetch my accommodations:", err);
      setError("네트워크 오류 또는 서버 통신 실패.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAccommodations();
  }, []);

  const handleCardClick = (accommodationId: number) => {
    navigate(`/accommodation-status/${accommodationId}`);
  };

  if (loading) {
    return <Message>숙소 목록을 불러오는 중...</Message>;
  }

  if (error) {
    return <Message style={{ color: "#dc3545" }}>{error}</Message>;
  }

  return (
    <MyAccommodationsContainer>
      <Title>내 숙소 관리</Title>
      {accommodations.length === 0 ? (
        <Message>등록된 숙소가 없습니다.</Message>
      ) : (
        <AccommodationList>
          {accommodations.map((accommodation) => (
            <AccommodationCard key={accommodation.id} onClick={() => handleCardClick(accommodation.id)}>
              <AccommodationInfo>
                <strong>숙소 이름:</strong> {accommodation.name}
              </AccommodationInfo>
              <AccommodationInfo>
                <strong>상태:</strong> <StatusBadge status={accommodation.status}>{getKoreanStatus(accommodation.status)}</StatusBadge>
              </AccommodationInfo>
              <AccommodationInfo>
                <strong>신청일:</strong> {new Date(accommodation.createdAt).toLocaleDateString()}
              </AccommodationInfo>
              {accommodation.processedAt && (
                <AccommodationInfo>
                  <strong>처리일:</strong> {new Date(accommodation.processedAt).toLocaleDateString()}
                </AccommodationInfo>
              )}
            </AccommodationCard>
          ))}
        </AccommodationList>
      )}
    </MyAccommodationsContainer>
  );
};

export default MyAccommodationsPage;
