import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HostRegistrationPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 2rem;
`;

const HostRegistrationFormWrapper = styled.div`
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #ff385c;
    box-shadow: 0 0 0 2px rgba(255, 56, 92, 0.2);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
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

const ErrorMessage = styled.p`
  color: #ff385c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

interface HostRequestStatusResponse {
  status: "NONE" | "PENDING" | "APPROVED" | "REJECTED";
  requestDate?: string;
}

const HostRegistrationPage: React.FC = () => {
  const [businessRegistrationNumber, setBusinessRegistrationNumber] =
    useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token from localStorage in HostRegistrationPage:", token);
    if (!token) {
      navigate("/login", { state: { from: "/host-registration" } });
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

        if (response.status === 204) {
          // No host request found, proceed to render the form.
          // No action needed here, just let the component render the form.
        } else if (response.ok) {
          const data: HostRequestStatusResponse = await response.json();
          if (data.status === "PENDING" || data.status === "APPROVED") {
            navigate("/host-application-status");
            return;
          }
        } else {
          const errorData = await response.json();
          setError(errorData.message || "호스트 신청 상태를 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("Failed to fetch host status:", err);
        setError("네트워크 오류 또는 서버 통신 실패.");
      } finally {
        setLoading(false);
      }
    };

    fetchHostStatus();
  }, [navigate]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!businessRegistrationNumber.trim()) {
      errors.businessRegistrationNumber = "사업자 등록 번호를 입력해주세요.";
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "전화번호를 입력해주세요.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/host-requests/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 인증 토큰 포함
        },
        body: JSON.stringify({ businessRegistrationNumber, phoneNumber }),
      });

      if (response.ok) {
        alert(
          "호스트 신청이 완료되었습니다. 관리자 승인 후 호스트 활동이 가능합니다."
        );
        navigate("/host-application-status"); // 신청 완료 후 현황 페이지로 이동
      } else {
        const errorData = await response.json();
        setGeneralError(
          errorData.message || "호스트 신청 중 오류가 발생했습니다."
        );
      }
    } catch (error) {
      console.error("호스트 신청 요청 실패:", error);
      setGeneralError("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <HostRegistrationPageContainer>
        <HostRegistrationFormWrapper>
          <Title>상태 확인 중...</Title>
          <p style={{ textAlign: "center", color: "#555" }}>
            호스트 신청 상태를 불러오는 중입니다. 잠시만 기다려주세요.
          </p>
        </HostRegistrationFormWrapper>
      </HostRegistrationPageContainer>
    );
  }

  if (error) {
    return (
      <HostRegistrationPageContainer>
        <HostRegistrationFormWrapper>
          <Title>오류 발생</Title>
          <ErrorMessage style={{ textAlign: "center" }}>{error}</ErrorMessage>
          <SubmitButton onClick={() => navigate("/")}>홈으로</SubmitButton>
        </HostRegistrationFormWrapper>
      </HostRegistrationPageContainer>
    );
  }

  return (
    <HostRegistrationPageContainer>
      <HostRegistrationFormWrapper>
        <Title>호스트 신청</Title>
        <p style={{ textAlign: "left", marginBottom: "1.5rem", color: "#555" }}>
          호스트로 활동하기 위해 추가 정보를 입력해주세요.
        </p>
        <form onSubmit={handleSubmit}>
          {generalError && <ErrorMessage>{generalError}</ErrorMessage>}

          <FormGroup>
            <Label htmlFor="businessRegistrationNumber">사업자 등록 번호</Label>
            <Input
              type="text"
              id="businessRegistrationNumber"
              value={businessRegistrationNumber}
              onChange={(e) => setBusinessRegistrationNumber(e.target.value)}
              placeholder="예: 123-45-67890"
            />
            {formErrors.businessRegistrationNumber && (
              <ErrorMessage>
                {formErrors.businessRegistrationNumber}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phoneNumber">전화번호</Label>
            <Input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="예: 010-1234-5678"
            />
            {formErrors.phoneNumber && (
              <ErrorMessage>{formErrors.phoneNumber}</ErrorMessage>
            )}
          </FormGroup>

          <SubmitButton type="submit">신청하기</SubmitButton>
        </form>
      </HostRegistrationFormWrapper>
    </HostRegistrationPageContainer>
  );
};

export default HostRegistrationPage;
