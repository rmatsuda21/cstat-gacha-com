import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { name = "World" } = request.query;
  response.status(200).json({ test: `Hello ${name}!` });
}
