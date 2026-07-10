export default async function handler(req, res) {

  const lines = [
    "https://lin.ee/wglznlp",
    "https://lin.ee/O04FjGr"
  ];

  try {

    // Redis 計數 +1
    const response = await fetch(
      `${process.env.KV_REST_API_URL}/incr/line_count`,
      {
        headers: {
          Authorization:
          `Bearer ${process.env.KV_REST_API_TOKEN}`
        }
      }
    );


    const data = await response.json();


    const count = data.result || 1;


    // 循環分流
    const target =
      lines[(count - 1) % lines.length];


    // 防止瀏覽器快取
    res.writeHead(302, {
      Location: target,
      "Cache-Control":
      "no-store, no-cache, must-revalidate"
    });


    res.end();


  } catch (error) {

    console.error(error);


    // Redis 異常時備援
    res.writeHead(302, {
      Location: lines[0],
      "Cache-Control":
      "no-store"
    });


    res.end();

  }

}
