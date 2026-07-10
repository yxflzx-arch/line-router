import { Redis } from "@upstash/redis";


const redis=new Redis({

url:process.env.KV_REST_API_URL,

token:process.env.KV_REST_API_TOKEN,

});


export default async function handler(req,res){


const total =
await redis.get(
"line_total_count"
)||0;


const lineA =
await redis.get(
"line_a_count"
)||0;


const lineB =
await redis.get(
"line_b_count"
)||0;



const today =
new Date()
.toISOString()
.slice(0,10);


const todayCount =
await redis.get(
`today_${today}`
)||0;



const logs =
await redis.lrange(
"click_logs",
0,
9
);



const history =
logs.map(x=>{

const d=JSON.parse(x);

return `
<li>
LINE ${d.line}
｜
${d.time}
</li>
`;

}).join("");



res.setHeader(
"Content-Type",
"text/html;charset=utf-8"
);



res.end(`

<html>

<head>

<title>
LINE Router Dashboard
</title>


<style>

body{
font-family:Arial;
padding:40px;
}


.card{

border:1px solid #ddd;
border-radius:12px;
padding:25px;
width:350px;
margin-bottom:20px;

}


.num{

font-size:40px;

}


li{

margin:10px 0;

}

</style>


</head>


<body>


<h1>
LINE Router Dashboard
</h1>



<div class="card">
總點擊數
<div class="num">
${total}
</div>
</div>



<div class="card">
今日點擊
<div class="num">
${todayCount}
</div>
</div>




<div class="card">
LINE A

<div class="num">
${lineA}
</div>

</div>



<div class="card">
LINE B

<div class="num">
${lineB}
</div>

</div>



<h2>
最近點擊
</h2>


<ul>

${history}

</ul>



</body>

</html>

`);


}
