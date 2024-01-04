import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const mysql = await import("serverless-mysql");
  const db = mysql.default({
    config: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
  });

  await db.connect();
  const results = await db.query("SELECT * FROM cards");

  const { name = "World" } = request.query;
  response.status(200).json({ test: `Hello ${name}!`, results });
}
