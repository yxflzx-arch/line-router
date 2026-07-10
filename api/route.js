import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});


export default async function handler(req,res){

  const lines=[
    "https://lin.ee/wglznlp",
    "https://lin.ee/O04FjGr"
  ];


  const index=Math.floor(
    Math.random()*lines.length
  );


  const now=new Date().toLocaleString(
    "zh-TW",
    {
      timeZone:"Asia/Taipei"
    }
  );


  // 總數
  await redis.incr(
    "line_total_count"
  );


  // 今日
  const today =
    new Date()
    .toISOString()
    .slice(0,10);


  await redis.incr(
    `today_${today}`
  );


  // 分流統計

  if(index===0){

    await redis.incr(
      "line_a_count"
    );

  }else{

    await redis.incr(
      "line_b_count"
    );

  }


  // 紀錄最近點擊

  await redis.lpush(
    "click_logs",
    JSON.stringify({
      line:index===0?"A":"B",
      time:now
    })
  );


  await redis.ltrim(
    "click_logs",
    0,
    9
  );


  res.writeHead(302,{
    Location:lines[index]
  });


  res.end();

}
