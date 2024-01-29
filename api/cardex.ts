import type { VercelRequest, VercelResponse } from "@vercel/node";

import { query } from "./_utility.js";
import { cardexSql } from "./_sql.js";

export default async function handler(
  _: VercelRequest,
  response: VercelResponse
) {
  response.setHeader("Cache-Control", "public, s-maxage=100");

  const res = await query(cardexSql());

  response.status(200).json({ res });
}
