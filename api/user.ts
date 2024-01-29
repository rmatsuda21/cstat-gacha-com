import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

import { query } from "./_utility.js";
import { globalCardCountSql, leaderboardSql } from "./_sql.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { id = null } = request.query;

  if (!id) {
    response.status(400).json({ error: "No id provided" });
    return;
  }

  const getUserPromise = axios.get(`https://discord.com/api/v9/users/${id}`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
  });

  try {
    const [res, leaderboard, globalCardCount] = await Promise.all([
      getUserPromise,
      query(leaderboardSql()),
      query(globalCardCountSql()),
    ]);

    return response
      .status(200)
      .json({ user: res.data, leaderboard, globalCardCount });
  } catch (e) {
    console.error(e);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
