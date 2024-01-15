import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "./_utility.js";
import { RowDataPacket } from "mysql2";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { tag = null, dev = null } = request.query;

  if (!tag) {
    response.status(400).json({ error: "No tag provided" });
    return;
  }

  if (dev) {
    response.status(200).json({
      res: {
        id: "???",
        tag: "?????",
        name: "??????",
        rarity: "??????",
        img: "?",
        wave: "Wave ?",
      },
    });
    return;
  }

  const sql = `
    SELECT ID as id, Tag as tag, Name as name, Rarity as rarity, Image as img, Wave as wave
    FROM card_data WHERE Tag = '${tag}'
  `;

  const leaderboardSql = `
    SELECT ROW_NUMBER() OVER (ORDER BY COUNT(*) desc) as 'rank', cards.discord_id, users.discord_tag, COUNT(*) as count FROM cards 
    LEFT JOIN users ON cards.discord_id = users.discord_id WHERE card_tag = '${tag}'
    GROUP BY cards.discord_id, users.discord_tag ORDER BY COUNT(*) desc;
  `;

  const res = await query([sql, leaderboardSql]);
  const data = (res as RowDataPacket[][])[0][0];
  const leaderboard = (res as RowDataPacket[][])[1];

  response.status(200).json({ data, leaderboard });
}
