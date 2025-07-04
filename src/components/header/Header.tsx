import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  position: relative; /* For positioning the dropdown */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  background-color: #fff;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #ff385c;
  text-decoration: none;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const NavItem = styled.div`
  font-weight: 500;
  color: #222;
  cursor: pointer;
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative; /* For positioning the dropdown */
`;

const HostLink = styled(Link)`
  text-decoration: none;
  color: #222;
  font-weight: 500;
  width: 80px; /* Fixed width */
  height: 40px; /* Fixed height */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 22px;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const ProfileIcon = styled.div`
  border: 1px solid #ddd;
  border-radius: 22px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 100%; /* Position below the UserMenu */
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 200px;
  z-index: 1000;
  padding: 0.5rem 0;
`;

const MenuItem = styled(Link)`
  display: block;
  padding: 0.8rem 1rem;
  text-decoration: none;
  color: #222;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 가상의 로그인 상태
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer>
      <Logo to="/">airbnb</Logo>
      <UserMenu ref={menuRef}>
        <HostLink to="/login">로그인</HostLink>
        <ProfileIcon onClick={toggleMenu}>☰</ProfileIcon>
        {isMenuOpen && (
          <MenuDropdown>
            {isLoggedIn ? (
              <>
                <MenuItem to="/dashboard">대시보드</MenuItem>
                <MenuItem to="/messages">메시지</MenuItem>
                <MenuItem to="/settings">설정</MenuItem>
                <MenuItem to="/logout">로그아웃</MenuItem>
              </>
            ) : (
              <>
                <MenuItem to="/signup">회원가입</MenuItem>
                <MenuItem to="/login">로그인</MenuItem>
                <MenuItem to="/host">호스트 되기</MenuItem>
                <MenuItem to="/help">도움말</MenuItem>
              </>
            )}
          </MenuDropdown>
        )}
      </UserMenu>
    </HeaderContainer>
  );
};

export default Header;
