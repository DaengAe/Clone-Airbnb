import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import PasswordInput from "../components/input_form/PasswordInput";
import CommonInput from "../components/input_form/CommonInput";
import validationMessages from "../constants/validationMessages";

const ErrorMessage = styled.p`
  color: #ff385c;
  font-size: 0.8rem;
  margin-top: -0.8rem;
  margin-bottom: 1rem;
`;

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
`;

const LoginForm = styled.form`
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #e61e4d;
  }
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅 사용

  // 로그인 상태라면 로그인 페이지 접근 불가 -> 홈으로 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;

    if (email.trim() === "") {
      setEmailError(validationMessages.login.email.blank);
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError(validationMessages.login.email.invalid);
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError(validationMessages.login.password.blank);
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError(validationMessages.login.password.tooShort);
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(""); // 서버 에러 초기화

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // JSON 파싱
        setServerError(errorData.error || validationMessages.login.fail); // 'error' 필드 값 사용
        return;
      }

      const data = await response.json();
      console.log("로그인 성공:", data);

      // 토큰 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("email", email);
      localStorage.setItem("userRole", data.role); // 사용자 역할 저장

      // 이전 페이지 정보가 있다면 해당 페이지로 이동, 없으면 홈으로 이동
      const from = location.state?.from || "/";
      navigate(from);
      window.location.reload(); // 페이지 새로 고침
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      setServerError("서버와 통신 중 문제가 발생했습니다.");
    }
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>로그인</Title>
        <CommonInput
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <PasswordInput
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

        {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

        <Button type="submit">로그인</Button>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default LoginPage;
