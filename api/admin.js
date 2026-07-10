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

<!DOCTYPE html>

<html>

<head>

<title>
LINE Router Dashboard
</title>


<style>

body{
font-family:Arial;
padding:40px;
background:#f7f7f7;
}


.card{

background:white;
padding:25px;
border-radius:12px;
width:300px;
box-shadow:0 2px 10px #ddd;

}


.number{

font-size:48px;
font-weight:bold;

}

</style>


</head>


<body>


<h1>
LINE Router Dashboard
</h1>


<div class="card">

<p>
總點擊數
</p>


<div class="number">
${total}
</div>


</div>


</body>


</html>

`);

  } catch(error) {


    res.status(500).send(
      "Dashboard Error"
    );


  }

}
