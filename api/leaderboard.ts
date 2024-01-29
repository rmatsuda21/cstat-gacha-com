import type { VercelRequest, VercelResponse } from "@vercel/node";

import { query } from "./_utility.js";
import { leaderboardSql } from "./_sql.js";

export default async function handler(
  _: VercelRequest,
  response: VercelResponse
) {
  response.setHeader("Cache-Control", "public, s-maxage=100");

  const leaderboard = await query(leaderboardSql());

  response.status(200).json({ leaderboard });
}
