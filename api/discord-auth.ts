import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  response: VercelResponse
) {
  const params = new URLSearchParams();
  params.set("client_id", process?.env?.DISCORD_CLIENT_ID || "");
  params.set("response_type", "token");
  params.set("redirect_uri", req.headers.referer + "auth/discord");
  params.set("scope", "identify");
  const baseUrl = `https://discord.com/api/oauth2/authorize?`;
  const url = baseUrl + params.toString();

  return response.status(200).json({ url });
}
