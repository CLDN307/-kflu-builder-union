# Project Blueprint: KFLU Builder Union (경기남부본부)

## Overview
이 프로젝트는 **한국노총 전국공공산업노동조합 건설산업분과 경기남부본부**의 공식 웹사이트입니다. 조합원들에게 활동 소식을 전하고, 상담 신청 및 커뮤니티 공간(게시판)을 제공하는 것을 목적으로 합니다.

## Current State & Features (V2.7)
- **Web Components Architecture:**
    - `<kflu-navbar>`: 인증 상태 감지, 스크롤 효과, 공통 네비게이션 관리.
    - `<kflu-footer>`: 전역 푸터 일관성 유지.
    - `<kflu-auth-modals>`: 공통 로그인/회원가입 모달 컴포넌트.
- **Modern Backend Integration (Firebase):**
    - **Authentication:** Firebase Auth 기반 회원 시스템.
    - **Database (Firestore):** 동적 게시판 구현.
        - **공지사항 기능:** 관리자 페이지에서 공지사항 작성 가능.
        - **접근 권한 강화 (V2.7):** 로그인 여부와 관계없이 **모든 방문자가 게시글 목록 및 상세 내용을 읽을 수 있도록 수정**. (단, 글쓰기/수정/삭제는 기존처럼 회원/관리자 권한 필요)
    - **Firestore Rules:** `posts` 컬렉션에 대해 `allow read: if true;` 적용 완료.
- **Modern CSS (Baseline):**
    - `style.css`: CSS Variables, Cascade Layers 활용.
- **Deployment:**
    - Git을 통한 버전 관리 및 배포 준비 완료.

## Technology Stack (Completed)
- **Frontend:** HTML5, Tailwind CSS, JavaScript (ES Modules), Web Components.
- **Backend:** Firebase Auth, Firestore.

## User Instructions
- **Board Access:** 이제 로그인하지 않아도 모든 게시글을 읽을 수 있습니다. 글을 쓰려면 로그인이 필요합니다.
- **Admin Notice:** 관리자 계정(`admin@admin.com`)으로 로그인 후 관리자 페이지에서 "공지사항 작성" 버튼을 통해 등록할 수 있습니다.

## Future Recommendations
1.  **이미지 업로드:** 게시글 작성 시 사진 첨부 기능 (Firebase Storage).
2.  **상담 관리:** Firestore 연동을 통한 상담 내역 통합 관리.
