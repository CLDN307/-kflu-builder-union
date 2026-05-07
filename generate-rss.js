const fs = require("fs");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

const SITE_URL = "https://kflu-builder-union.pages.dev";

async function generateRSS() {
  const snapshot = await db.collection("posts")
    .orderBy("createdAt", "desc")
    .limit(20)
    .get();

  let items = "";

  snapshot.forEach(doc => {
    const data = doc.data();

    const date = data.createdAt?._seconds
      ? new Date(data.createdAt._seconds * 1000)
      : new Date();

    // Naver compliant format with guid and unique link
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
  console.log("RSS 생성 완료");
}

generateRSS();