import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "./_utility.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const result = await query("SELECT Tag FROM card_data");

  const { name = "World" } = request.query;
  response.status(200).json({ test: `Hello ${name}!`, result });
}
