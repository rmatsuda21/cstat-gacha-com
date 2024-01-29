import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

import { query } from "./_utility.js";
import { collectionSql } from "./_sql.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  response.setHeader("Cache-Control", "public, s-maxage=100");
  const { id = null, sort = "" } = request.query;

  if (!id) {
    response.status(400).json({ error: "No ID provided" });
    return;
  }

  const getUserPromise = axios.get(`https://discord.com/api/v9/users/${id}`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
  });

  const [res, user] = await Promise.all([
    query(collectionSql(id as string, sort as string)),
    getUserPromise,
  ]);

  response.status(200).json({ res, user: user.data });
}
