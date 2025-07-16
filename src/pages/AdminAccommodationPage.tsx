import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface AccommodationRequest {
  id: number;
  hostId: number;
  hostEmail: string;
  hostName: string;
  name: string;
  city: string;
  district: string;
  detailAddress: string;
  pricePerNight: number;
  bedroomCount: number;
  amenities: string;
  extraInfo: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  processedAt?: string;
}

const AdminPageContainer = styled.div`
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

const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const RequestCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RequestInfo = styled.div`
  font-size: 1rem;
  color: #555;
`;

const RequestActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button<{ approve?: boolean }>`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.3s ease;

  background-color: ${(props) => (props.approve ? "#28a745" : "#dc3545")};
  color: white;

  &:hover {
    background-color: ${(props) => (props.approve ? "#218838" : "#c82333")};
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-top: 2rem;
`;

const AdminAccommodationPage: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<AccommodationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchPendingRequests = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!token || userRole !== "ADMIN") {
      alert("접근 권한이 없습니다. 관리자 계정으로 로그인해주세요.");
      navigate("/login", { state: { from: "/admin/accommodations" } });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/accommodations/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data: AccommodationRequest[] = await response.json();
        setPendingRequests(data);
      } else if (response.status === 204) {
        setPendingRequests([]); // No content, so no pending requests
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "보류 중인 숙소 신청을 불러오는데 실패했습니다."
        );
      }
    } catch (err) {
      console.error("Failed to fetch pending accommodation requests:", err);
      setError("네트워크 오류 또는 서버 통신 실패.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleAction = async (id: number, action: "approve" | "reject") => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    let requestBody: { rejectionReason?: string } = {};
    let method = "POST";

    if (action === "reject") {
      const reason = prompt("숙소 등록을 거절하는 이유를 입력해주세요:");
      if (!reason) {
        alert("거절 이유를 입력해야 합니다.");
        return;
      }
      requestBody = { rejectionReason: reason };
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/accommodations/${id}/${action}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: action === "reject" ? JSON.stringify(requestBody) : undefined, // Only send body for reject
        }
      );

      if (response.ok) {
        alert(`숙소 신청이 성공적으로 ${action === "approve" ? "승인" : "거절"}되었습니다.`);
        fetchPendingRequests(); // Refresh the list
      } else if (response.status === 403) {
        alert("접근 권한이 없습니다. 관리자 계정으로 로그인해주세요.");
      } else {
        const errorData = await response.json();
        alert(
          errorData.message ||
            `숙소 신청 ${action === "approve" ? "승인" : "거절"} 중 오류가 발생했습니다.`
        );
      }
    } catch (err) {
      console.error(`Failed to ${action} accommodation request:`, err);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <Message>보류 중인 숙소 신청을 불러오는 중...</Message>;
  }

  if (error) {
    return <Message style={{ color: "#dc3545" }}>{error}</Message>;
  }

  return (
    <AdminPageContainer>
      <Title>숙소 등록 관리</Title>
      {pendingRequests.length === 0 ? (
        <Message>현재 보류 중인 숙소 신청이 없습니다.</Message>
      ) : (
        <RequestList>
          {pendingRequests.map((request) => (
            <RequestCard key={request.id}>
              <RequestInfo>
                <strong>숙소 ID:</strong> {request.id}
              </RequestInfo>
              <RequestInfo>
                <strong>숙소 이름:</strong> {request.name}
              </RequestInfo>
              <RequestInfo>
                <strong>호스트 이메일:</strong> {request.hostEmail}
              </RequestInfo>
              <RequestInfo>
                <strong>호스트 이름:</strong> {request.hostName}
              </RequestInfo>
              <RequestInfo>
                <strong>주소:</strong> {request.city} {request.district} {request.detailAddress}
              </RequestInfo>
              <RequestInfo>
                <strong>1박당 가격:</strong> {request.pricePerNight}원
              </RequestInfo>
              <RequestInfo>
                <strong>침실 수:</strong> {request.bedroomCount}
              </RequestInfo>
              <RequestInfo>
                <strong>편의 시설:</strong> {request.amenities}
              </RequestInfo>
              <RequestInfo>
                <strong>추가 정보:</strong> {request.extraInfo || "없음"}
              </RequestInfo>
              <RequestInfo>
                <strong>신청일:</strong> {new Date(request.createdAt).toLocaleString()}
              </RequestInfo>
              <RequestActions>
                <ActionButton approve onClick={() => handleAction(request.id, "approve")}>
                  승인
                </ActionButton>
                <ActionButton onClick={() => handleAction(request.id, "reject")}>
                  거절
                </ActionButton>
              </RequestActions>
            </RequestCard>
          ))}
        </RequestList>
      )}
    </AdminPageContainer>
  );
};

export default AdminAccommodationPage;
