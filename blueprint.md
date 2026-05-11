# Project Blueprint: KFLU Builder Union (경기남부본부)

## Overview
이 프로젝트는 **한국노총 전국공공산업노동조합 건설산업분과 경기남부본부**의 공식 웹사이트입니다. 조합원들에게 활동 소식을 전하고, 상담 신청 및 커뮤니티 공간(게시판)을 제공하는 것을 목적으로 합니다.

## Current State & Features (V3.0)
- **Image Update & Optimization:**
    - `성남시장후보지지단체사진.jpg` 최신화 및 적용 완료.
    - 기존 레이아웃 및 기능을 유지하며 활동 사진 업데이트 반영.
- **Firebase & GitHub Actions Integration:**
    - GitHub Actions 워크플로우를 통한 RSS 자동 업데이트 보안 강화.
    - `FIREBASE_SERVICE_ACCOUNT` 시크릿을 이용한 Firestore 접근 설정.
    - `generate-rss.js` 에러 핸들링 및 초기화 로직 개선.
- **Code Optimization & Cleanup:**
    - 불필요한 코드 제거 및 웹 컴포넌트 구조 최적화.
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
