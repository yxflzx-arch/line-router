export default async function handler(req, res) {

  try {

    const response = await fetch(
      `${process.env.KV_REST_API_URL}/get/line_count`,
      {
        headers: {
          Authorization:
          `Bearer ${process.env.KV_REST_API_TOKEN}`
        }
      }
    );


    const data = await response.json();


    const total = data.result || 0;


    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );


    res.end(`
      <html>
      <head>
        <title>LINE Router Dashboard</title>

        <style>
          body {
            font-family: Arial;
            padding:40px;
          }

          .box {
            font-size:30px;
            margin:20px 0;
          }

          .card {
            padding:20px;
            border:1px solid #ddd;
            border-radius:10px;
            width:300px;
          }
        </style>

      </head>

      <body>

      <h1>
      LINE Router Dashboard
      </h1>


      <div class="card">

      <div class="box">
      總點擊：
      ${total}
      </div>


      <div>
      LINE A：
      ${Math.ceil(total/2)}
      </div>


      <div>
      LINE B：
      ${Math.floor(total/2)}
      </div>


      </div>


      </body>

      </html>
    `);


  } catch(error){

    res.status(500).send(
      "Dashboard Error"
    );

  }

}
