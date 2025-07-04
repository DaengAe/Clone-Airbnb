import styled from 'styled-components';

const CommonInput = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.$error ? '#ff385c' : '#ddd'};
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #ff385c;
    box-shadow: 0 0 0 1px #ff385c;
  }
`;

export default CommonInput;
