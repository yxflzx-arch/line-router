import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {

  const lines = [
    "https://lin.ee/wglznlp",
    "https://lin.ee/O04FjGr"
  ];

  const count = await redis.incr("line_count");

  const target = lines[count % 2];

  res.writeHead(302, {
    Location: target
  });

  res.end();

}
