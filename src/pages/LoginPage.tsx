import React, { useState } from "react";
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
        credentials: "include", // 세션 유지 필수
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setServerError(errorText || validationMessages.login.fail);
        return;
      }

      const data = await response.json();
      console.log("로그인 성공:", data);

      // 예: 메인 페이지 이동
      window.location.href = "/";
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
