export default function handler(req, res) {

  const lines = [
    "https://lin.ee/wglznlp",
    "https://lin.ee/O04FjGr"
  ];

  const random = Math.floor(Math.random() * 2);

  const target = lines[random];

  res.writeHead(302, {
    Location: target
  });

  res.end();

}
