import type { VercelRequest, VercelResponse } from "@vercel/node";

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

  // Send 400 with status message
  if (typeof id !== "string" || !/^\d{17,18}$/.test(id)) {
    response.status(400).json({ error: "Invalid id provided" });
    return;
  }

  const userCardCountSql = `
    SELECT Rarity as rarity, COUNT(*) as count FROM card_data 
    INNER JOIN (
      SELECT discord_id, card_tag from cards 
      WHERE discord_id = ${id} 
      GROUP BY card_tag
    ) AS t 
    ON t.card_tag = card_data.Tag
    GROUP BY Rarity;
  `;

  const globalCardCountSql = `
    SELECT Rarity as rarity, COUNT(*) as count FROM card_data 
    GROUP BY Rarity;
  `;

  const [cardCount, globalCardCount] = await Promise.all([
    query(userCardCountSql),
    query(globalCardCountSql),
  ]);

  response.status(200).json({ cardCount, globalCardCount });
}
