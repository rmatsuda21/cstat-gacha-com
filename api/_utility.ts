import * as mysql from "mysql2/promise";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query = async (sql: string | string[], params: any[] = []) => {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  });

  if (typeof sql === "string") {
    const results = await db.query(sql, params);
    await db.end();

    return results[0];
  }

  const results = await Promise.all(sql.map((s) => db.query(s, params)));
  await db.end();

  return results.map((r) => r[0]);
};
