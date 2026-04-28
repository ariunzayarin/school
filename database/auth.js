import { dbPromise } from "./db";

export const register = async (username, password) => {
  const db = await dbPromise;

  await db.runAsync("INSERT INTO users (username, password) VALUES (?, ?)", [
    username,
    password,
  ]);
};

export const login = async (username, password) => {
  const db = await dbPromise;

  const result = await db.getAllAsync(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
  );

  return result.length > 0;
};
