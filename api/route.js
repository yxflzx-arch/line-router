import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const lines = [
      "https://lin.ee/wglznlp",
      "https://lin.ee/O04FjGr"
    ];

    // Redis 計數
    const count = await redis.incr("line_count");

    // 輪流分流
    const target = lines[(count - 1) % lines.length];

    res.statusCode = 302;
    res.setHeader("Location", target);
    res.end();

  } catch (error) {
    console.error(error);

    // Redis 掛掉時，至少還能跳轉
    res.statusCode = 302;
    res.setHeader(
      "Location",
      "https://lin.ee/wglznlp"
    );
    res.end();
  }
}
