export default function handler(req, res) {

  const target = "https://www.google.com";

  res.writeHead(302, {
    Location: target
  });

  res.end();

}
