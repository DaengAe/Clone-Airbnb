import React from "react";
import styled from "styled-components";
import PasswordInput from "../components/input_form/PasswordInput";
import CommonInput from "../components/input_form/CommonInput";

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
  return (
    <LoginPageContainer>
      <LoginForm>
        <Title>로그인</Title>
        <CommonInput type="email" placeholder="이메일" />
        <PasswordInput placeholder="비밀번호" />
        <Button type="submit">로그인</Button>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default LoginPage;
