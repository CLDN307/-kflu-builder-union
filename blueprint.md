# Project Blueprint: KFLU Builder Union (경기남부본부)

## Overview
이 프로젝트는 **한국노총 전국공공산업노동조합 건설산업분과 경기남부본부**의 공식 웹사이트입니다. 조합원들에게 활동 소식을 전하고, 상담 신청 및 커뮤니티 공간(게시판)을 제공하는 것을 목적으로 합니다.

## Current State & Features (V2)
- **Web Components Architecture:**
    - `<kflu-navbar>`: 인증 상태 감지, 스크롤 효과, 공통 네비게이션 관리.
    - `<kflu-footer>`: 전역 푸터 일관성 유지.
- **Modern Backend Integration (Firebase):**
    - **Authentication:** Firebase Auth 기반 회원 시스템 (회원가입, 로그인, 실시간 UI 업데이트).
    - **Database (Firestore):** 동적 게시판 구현. 
        - 글쓰기: 회원 전용.
        - 수정/삭제: 작성자 본인 또는 관리자만 가능 (보안 규칙 적용).
- **Modern CSS (Baseline):**
    - `style.css`: CSS Variables, Cascade Layers (`@layer`) 활용.
    - 대화형 요소 글로우 효과 및 카드 리프트 애니메이션 적용.
- **Admin System:**
    - 관리자 계정(`admin@admin.com`) 전용 통합 게시글 관리 도구.
- **Security:**
    - `firestore.rules`: 서버 측 권한 검증 완료.

## Technology Stack (Completed)
- **Frontend:** HTML5, Tailwind CSS, JavaScript (ES Modules), Web Components.
- **Backend:** Firebase Auth, Firestore.
- **Integration:** Formspree (Contact Form).

## User Instructions
- **Admin Account:** `admin@admin.com` 계정으로 로그인 시 `admin.html`에서 모든 게시글을 관리할 수 있습니다.
- **Environment:** 모든 브라우저(Baseline)를 지원하며, `main.js`의 `firebaseConfig`가 설정되어 있어 즉시 작동합니다.

## Future Recommendations
1.  **상담 신청 내역 DB 저장:** Formspree 외에 Firestore에도 상담 내역을 저장하여 관리자 페이지에서 한꺼번에 관리.
2.  **이미지 업로드:** 게시글 작성 시 사진을 첨부할 수 있도록 Firebase Storage 연동.
3.  **푸시 알림:** 새로운 공지사항 등록 시 조합원들에게 알림 전송 기능.
