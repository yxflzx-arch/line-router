import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

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
