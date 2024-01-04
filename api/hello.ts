import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as mysql from "mysql2/promise";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  });

  console.log(process.env.MYSQL_HOST);

  (await db).connect();
  const results = await (await db).query("SELECT * FROM cards");

  const { name = "World" } = request.query;
  response.status(200).json({ test: `Hello ${name}!`, results });
}
