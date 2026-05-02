# Project Blueprint: KFLU Builder Union (경기남부본부)

## Overview
이 프로젝트는 **한국노총 전국공공산업노동조합 건설산업분과 경기남부본부**의 공식 웹사이트입니다. 조합원들에게 활동 소식을 전하고, 상담 신청 및 커뮤니티 공간(게시판)을 제공하는 것을 목적으로 합니다.

## Current State & Features (V2.1)
- **Web Components Architecture:**
    - `<kflu-navbar>`: 인증 상태 감지, 스크롤 효과, 공통 네비게이션 관리. **(업데이트: 로그인 시 실명+님 표시)**
    - `<kflu-footer>`: 전역 푸터 일관성 유지.
    - `<kflu-auth-modals>`: 공통 로그인/회원가입 모달 컴포넌트. **(신규: 중복 이메일 등 한국어 에러 처리 강화)**
- **Modern Backend Integration (Firebase):**
    - **Authentication:** Firebase Auth 기반 회원 시스템.
    - **Database (Firestore):** 동적 게시판 구현. 
        - 글쓰기: 회원 전용. **(업데이트: 작성자 실명 자동 기록)**
        - 수정/삭제: 작성자 본인 또는 관리자만 가능.
- **Modern CSS (Baseline):**
    - `style.css`: CSS Variables, Cascade Layers 활용.
- **Integration:** 
    - Formspree: 상담 신청 폼 (`xkoygdjq`). **(업데이트: 이메일 필드 추가 및 AJAX 연동 최적화)**

## Technology Stack (Completed)
- **Frontend:** HTML5, Tailwind CSS, JavaScript (ES Modules), Web Components.
- **Backend:** Firebase Auth, Firestore.

## User Instructions
- **Display Name:** 회원가입 시 입력한 이름이 네비게이션 바와 게시판 작성자 이름으로 자동 사용됩니다.
- **Error Handling:** 이미 가입된 이메일로 재가입 시 한국어 안내 메시지가 표시됩니다.

## Future Recommendations
1.  **이미지 업로드:** 게시글 작성 시 사진 첨부 기능 (Firebase Storage).
2.  **상담 관리:** Firestore 연동을 통한 상담 내역 통합 관리.
