import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { query } from "./_utility.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { id = null } = request.query;

  if (!id) {
    response.status(400).json({ error: "No id provided" });
    return;
  }

  const lbSql = `
    SELECT ROW_NUMBER() OVER ( ORDER BY total.count desc, discord_tag) AS 'rank', users.discord_id, discord_tag, total.count as 'totalCount' from users
    LEFT JOIN (SELECT discord_id, count(DISTINCT discord_id, card_tag) as count FROM cards GROUP by discord_id) as total 
    ON total.discord_id = users.discord_id
    ORDER BY total.count desc, discord_tag;
  `;

  const globalCardCountSql = `
    SELECT COUNT(*) as count FROM card_data;
  `;

  const getUserPromise = axios.get(`https://discord.com/api/v9/users/${id}`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
  });

  const [res, leaderboard, globalCardCount] = await Promise.all([
    getUserPromise,
    query(lbSql),
    query(globalCardCountSql),
  ]);

  response.status(200).json({ user: res.data, leaderboard, globalCardCount });
}
