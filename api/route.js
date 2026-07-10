export default function handler(req, res) {

  const lines = [
    "你的LINE_A連結",
    "你的LINE_B連結"
  ];

  const key = "line_counter";

  let count = Number(req.cookies[key] || 0);

  const target = lines[count % lines.length];

  count++;

  res.setHeader(
    "Set-Cookie",
    `${key}=${count}; Path=/; Max-Age=31536000`
  );

  res.writeHead(302, {
    Location: target
  });

  res.end();
}
