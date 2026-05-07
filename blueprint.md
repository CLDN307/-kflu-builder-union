# Project Blueprint: KFLU Builder Union (경기남부본부)

## Overview
이 프로젝트는 **한국노총 전국공공산업노동조합 건설산업분과 경기남부본부**의 공식 웹사이트입니다. 조합원들에게 활동 소식을 전하고, 상담 신청 및 커뮤니티 공간(게시판)을 제공하는 것을 목적으로 합니다.

## Current State & Features (V2.8)
- **Code Optimization & Cleanup:**
    - 미사용 CSS 클래스 제거 및 공통 폰트 설정 통합 (`style.css`).
    - JavaScript 미사용 임포트(`where`) 및 디버그 로그 제거.
    - RSS 생성 스크립트 파일명 정리 (`generate-rss.js`) 및 워크플로우 동기화.
- **Web Components Architecture:**
...
## Technology Stack (Completed)
- **Frontend:** HTML5, Tailwind CSS, JavaScript (ES Modules), Web Components.
- **Backend:** Firebase Auth, Firestore, Hosting.
- **Automation:** GitHub Actions (RSS Auto Update).

## User Instructions
- **Board Access:** 이제 로그인하지 않아도 모든 게시글을 읽을 수 있습니다. 글을 쓰려면 로그인이 필요합니다.
- **Admin Notice:** 관리자 계정(`admin@admin.com`)으로 로그인 후 관리자 페이지에서 "공지사항 작성" 버튼을 통해 등록할 수 있습니다.

## Future Recommendations
1.  **이미지 업로드:** 게시글 작성 시 사진 첨부 기능 (Firebase Storage).
2.  **상담 관리:** Firestore 연동을 통한 상담 내역 통합 관리.
