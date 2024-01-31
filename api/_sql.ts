const cardLeaderboard = (tag: string) => `
    SELECT ROW_NUMBER() OVER (ORDER BY COUNT(*) desc) as 'rank', cards.discord_id, users.discord_tag, COUNT(*) as count FROM cards 
    LEFT JOIN users ON cards.discord_id = users.discord_id WHERE card_tag = '${tag}'
    GROUP BY cards.discord_id, users.discord_tag ORDER BY COUNT(*) desc;
  `;

const cardSql = (tag: string) => `
    SELECT ID as id, Tag as tag, Name as name, Rarity as rarity, Image as img, Wave as wave
    FROM card_data WHERE Tag = '${tag}'
  `;

const cardexSql = () => `
    SELECT
      cd.ID as id,
      IF(IFNULL(COUNT(c.card_tag), 0) = 0, '??', cd.Tag) as tag,
      IF(IFNULL(COUNT(c.card_tag), 0) = 0, '??', cd.Name) as name,
      IF(IFNULL(COUNT(c.card_tag), 0) = 0, '??', cd.Rarity) as rarity,
      IF(IFNULL(COUNT(c.card_tag), 0) = 0, 'null', cd.Image) as img,
      IF(IFNULL(COUNT(c.card_tag), 0) = 0, '??', cd.Wave) as wave,
      IFNULL(COUNT(c.card_tag), 0) as count
    FROM card_data cd
    LEFT JOIN cards c ON cd.Tag = c.card_tag
    GROUP BY cd.ID, cd.Tag, cd.Name, cd.Rarity, cd.Image, cd.Wave
    ORDER BY cast(cd.ID as unsigned) ASC
  `;

const collectionSql = (id: string, sort: string) => {
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
  return `
    SELECT ID as id, Tag as tag, Name as name, Rarity as rarity, Image as img, Wave as wave, COUNT(*) as count FROM cards
    INNER JOIN card_data ON cards.card_tag = card_data.Tag
    WHERE discord_id = ${id}
    GROUP BY ID, Tag, Name, Rarity, Image, Wave
    ${sortOptions[sortKey] || `ORDER BY count DESC;`}
  `;
};

const userCardCountSql = (id: string) => `
    SELECT Rarity as rarity, COUNT(*) as count FROM card_data 
    INNER JOIN (
      SELECT discord_id, card_tag from cards 
      WHERE discord_id = ${id} 
      GROUP BY card_tag
    ) AS t 
    ON t.card_tag = card_data.Tag
    GROUP BY Rarity;
  `;

const globalRarityCardCountSql = () => `
    SELECT Rarity as rarity, COUNT(*) as count FROM card_data 
    GROUP BY Rarity;
  `;

const globalCardCountSql = () => `
    SELECT COUNT(*) as count FROM card_data;
  `;

const leaderboardSql = () => `
    SELECT ROW_NUMBER() OVER ( ORDER BY total.count desc, discord_tag) AS 'rank', users.discord_id, discord_tag, total.count as 'totalCount' from users
    LEFT JOIN (SELECT discord_id, count(DISTINCT discord_id, card_tag) as count FROM cards GROUP by discord_id) as total 
    ON total.discord_id = users.discord_id
    ORDER BY total.count desc, discord_tag;
  `;

const offersSql = () => `
    SELECT t.offer_discord_id as id, users.discord_tag as tag, t.status, t.offer_quantity, t.accept_quantity, cd.Name as offer_name, cd1.Name as accept_name, cd.Image as offer_img, cd1.Image as accept_img
    FROM trades t 
    JOIN card_data cd on cd.Tag = t.offer_card 
    JOIN card_data cd1 on cd1.Tag = t.accept_card
    JOIN users on users.discord_id = t.offer_discord_id
    WHERE t.status = 'Active'
  `;

export {
  globalCardCountSql,
  leaderboardSql,
  cardLeaderboard,
  cardSql,
  cardexSql,
  collectionSql,
  userCardCountSql,
  globalRarityCardCountSql,
  offersSql,
};
