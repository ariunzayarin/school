import * as SQLite from "expo-sqlite";
export const dbPromise = SQLite.openDatabaseAsync("app.db");

export const initDB = async () => {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);
};

export const seedUsers = async () => {
  const db = await dbPromise;

  await db.runAsync(
    `INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`,
    ["test@mail.com", "123"],
  );

  await db.runAsync(
    `INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`,
    ["admin@mail.com", "123"],
  );
};
