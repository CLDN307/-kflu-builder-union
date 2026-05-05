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

    items += `
    <item>
      <title><![CDATA[${data.title}]]></title>
      <link>${SITE_URL}/board.html?id=${doc.id}</link>
      <description><![CDATA[${data.content}]]></description>
      <pubDate>${date.toUTCString()}</pubDate>
    </item>`;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>경기남부본부 활동 게시판</title>
<link>${SITE_URL}</link>
<description>최신 게시글 자동 업데이트</description>

${items}

</channel>
</rss>`;

  fs.writeFileSync("rss.xml", rss);
  console.log("RSS 생성 완료");
}

generateRSS();