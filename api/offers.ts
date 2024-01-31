import type { VercelRequest, VercelResponse } from "@vercel/node";

import { query } from "./_utility.js";
import { offersSql } from "./_sql.js";

export default async function handler(
  _: VercelRequest,
  response: VercelResponse
) {
  response.setHeader("Cache-Control", "public, s-maxage=100");

  const offers = await query(offersSql());

  response.status(200).json({ offers });
}
