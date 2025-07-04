import React, { useState } from "react";
import styled from "styled-components";
import PasswordInput from "../components/input_form/PasswordInput";
import CommonInput from "../components/input_form/CommonInput";

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

  const validateForm = () => {
    let isValid = true;

    // 이름 유효성 검사
    if (name.trim() === "") {
      setNameError("이름을 입력해주세요.");
      isValid = false;
    } else {
      setNameError("");
    }

    // 이메일 유효성 검사
    if (email.trim() === "") {
      setEmailError("이메일을 입력해주세요.");
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // 비밀번호 유효성 검사 (영어, 숫자, 특수문자 조합, 8자 이상)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError("비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // 비밀번호 확인 유효성 검사
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("비밀번호 확인을 입력해주세요.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("회원가입 성공!", { name, email, password });
      // 여기에 실제 회원가입 로직을 추가합니다.
    } else {
      console.log("회원가입 실패: 유효성 검사 오류");
    }
  };

  return (
    <SignUpPageContainer>
      <SignUpForm onSubmit={handleSubmit}>
        <Title>회원가입</Title>
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
