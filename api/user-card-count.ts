import type { VercelRequest, VercelResponse } from "@vercel/node";

import { query } from "./_utility.js";
import {
  globalCardCountSql,
  globalRarityCardCountSql,
  userCardCountSql,
} from "./_sql.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { id = null } = request.query;

  if (!id) {
    response.status(400).json({ error: "No id provided" });
    return;
  }

  if (typeof id !== "string" || !/^\d{17,18}$/.test(id)) {
    response.status(400).json({ error: "Invalid id provided" });
    return;
  }

  const [cardCount, rarityCardCount, globalCardCount] = await Promise.all([
    query(userCardCountSql(id as string)),
    query(globalRarityCardCountSql()),
    query(globalCardCountSql()),
  ]);

  response.status(200).json({ cardCount, rarityCardCount, globalCardCount });
}
