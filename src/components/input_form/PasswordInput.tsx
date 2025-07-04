import React, { useState } from "react";
import styled from "styled-components";
import CommonInput from "./CommonInput";

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem; /* Added margin to the bottom of the wrapper */
`;

const StyledInput = styled(CommonInput)`
  padding-right: 40px; /* Adjust padding for icon */
  margin-bottom: 0; /* Remove margin from here as CommonInput has it */
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #717171;

  &:hover {
    color: #222;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  $error?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ $error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputWrapper>
      <StyledInput
        type={showPassword ? "text" : "password"}
        $error={$error}
        {...props}
      />
      <ToggleButton type="button" onClick={togglePasswordVisibility}>
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.981 12C5.412 10.0 8.012 7.5 12 7.5c3.988 0 6.588 2.5 8.019 4.5-.07.207-.07.431 0 .639C19.588 14.5 16.988 17 12 17c-3.988 0-6.588-2.5-8.019-4.5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
      </ToggleButton>
    </InputWrapper>
  );
};

export default PasswordInput;
