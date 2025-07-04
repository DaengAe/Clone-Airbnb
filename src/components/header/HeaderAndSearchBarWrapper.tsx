import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import SearchBar from "./SearchBar";

const Line = styled.div`
  border-bottom: 2px solid #f0f0f0; /* Increased thickness */
  margin: 0; /* Changed to fill full width */
`;

const HeaderAndSearchBarWrapper: React.FC = () => {
  const location = useLocation();
  const showSearchBar = location.pathname === "/";

  return (
    <>
      <Header />
      {showSearchBar && <SearchBar />}
      <Line />
    </>
  );
};

export default HeaderAndSearchBarWrapper;
