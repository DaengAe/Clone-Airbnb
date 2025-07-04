# ✨ Airbnb 클론 프론트엔드 (React + TypeScript)

Airbnb의 핵심 기능을 클론하여 구현한 웹 애플리케이션입니다.  
React + TypeScript 기반의 CSR 방식으로 개발되었으며, 숙소 조회, 등록, 댓글, 좋아요 등 주요 기능을 포함하고 있습니다.

---

## 📌 프로젝트 개요

- **프로젝트명**: Airbnb Clone Frontend  
- **개발 기간**: 2025.07.04 ~ 2025.07.20  
- **개발 목표**:
  - Airbnb의 핵심 기능을 클론하여 UI 및 인터랙션 구현
  - REST API 기반의 백엔드와 비동기 통신 연동
  - 사용자 인증, 숙소 등록, 댓글, 좋아요 기능 구현

---

## ⚙️ 사용 기술 스택

| 분야       | 기술                                 |
|------------|--------------------------------------|
| 프레임워크 | React (Vite or CRA)                  |
| 언어       | TypeScript                           |
| 라우팅     | React Router DOM                     |
| HTTP 통신  | Axios                                 |
| 상태관리   | useState, useContext *(필요시 Redux)* |
| 스타일링   | CSS Modules, Tailwind CSS *(선택)*    |
| 기타 도구  | ESLint, Prettier, GitHub             |

---

## 📁 폴더 구조 (예시)
```bash
📦src
 ┣ 📂api               // Axios 요청 정의
 ┣ 📂components        // 공통 컴포넌트
 ┣ 📂pages             // 페이지 컴포넌트 (라우팅 단위)
 ┣ 📂hooks             // 커스텀 훅
 ┣ 📂types             // 전역 타입 정의
 ┣ 📂utils             // 유틸리티 함수
 ┣ 📂contexts          // 전역 상태 관리
 ┣ 📂assets            // 이미지, 아이콘 등 정적 파일
 ┗ 📜main.tsx          // 앱 진입점
```

---

## 🚀 실행 방법

1. 이 저장소를 클론합니다.
```bash
git clone https://github.com/daengae/Clone-Airbnb.git
cd Clone-Airbnb
```

2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

3. 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

4. 브라우저에서 확인
http://localhost:3000 (CRA 기준)

---

## 🧩 주요 기능
✅ 회원가입/로그인 (일반 회원 / 호스트 구분)

✅ 숙소 목록 조회 (카드형 UI)

✅ 숙소 상세 페이지 (이미지, 설명, 리뷰 등)

✅ 숙소 등록 (호스트만 가능, 이미지 업로드 포함)

✅ 댓글 기능 (일반 회원 전용, 삭제 가능)

✅ 좋아요 기능 (한 번만 가능, 토글로 취소 가능)

✅ 반응형 디자인 (모바일 대응)

---

## 🔐 백엔드 연동
Spring Boot 기반 REST API와 연동됩니다.

JWT 또는 세션 기반 인증 예정입니다.

.env 파일에 아래와 같이 API 주소를 설정합니다:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 🛠️ 향후 개선 계획
숙소 예약 및 달력 기능

숙소 검색 및 필터링 기능

Google Maps API 연동

React Query 도입 및 상태관리 개선

Jest & React Testing Library 기반 테스트 코드 작성

---

## 📸 실행 화면 (선택적으로 추가)
실행 화면은 개발이 완료된 후 아래와 같은 형식으로 삽입할 수 있습니다.

---

## 🙋‍♀️ 만든 사람
| 이름       | 역할                                 |
|------------|--------------------------------------|
| DaengAe | 프론트엔드 개발, UI/UX, 문서 작성           |

---

## 📄 라이선스
본 프로젝트는 학습 및 포트폴리오 용도로만 사용됩니다.
상업적 사용은 금지되어 있습니다.
© 2025 YourName
