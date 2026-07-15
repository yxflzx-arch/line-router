export default async function handler(req, res) {

  const lines = [
    "https://lin.ee/WM445gr",
    "https://lin.ee/qFE08su"
  ];

  try {

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

    console.log(data);


    const count = data.result || 1;


    const target =
      lines[(count - 1) % 2];


    res.writeHead(302, {
      Location: target,
      "Cache-Control":
      "no-store"
    });

    res.end();


  } catch(error) {

    console.error(error);

    res.writeHead(302,{
      Location: lines[0]
    });

    res.end();

  }

}
