import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 40px;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem; /* Adjusted padding */
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1); /* Centered and wider shadow */
  transition: box-shadow 0.2s ease;
  max-width: 400px; /* Reduce width */
  margin: 1rem auto; /* Center the search bar */

  &:hover {
    background-color: rgb(235, 235, 235);
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  background: transparent;
  flex-grow: 1; /* Allow input to grow and fill available space */
`;

const SearchButton = styled.button`
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px; /* Adjusted width */
  height: 45px; /* Adjusted height */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SearchBar: React.FC = () => {
  return (
    <SearchBarContainer>
      <SearchInput placeholder="여행지 검색" />
      <SearchButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
