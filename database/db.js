import * as SQLite from "expo-sqlite";
export const dbPromise = SQLite.openDatabaseAsync("app.db");

export const initDB = async () => {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    );
  `);
};

export const seedUsers = async () => {
  const db = await dbPromise;

  await db.runAsync(
    `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
    ["test@mail.com", "123", "student"],
  );

  await db.runAsync(
    `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
    ["admin@mail.com", "123", "teacher"],
  );
};
