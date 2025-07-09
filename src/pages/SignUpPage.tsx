import React, { useState } from "react";
import styled from "styled-components";
import PasswordInput from "../components/input_form/PasswordInput";
import CommonInput from "../components/input_form/CommonInput";
import validationMessages from "../constants/validationMessages";

const SignUpPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
`;

const SignUpForm = styled.form`
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

const ErrorMessage = styled.p`
  color: #ff385c;
  font-size: 0.8rem;
  margin-top: -0.8rem;
  margin-bottom: 1rem;
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

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (name.trim() === "") {
      setNameError(validationMessages.signup.name.blank);
      isValid = false;
    } else {
      setNameError("");
    }

    if (email.trim() === "") {
      setEmailError(validationMessages.signup.email.blank);
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError(validationMessages.signup.email.invalid);
      isValid = false;
    } else {
      setEmailError("");
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (password.length < 8) {
      setPasswordError(validationMessages.signup.password.blank);
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(validationMessages.signup.password.invalid);
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword.trim() === "") {
      setConfirmPasswordError(validationMessages.signup.confirmPassword.blank);
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(
        validationMessages.signup.confirmPassword.mismatch
      );
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (response.ok) {
        alert("회원가입 성공!");
        // TODO: 회원가입 성공 후 페이지 이동 등 처리
      } else {
        const errorData = await response.json();

        // 서버에서 내려준 필드별 에러 메시지를 각 상태에 세팅
        setNameError(errorData.name || "");
        setEmailError(errorData.email || "");
        setPasswordError(errorData.password || "");
        setConfirmPasswordError(errorData.confirmPassword || "");

        // 필드 에러 없고, 일반 메시지 있을 때
        if (
          !errorData.name &&
          !errorData.email &&
          !errorData.password &&
          !errorData.confirmPassword &&
          errorData.message
        ) {
          setGeneralError(errorData.message);
        }
      }
    } catch (error) {
      setGeneralError("서버와 통신 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <SignUpPageContainer>
      <SignUpForm onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        {generalError && <ErrorMessage>{generalError}</ErrorMessage>}

        <CommonInput
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

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

        <PasswordInput
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPasswordError && (
          <ErrorMessage>{confirmPasswordError}</ErrorMessage>
        )}

        <Button type="submit">회원가입</Button>
      </SignUpForm>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
