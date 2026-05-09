const fs = require("fs");
const admin = require("firebase-admin");

// 환경 변수 확인 (디버깅용, 실제 키 값은 노출 안됨)
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.warn("경고: GOOGLE_APPLICATION_CREDENTIALS 환경 변수가 설정되지 않았습니다.");
}

try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
} catch (error) {
  console.error("Firebase 초기화 실패:", error.message);
  process.exit(1);
}

const db = admin.firestore();

const SITE_URL = "https://kflu-builder-union.pages.dev";

async function generateRSS() {
  try {
    console.log("Firestore에서 게시글 가져오는 중...");
    const snapshot = await db.collection("posts")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();

    if (snapshot.empty) {
      console.log("게시글이 없습니다.");
    }

    let items = "";

    snapshot.forEach(doc => {
      const data = doc.data();

      const date = data.createdAt?._seconds
        ? new Date(data.createdAt._seconds * 1000)
        : new Date();

      const itemLink = `${SITE_URL}/board.html?id=${doc.id}`;
      items += `
    <item>
      <title><![CDATA[${data.title}]]></title>
      <link>${itemLink}</link>
      <description><![CDATA[${data.content}]]></description>
      <guid isPermaLink="true">${itemLink}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
    </item>`;
    });

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>경기남부본부 활동 게시판</title>
<link>${SITE_URL}</link>
<description>최신 게시글 자동 업데이트</description>
<language>ko</language>
<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />

${items}

</channel>
</rss>`;

    fs.writeFileSync("rss.xml", rss);
    console.log("RSS 생성 완료: rss.xml");
  } catch (error) {
    console.error("RSS 생성 중 오류 발생:", error);
    process.exit(1);
  }
}

generateRSS();