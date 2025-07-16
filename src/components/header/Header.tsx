import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const MenuItem = styled.div`
  display: block;
  padding: 0.8rem 1rem;
  text-decoration: none;
  color: #222;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const MenuButton = styled.div`
  display: block;
  padding: 0.8rem 1rem;
  color: #222;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // userRole 상태 추가
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트 마운트 시 localStorage에서 토큰 및 역할 확인
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole"); // userRole 가져오기
    setIsLoggedIn(!!token);
    setUserRole(role); // userRole 설정
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // React 로그아웃 예시
  const handleLogout = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        console.warn("email이 없습니다.");
        return;
      }

      const response = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 토큰 추가
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      // 클라이언트 토큰 제거
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
      localStorage.removeItem("userRole"); // userRole 제거

      setIsLoggedIn(false); // 로그아웃 상태 반영
      setUserRole(null); // userRole 초기화
      setIsMenuOpen(false); // 메뉴 닫기
      navigate("/");
    } catch (error) {
      if (error instanceof TypeError) {
        console.error(
          "네트워크 오류: 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.",
          error
        );
      } else {
        console.error("서버 로그아웃 실패:", error);
      }
    }
  };

  return (
    <HeaderContainer>
      <Logo to="/">airbnb</Logo>
      <UserMenu ref={menuRef}>
        {!isLoggedIn && <HostLink to="/login">로그인</HostLink>}
        <ProfileIcon onClick={toggleMenu}>☰</ProfileIcon>
        {isMenuOpen && (
          <MenuDropdown>
            {isLoggedIn ? (
              <>
                {userRole === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/admin/host-requests");
                    }}
                  >
                    호스트 신청 관리
                  </MenuItem>
                )}
                {userRole === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/admin/accommodations");
                    }}
                  >
                    숙소 등록 관리
                  </MenuItem>
                )}
                {userRole === "USER" && (
                  <MenuItem
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/host");
                    }}
                  >
                    호스트 되기
                  </MenuItem>
                )}
                {userRole === "HOST" && (
                  <MenuItem
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/register-property");
                    }}
                  >
                    숙소 등록
                  </MenuItem>
                )}
                {userRole === "HOST" && (
                  <MenuItem
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/my-accommodations");
                    }}
                  >
                    내 숙소 관리
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/settings");
                  }}
                >
                  설정
                </MenuItem>
                {/* 로그아웃은 일반 링크 대신 클릭 이벤트로 처리 */}
                <MenuButton onClick={handleLogout}>로그아웃</MenuButton>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/signup");
                  }}
                >
                  회원가입
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/login");
                  }}
                >
                  로그인
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/host");
                  }}
                >
                  호스트 되기
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/help");
                  }}
                >
                  도움말
                </MenuItem>
              </>
            )}
          </MenuDropdown>
        )}
      </UserMenu>
    </HeaderContainer>
  );
};

export default Header;
