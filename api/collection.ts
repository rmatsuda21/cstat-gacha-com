import type { VercelRequest, VercelResponse } from "@vercel/node";

import { query } from "./_utility.js";

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

  let sql = `
    SELECT ID as id, Tag as tag, Name as name, Rarity as rarity, Image as img, Wave as wave, COUNT(*) as count FROM cards
    INNER JOIN card_data ON cards.card_tag = card_data.Tag
    WHERE discord_id = ${id}
    GROUP BY ID, Tag, Name, Rarity, Image, Wave
  `;

  const sortOptions = {
    "id-asc": `ORDER BY cast(id as unsigned) ASC;`,
    "id-desc": `ORDER BY cast(id as unsigned) DESC;`,
    "name-asc": `ORDER BY name ASC;`,
    "name-desc": `ORDER BY name DESC;`,
    "wave-asc": `ORDER BY wave ASC;`,
    "wave-desc": `ORDER BY wave DESC;`,
    "rarity-asc": `ORDER BY rarity ASC;`,
    "rarity-desc": `ORDER BY rarity DESC;`,
    "count-asc": `ORDER BY count ASC;`,
    "count-desc": `ORDER BY count DESC;`,
  };

  const sortKey = sort as keyof typeof sortOptions;
  sql += sortOptions[sortKey] || `ORDER BY count DESC;`;

  const res = await query(sql);

  response.status(200).json({ res });
}
