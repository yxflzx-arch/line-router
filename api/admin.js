export default async function handler(req, res) {

  try {

    const response = await fetch(
      `${process.env.KV_REST_API_URL}/get/line_count`,
      {
        headers:{
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
    body{
      font-family:Arial;
      padding:40px;
    }

    .card{
      border:1px solid #ddd;
      padding:30px;
      width:300px;
      border-radius:10px;
    }

    .num{
      font-size:40px;
    }
    </style>

    </head>

    <body>

    <h1>
    LINE Router Dashboard
    </h1>


    <div class="card">

    <div>
    總點擊數
    </div>


    <div class="num">
    ${total}
    </div>


    </div>


    </body>
    </html>
    `);


  } catch(error){

    res.status(500).send(error.message);

  }

}
