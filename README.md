# ✨ Airbnb 클론 프론트엔드 (React + TypeScript)
Airbnb의 핵심 기능을 클론하여 구현한 웹 애플리케이션입니다. React + TypeScript 기반의 CSR 방식으로 개발되었으며, 숙소 조회, 등록, 댓글, 좋아요 등 핵심 기능을 포함하고 있습니다.

# 📌 프로젝트 개요
프로젝트명: Airbnb Clone Frontend

기간: 2025.07.04 ~ 2025.07.20

목표: Airbnb의 주요 기능을 클론하여 사용자 인증, 숙소 등록/조회, 댓글, 좋아요 등의 기능을 구현

백엔드 연동: REST API 기반(Spring Boot)

# ⚙️ 사용 기술 스택
분야 기술
프레임워크 React (CRA or Vite)
언어 TypeScript
상태 관리 useState, useContext (필요시 Redux or React Query 도입 가능)
라우팅 React Router DOM
HTTP 통신 Axios
스타일링 CSS Modules, Tailwind CSS or Styled-components
기타 도구 Prettier, ESLint, GitHub

# 📁 폴더 구조 (예시)
📦src
┣ 📂api // Axios 요청 정의
┣ 📂components // 공통 컴포넌트
┣ 📂pages // 페이지 컴포넌트 (라우팅 단위)
┣ 📂hooks // 커스텀 훅
┣ 📂types // 전역 타입 정의
┣ 📂utils // 유틸리티 함수
┣ 📂contexts // 전역 상태 관리
┣ 📂assets // 이미지, 아이콘 등 정적 파일
┗ 📜main.tsx // 앱 진입점

# 🚀 실행 방법
1. 이 저장소를 클론합니다.
git clone https://github.com/yourname/airbnb-clone-frontend.git
cd airbnb-clone-frontend

2. 의존성 설치
npm install

3. 개발 서버 실행
npm run dev

4. 브라우저에서 확인
CRA 기준 http://localhost:3000

# 🧩 주요 기능
기능 설명
회원가입/로그인 일반 회원, 호스트 회원 구분
숙소 목록 숙소 카드 형태로 전체 숙소 표시
숙소 상세 페이지 사진, 설명, 리뷰, 좋아요 표시
숙소 등록 호스트만 등록 가능 (사진 업로드 포함)
댓글 기능 일반 회원만 등록/삭제 가능
좋아요 중복 불가, 한 번만 가능. 취소 가능
반응형 UI 모바일 및 데스크탑 대응

# 🔐 백엔드 API 연동
API는 Spring Boot로 구성된 백엔드와 연동됩니다.

인증은 JWT 또는 세션 방식으로 구현 예정입니다.

.env 파일에 백엔드 API URL을 설정하세요:

VITE_API_BASE_URL=http://localhost:8080/api

# 🛠️ 향후 개선 계획
숙소 검색 및 필터 기능 추가

예약 기능 구현

Google Maps API 연동

전역 상태관리 (Redux, React Query 등) 도입

테스트 코드 (Jest, React Testing Library)

# 📄 라이선스
본 프로젝트는 학습용 클론 코딩 프로젝트이며, 상업적 목적이 아닙니다.
© 2025 YourName
