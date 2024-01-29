import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "./_utility.js";
import { RowDataPacket } from "mysql2";
import { cardLeaderboard, cardSql } from "./_sql.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { tag = null } = request.query;

  if (!tag) {
    response.status(400).json({ error: "No tag provided" });
    return;
  }

  const res = await query([
    cardSql(tag as string),
    cardLeaderboard(tag as string),
  ]);
  const data = (res as RowDataPacket[][])[0][0];
  const leaderboard = (res as RowDataPacket[][])[1];

  response.status(200).json({ data, leaderboard });
}
